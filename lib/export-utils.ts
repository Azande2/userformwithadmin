import type { Submission, CheckStatus } from "@/lib/types"

function formTypeLabel(type: string) {
  switch (type) {
    case "light-delivery":
      return "Light Delivery Vehicle Daily Checklist"
    case "excavator-loader":
      return "Excavator Loader Pre-Shift Inspection"
    case "excavator-harvester":
      return "Excavator Harvester Pre-Shift Inspection"
    case "lowbed-trailer":
      return "Lowbed & Roll Back Trailer Pre-Shift Inspection"
    case "mechanic-ldv":
      return "Mechanic LDV Daily Checklist"
    default:
      return type
  }
}

function statusLabel(status: CheckStatus): string {
  if (!status) return "-"
  const map: Record<string, string> = { ok: "OK", def: "Defect", na: "N/A" }
  return map[status] ?? "-"
}

function formatFieldKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

// ─── CSV Export ────────────────────────────────────────────────

function escapeCSV(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

export function exportSubmissionsToCSV(submissions: Submission[]): void {
  if (submissions.length === 0) return

  const rows: string[][] = []

  // Header
  rows.push([
    "ID",
    "Form Type",
    "Submitted By",
    "Date",
    "Status",
    "Defect Details",
    "Signature",
  ])

  for (const sub of submissions) {
    rows.push([
      sub.id,
      formTypeLabel(sub.formType),
      sub.submittedBy,
      new Date(sub.submittedAt).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      sub.hasDefects ? "Defects Found" : "Clean",
      sub.data.defectDetails || "",
      sub.data.signature || "",
    ])
  }

  const csv = rows.map((r) => r.map(escapeCSV).join(",")).join("\n")
  downloadFile(csv, "ringomode-submissions.csv", "text/csv;charset=utf-8;")
}

export function exportSingleSubmissionToCSV(sub: Submission): void {
  const rows: string[][] = []

  rows.push(["Ringomode HSE Management System"])
  rows.push([formTypeLabel(sub.formType)])
  rows.push([])

  // Form metadata
  rows.push(["Field", "Value"])
  rows.push(["Submitted By", sub.submittedBy])
  rows.push([
    "Date",
    new Date(sub.submittedAt).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  ])
  rows.push(["Status", sub.hasDefects ? "Defects Found" : "Clean"])

  // Form fields (non-items)
  for (const [key, value] of Object.entries(sub.data)) {
    if (key === "items" || key === "hasDefects" || key === "defectDetails" || key === "signature") continue
    rows.push([formatFieldKey(key), String(value) || "-"])
  }

  rows.push([])
  rows.push(["Inspection Item", "Status"])

  // Inspection items
  if (sub.data.items) {
    for (const [item, status] of Object.entries(sub.data.items)) {
      rows.push([item, statusLabel(status as CheckStatus)])
    }
  }

  rows.push([])
  if (sub.data.defectDetails) {
    rows.push(["Defect Details", sub.data.defectDetails])
  }
  rows.push(["Signature", sub.data.signature || "-"])

  const csv = rows.map((r) => r.map(escapeCSV).join(",")).join("\n")
  const filename = `ringomode-${sub.formType}-${sub.submittedBy.replace(/\s/g, "_")}-${sub.id.slice(0, 8)}.csv`
  downloadFile(csv, filename, "text/csv;charset=utf-8;")
}

// ─── PDF Export ────────────────────────────────────────────────

async function getLogoBase64(): Promise<string> {
  try {
    if (typeof window === 'undefined') {
      const fs = require('fs');
      const path = require('path');
      const logoPath = path.join(process.cwd(), 'public', 'images', 'ringomode-logo.png');
      const logoBuffer = fs.readFileSync(logoPath);
      return `data:image/png;base64,${logoBuffer.toString('base64')}`;
    } else {
      const response = await fetch('/images/ringomode-logo.png');
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  } catch (error) {
    console.error('Failed to load logo:', error);
    return '';
  }
}

export async function exportSubmissionToPDF(sub: Submission): Promise<void> {
  const { default: jsPDF } = await import("jspdf")
  await import("jspdf-autotable")

  const doc = new jsPDF("p", "mm", "a4")
  const pageWidth = doc.internal.pageSize.getWidth()
  
  // ===== ONLY ADDED LOGO AT THE TOP =====
  const logoBase64 = await getLogoBase64();
  let yOffset = 15;
  
  if (logoBase64) {
    try {
      // Add logo at position (14, 10) with width 40, height 12 (preserves aspect ratio)
      doc.addImage(logoBase64, 'PNG', 14, 8, 40, 12);
      yOffset = 28; // Push content down to make room for logo
    } catch (error) {
      console.error('Failed to add logo to PDF:', error);
      yOffset = 15;
    }
  }
  // ======================================

  // Title
  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text("Ringomode DSP", 14, yOffset)
  doc.text("Excellence - Relevance - Significance", 14, yOffset + 5)

  doc.setFontSize(7)
  doc.setTextColor(150)
  doc.text("HSE Management System", pageWidth - 14, yOffset, { align: "right" })

  doc.setDrawColor(34, 100, 54)
  doc.setLineWidth(0.5)
  doc.line(14, yOffset + 9, pageWidth - 14, yOffset + 9)

  // Form title
  doc.setFontSize(14)
  doc.setTextColor(34, 100, 54)
  doc.text(formTypeLabel(sub.formType), 14, yOffset + 18)

  // Status badge
  doc.setFontSize(9)
  if (sub.hasDefects) {
    doc.setTextColor(220, 50, 50)
    doc.text("DEFECTS FOUND", pageWidth - 14, yOffset + 18, { align: "right" })
  } else {
    doc.setTextColor(34, 139, 34)
    doc.text("CLEAN", pageWidth - 14, yOffset + 18, { align: "right" })
  }

  // Submission info
  doc.setFontSize(9)
  doc.setTextColor(60)
  doc.text(`Submitted by: ${sub.submittedBy}`, 14, yOffset + 26)
  doc.text(
    `Date: ${new Date(sub.submittedAt).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    14,
    yOffset + 31
  )

  // Form fields table
  const fieldRows: string[][] = []
  for (const [key, value] of Object.entries(sub.data)) {
    if (key === "items" || key === "hasDefects" || key === "defectDetails" || key === "signature") continue
    fieldRows.push([formatFieldKey(key), String(value) || "-"])
  }

  if (fieldRows.length > 0) {
    ;(doc as unknown as { autoTable: (options: Record<string, unknown>) => void }).autoTable({
      startY: yOffset + 37,
      head: [["Field", "Value"]],
      body: fieldRows,
      theme: "grid",
      headStyles: {
        fillColor: [34, 100, 54],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: { fontSize: 8 },
      margin: { left: 14, right: 14 },
      tableWidth: "auto",
    })
  }

  // Inspection items table
  const itemRows: string[][] = []
  if (sub.data.items) {
    for (const [item, status] of Object.entries(sub.data.items)) {
      itemRows.push([item, statusLabel(status as CheckStatus)])
    }
  }

  if (itemRows.length > 0) {
    const previousTable = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
    const startY = previousTable ? previousTable.finalY + 8 : yOffset + 37

    ;(doc as unknown as { autoTable: (options: Record<string, unknown>) => void }).autoTable({
      startY,
      head: [["Inspection Item", "Status"]],
      body: itemRows,
      theme: "grid",
      headStyles: {
        fillColor: [34, 100, 54],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: { fontSize: 8 },
      didParseCell(data: { section: string; column: { index: number }; cell: { styles: { textColor: number[]; fontStyle: string } }; row: { raw: string[] } }) {
        if (data.section === "body" && data.column.index === 1) {
          const val = data.row.raw[1]
          if (val === "Defect") {
            data.cell.styles.textColor = [220, 50, 50]
            data.cell.styles.fontStyle = "bold"
          } else if (val === "OK") {
            data.cell.styles.textColor = [34, 139, 34]
          }
        }
      },
      margin: { left: 14, right: 14 },
    })
  }

  // Defect details
  const lastTable = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable
  let currentY = lastTable ? lastTable.finalY + 8 : yOffset + 37

  if (sub.data.defectDetails) {
    if (currentY > 260) {
      doc.addPage()
      currentY = 15
    }
    doc.setFontSize(10)
    doc.setTextColor(220, 50, 50)
    doc.text("Defect Details:", 14, currentY)
    currentY += 5
    doc.setFontSize(8)
    doc.setTextColor(60)
    const lines = doc.splitTextToSize(sub.data.defectDetails, pageWidth - 28)
    doc.text(lines, 14, currentY)
    currentY += lines.length * 4 + 6
  }

  // Signature
  if (currentY > 270) {
    doc.addPage()
    currentY = 15
  }
  doc.setFontSize(10)
  doc.setTextColor(60)
  doc.text("Signature:", 14, currentY)
  currentY += 5
  doc.setFontSize(9)
  doc.setFont("helvetica", "italic")
  doc.text(sub.data.signature || "-", 14, currentY)
  doc.setFont("helvetica", "normal")

  // Footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150)
    doc.text(
      `Ringomode DSP - HSE Management System | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: "center" }
    )
  }

  const filename = `ringomode-${sub.formType}-${sub.submittedBy.replace(/\s/g, "_")}-${sub.id.slice(0, 8)}.pdf`
  doc.save(filename)
}

// ─── Helpers ───────────────────────────────────────────────────

function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}