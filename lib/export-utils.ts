import type { Submission, CheckStatus } from "@/lib/types"

// ============================================================================
// EXCAVATOR HARVESTER SECTIONS (34 sections)
// ============================================================================
const sections: {
  title: string;
  items: string[];
}[] = [
  {
    title: "License and Phepha",
    items: ["Phepha valid.", "Displayed and visible."]
  },
  {
    title: "Protective Structure",
    items: [
      "No cracks/damages.",
      "No bolts missing/loose.",
      "Guards not damaged and intact."
    ]
  },
  {
    title: "Exhaust",
    items: ["Clamps secure.", "No excessive smoking/blowing."]
  },
  {
    title: "Steps and Rails",
    items: ["Steps in good condition.", "Not loose/broken."]
  },
  {
    title: "Cab",
    items: [
      "Cab neat and tidy.",
      "Door and mechanism working.",
      "Door rubber in good condition.",
      "Door handles functional."
    ]
  },
  {
    title: "Windscreen, Windows & Wipers",
    items: [
      "Clean/secure.",
      "No cracks or damages to windscreen.",
      "Window visibility not obscured by cracks.",
      "Wipers are working."
    ]
  },
  {
    title: "Air Conditioner",
    items: ["In working condition."]
  },
  {
    title: "Seats",
    items: [
      "Condition of seat.",
      "Seat secured.",
      "Rotating lock functional.",
      "Seat adjuster functional."
    ]
  },
  {
    title: "Safety Belt",
    items: [
      "Safety belts bolted/secured.",
      "No damage/not extremely dirty/bleached or dyed.",
      "Retractor clip in order and clicks into place."
    ]
  },
  {
    title: "Hooter and Reverse Alarm",
    items: ["Hooter working and in good condition.", "Reverse alarm working."]
  },
  {
    title: "Gauges",
    items: ["In working order.", "Any warning symbols/lights."]
  },
  {
    title: "Hydraulic Controls",
    items: [
      "Not loose/responsive.",
      "No steering play.",
      "Rear steering.",
      "Pivot/steering ram pins not loose."
    ]
  },
  {
    title: "Hydraulic Head Cut Off (Bail Lever)",
    items: [
      "Operational (when it is disengaged, the hydraulics do not operate)."
    ]
  },
  {
    title: "Working Lights (LED)",
    items: [
      "In working order (if LED's, 2 thirds must be working) ie. (If 9 LED's, 6 must be working)."
    ]
  },
  {
    title: "Rotating Light",
    items: ["Flashing/rotating beacon light in working condition."]
  },
  {
    title: "Grill (Sieve)",
    items: [
      "Check condition – no damage.",
      "Not clogged.",
      "Air is moving freely."
    ]
  },
  {
    title: "Battery",
    items: [
      "Secure.",
      "Sufficient water.",
      "Terminals clean/tight & covers on.",
      "No exposed wiring."
    ]
  },
  {
    title: "Radiator",
    items: ["Secure.", "Water level correct.", "No signs of leaking."]
  },
  {
    title: "Air Pre-Cleaner",
    items: [
      "Good condition – no damage/no sucking of air.",
      "Clean and secure.",
      "No dust in pre-cleaner bowl."
    ]
  },
  {
    title: "Fan Belt",
    items: ["No squeaking.", "No signs of damage."]
  },
  {
    title: "Fuel & Oil levels",
    items: [
      "Fuel and oil levels correct.",
      "Fuel cap and hydraulic filler cap secure.",
      "All dipsticks secure."
    ]
  },
  {
    title: "Fuel & Oil Leaks",
    items: [
      "Fuel and oil pipes secure.",
      "No worn or damaged pipes.",
      "No visible fuel and oil leaks."
    ]
  },
  {
    title: "Wiring",
    items: ["No loose, damaged or exposed wires.", "No loose broken plugs."]
  },
  {
    title: "Grease",
    items: ["Adequately greased chassis.", "No missing or damaged grease nipples."]
  },
  {
    title: "Boom Structure",
    items: [
      "Not bent/cracked.",
      "Pins all secured.",
      "No loose/missing bolts."
    ]
  },
  {
    title: "Hydraulic Cylinders",
    items: [
      "Good condition – no damage.",
      "No loose fittings.",
      "No oil leaks.",
      "No missing bolts/nuts."
    ]
  },
  {
    title: "Hydraulic Hoses and Fittings",
    items: [
      "No excessive rubbing.",
      "No loose brackets/bolts/nuts.",
      "Smooth operation.",
      "Jaws not cracked or broken."
    ]
  },
  {
    title: "Harvester Head",
    items: [
      "No pipes leaking/rubbing.",
      "No loose brackets/bolts/nuts.",
      "Roller condition good/smooth operation.",
      "Knives secure/good condition.",
      "Grease hangar link and attachment adequately greased."
    ]
  },
  {
    title: "Cutting Bar & Chain",
    items: [
      "Saw box in good condition.",
      "No wear / adequately lubricated.",
      "Correctly tensioned."
    ]
  },
  {
    title: "Tracks & Sprockets",
    items: [
      "Tracks are aligned.",
      "Not damaged or worn.",
      "No cracks.",
      "No bolts/pins loose or missing."
    ]
  },
  {
    title: "All Excess Loose Debris Removed Pre-Shift",
    items: [
      "Battery area/exhaust area.",
      "Behind the boom/hydraulic cooler.",
      "Engine bay."
    ]
  },
  {
    title: "Escape Hatch & Hammer",
    items: ["Test the escape hatch opening.", "Escape hammer is easily accessible."]
  },
  {
    title: "Communication",
    items: [
      "Radio or cell phone in working condition.",
      "Handheld panic alarm functional."
    ]
  },
  {
    title: "Fire Systems",
    items: [
      "Gauge light working/no warning lights.",
      "No damaged hoses.",
      "Secured/service/seal in place.",
      "Gauges in order."
    ]
  }
];

// ============================================================================
// EXCAVATOR HARVESTER SECTION‑LEVEL ICON MAPPING
// ============================================================================
const iconMap: Record<string, string> = {
  "License and Phepha": "license2.png",
  "Protective Structure": "protective-structure.png",
  "Exhaust": "exhaust.png",
  "Steps and Rails": "steps-and-rails.png",
  "Cab": "cabs.png",
  "Windscreen, Windows & Wipers": "wipes.png",
  "Air Conditioner": "air-conditioner.png",
  "Seats": "seats.png",
  "Safety Belt": "safety-belt.png",
  "Hooter and Reverse Alarm": "hooters.png",
  "Gauges": "gauges.png",
  "Hydraulic Controls": "hydraulic-controls.png",
  "Air Pre-Cleaner": "air-pre-cleaner.png",
  "Battery": "battery.png",
  "Hydraulic Head Cut Off (Bail Lever)": "bail-lever.png",
  "Fan Belt": "fan-belt.png",
  "Fuel & Oil levels": "fuel-oil-levels.png",
  "Fuel & Oil Leaks": "fuel-leaks.png",
  "Wiring": "wiring.png",
  "Grease": "grease.png",
  "Grill (Sieve)": "grill.png",
  "Working Lights (LED)": "led.png",
  "Radiator": "radiator.png",
  "Rotating Light": "rotating-light.png",
  "Boom Structure": "boom-structure.png",
  "Hydraulic Cylinders": "hydraulic-cylinders.png",
  "Hydraulic Hoses and Fittings": "hydraulic-hoses.png",
  "Harvester Head": "harvester-head.png",
  "Cutting Bar & Chain": "cutting-bar.png",
  "Tracks & Sprockets": "tracks-sprockets.png",
  "All Excess Loose Debris Removed Pre-Shift": "all-excess-loose-debris.png",
  "Escape Hatch & Hammer": "escape-hatch.png",
  "Communication": "communication.png",
  "Fire Systems": "fire-system.png"
};

// ============================================================================
// LIGHT DELIVERY ITEM‑LEVEL ICON MAPPING (matches web form)
// ============================================================================
const lightItemIconMap: Record<string, string> = {
  "Drivers license available": "license2.png",
  "Valid training card": "license2.png",
  "Vehicle registration document": "license2.png",
  "Windscreen (cracks/chips)": "wipes.png",
  "Wipers and washers": "wipes.png",
  "Mirrors (rear view/side)": "mirrors2.png",
  "Lights (head/tail/brake/indicator)": "led.png",
  "Horn": "hooters.png",
  "Seat belt": "safety-belt.png",
  "Seats (condition/adjustment)": "seats.png",
  "Fire extinguisher (serviced/sealed)": "fire-extinguisher.png",
  "Warning triangle": "emergency-triangle.png",
  "Jack and wheel spanner": "wheel-nut.png",
  "Spare wheel (condition/pressure)": "types-spares.png",
  "Tyres (condition/pressure/wear)": "types-spares.png",
  "Brakes (foot/handbrake)": "foot-brake.png",
  "Steering (play/condition)": "steering-column.png",
  "Oil level": "oil-fluid-air-level.png",
  "Coolant level": "radiator.png",
  "Fuel level": "fuel-oil-levels.png",
  "Battery (condition/terminals)": "battery.png",
  "Exhaust system (leaks/condition)": "air-fuel-leaks.png",
  "Body (dents/damage)": "bonnet-retaining-catch.png",
  "Doors (locks/handles)": "cabs.png",
  "General cleanliness": "wipes.png"
};

// ============================================================================
// HELPER: Load any image from public/images/ as base64 (server + client)
// ============================================================================
async function getImageBase64(filename: string): Promise<string | null> {
  try {
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const imagePath = path.join(process.cwd(), 'public', 'images', filename);
      const imageBuffer = fs.readFileSync(imagePath);
      return `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } else {
      const response = await fetch(`/images/${filename}`);
      if (!response.ok) return null;
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  } catch (error) {
    console.error(`Failed to load image ${filename}:`, error);
    return null;
  }
}

// ============================================================================
// FORM LABEL HELPERS
// ============================================================================
function formTypeLabel(type: string): string {
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

function getDocumentDetails(type: string): { ref: string; rev: string; date: string } {
  switch (type) {
    case "light-delivery":
      return { ref: "HSEMS/8.1.19/REG/012", rev: "2", date: "27.03.2020" }
    case "excavator-loader":
      return { ref: "HSEMS/8.1.19/REG/002", rev: "4", date: "27.03.2020" }
    case "excavator-harvester":
      return { ref: "HSEMS/8.1.19/REG/001", rev: "5", date: "27.03.2020" }
    case "lowbed-trailer":
      return { ref: "HSEMS/8.1.19/REG/020", rev: "2", date: "27.03.2024" }
    case "mechanic-ldv":
      return { ref: "HSEMS/8.1.19/REG/017", rev: "2", date: "27.03.2020" }
    default:
      return { ref: "HSEMS/8.1.19/REG/000", rev: "0", date: "01.01.2020" }
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

// ============================================================================
// CSV EXPORTS
// ============================================================================
function escapeCSV(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`
  }
  return val
}

export function exportSubmissionsToCSV(submissions: Submission[]): void {
  if (submissions.length === 0) return
  const rows: string[][] = []
  rows.push(["ID", "Form Type", "Submitted By", "Date", "Status", "Defect Details", "Signature"])
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
  for (const [key, value] of Object.entries(sub.data)) {
    if (key === "items" || key === "hasDefects" || key === "defectDetails" || key === "signature") continue
    rows.push([formatFieldKey(key), String(value) || "-"])
  }
  rows.push([])
  rows.push(["Inspection Item", "Status"])
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

// ============================================================================
// LOGO LOADER
// ============================================================================
async function getLogoBase64(): Promise<string> {
  try {
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      const logoPath = path.join(process.cwd(), 'public', 'images', 'ringomode-logo.png');
      const logoBuffer = fs.readFileSync(logoPath);
      return `data:image/png;base64,${logoBuffer.toString('base64')}`;
    } else {
      const response = await fetch('/images/ringomode-logo.png');
      if (!response.ok) return '';
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

// ============================================================================
// PDF EXPORT – PER‑ITEM ICONS FOR LIGHT DELIVERY, GROUPED ICONS FOR HARVESTER (NO EMPTY ROWS)
// ============================================================================
export async function exportSubmissionToPDF(sub: Submission): Promise<void> {
  const { default: jsPDF } = await import("jspdf")
  await import("jspdf-autotable")

  const doc = new jsPDF("p", "mm", "a4")
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  
  // ----- LOGO -----
  const logoBase64 = await getLogoBase64();
  let yOffset = 15;
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', 14, 8, 80, 25);
      yOffset = 48;
    } catch (error) {
      console.error('Failed to add logo to PDF:', error);
      yOffset = 15;
    }
  }

  // ----- Header -----
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

  // ----- Form Title -----
  doc.setFontSize(14)
  doc.setTextColor(34, 100, 54)
  doc.text(formTypeLabel(sub.formType), 14, yOffset + 18)

  // ----- Document Reference -----
  const docDetails = getDocumentDetails(sub.formType);
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(34, 100, 54)
  doc.text(
    `Document Ref: ${docDetails.ref} | Rev. ${docDetails.rev} | ${docDetails.date}`,
    14,
    yOffset + 26
  )
  doc.setFont('helvetica', 'normal')

  // ----- Status Badge -----
  doc.setFontSize(9)
  if (sub.hasDefects) {
    doc.setTextColor(220, 50, 50)
    doc.text("DEFECTS FOUND", pageWidth - 14, yOffset + 18, { align: "right" })
  } else {
    doc.setTextColor(34, 139, 34)
    doc.text("CLEAN", pageWidth - 14, yOffset + 18, { align: "right" })
  }

  // ----- Form Fields Table -----
  const fieldRows: string[][] = []
  fieldRows.push(["Submitted By", sub.submittedBy])
  const formattedDate = new Date(sub.submittedAt).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  fieldRows.push(["Date", formattedDate])
  for (const [key, value] of Object.entries(sub.data)) {
    if (
      key === "items" ||
      key === "hasDefects" ||
      key === "defectDetails" ||
      key === "signature" ||
      key === "date"
    ) continue
    fieldRows.push([formatFieldKey(key), String(value) || "-"])
  }

  if (fieldRows.length > 0) {
    ;(doc as any).autoTable({
      startY: yOffset + 33,
      head: [["Information", ""]],
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

  // ==========================================================================
  // INSPECTION ITEMS – HANDLE BY FORM TYPE
  // ==========================================================================
  let y = (doc as any).lastAutoTable?.finalY ?? yOffset + 33
  y += 10

  // Preload icons helper
  const preloadIcons = async (filenames: string[]): Promise<Map<string, string>> => {
    const map = new Map<string, string>();
    const unique = Array.from(new Set(filenames));
    await Promise.all(unique.map(async (f) => {
      const base64 = await getImageBase64(f);
      if (base64) map.set(f, base64);
    }));
    return map;
  };

  if (sub.formType === "light-delivery") {
    // ----- LIGHT DELIVERY: PER‑ITEM ICONS -----
    if (!sub.data.items) {
      console.warn("No inspection items found for light delivery");
    } else {
      const items = Object.keys(sub.data.items).sort();
      
      const iconFilenames = items
        .map(item => lightItemIconMap[item])
        .filter(f => f) as string[];
      
      const iconBase64Map = await preloadIcons(iconFilenames);

      const tableRows: any[] = items.map(item => [
        item,
        '',
        statusLabel(sub.data.items[item] as CheckStatus)
      ]);

      ;(doc as any).autoTable({
        startY: y,
        head: [['Inspection Item', '', 'Status']],
        body: tableRows,
        theme: 'grid',
        headStyles: {
          fillColor: [34, 100, 54],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
        },
        styles: {
          fontSize: 8,
          cellPadding: 4,
          lineColor: [200, 200, 200],
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { cellWidth: 110, fontStyle: 'bold' },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 30, halign: 'center' }
        },
        margin: { left: 20, right: 20 },
        didParseCell: (data: Record<string, any>): void => {
          if (data.section === 'body') {
            data.cell.minHeight = 20;
          }
          if (data.section === 'body' && data.column.index === 2) {
            const val = data.row.raw[2] as string
            if (val === 'Defect') {
              data.cell.styles.textColor = [220, 50, 50]
              data.cell.styles.fontStyle = 'bold'
            } else if (val === 'OK') {
              data.cell.styles.textColor = [34, 139, 34]
            } else if (val === 'N/A') {
              data.cell.styles.textColor = [100, 100, 100]
            }
          }
          if (data.section === 'body' && data.column.index === 1) {
            data.cell.styles.lineWidth = 0;
          }
        },
        didDrawCell: (data: Record<string, any>): void => {
          if (data.section === 'body' && data.column.index === 1) {
            const item = data.row.raw[0] as string;
            const iconFile = lightItemIconMap[item];
            if (!iconFile) return;
            const base64 = iconBase64Map.get(iconFile);
            if (!base64) return;

            try {
              const cellWidth = data.cell.width;
              const cellHeight = data.cell.height;
              const maxImgSize = Math.min(cellWidth, cellHeight) - 4;
              const imgSize = Math.min(25, maxImgSize);
              const x = data.cell.x + (cellWidth - imgSize) / 2;
              const y = data.cell.y + (cellHeight - imgSize) / 2;
              doc.addImage(base64, 'PNG', x, y, imgSize, imgSize);
            } catch (e) {
              console.error(`Failed to draw icon for ${item}`, e);
            }
          }
        }
      });
      y = (doc as any).lastAutoTable.finalY + 15;
    }
  } else if (sub.formType === "excavator-harvester") {
    // ----- EXCAVATOR HARVESTER: GROUPED SECTIONS WITH ICON IN THE MIDDLE ROW (NO EMPTY ROWS) -----
    for (const section of sections) {
      const sectionItems = section.items.filter((item: string): boolean => 
        sub.data.items !== undefined && item in sub.data.items
      )
      if (sectionItems.length === 0) continue

      if (y > pageHeight - 70) {
        doc.addPage()
        y = 20
      }

      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(34, 100, 54)
      doc.text(section.title, 14, y)
      y += 5

      let iconBase64: string | null = null
      const iconFilename = iconMap[section.title]
      if (iconFilename) {
        iconBase64 = await getImageBase64(iconFilename)
      }

      const splitIndex = Math.floor(sectionItems.length / 2)
      const firstHalf: string[] = sectionItems.slice(0, splitIndex)
      const secondHalf: string[] = sectionItems.slice(splitIndex)

      // Build table rows: all items in order (no separate icon row)
      const tableRows: any[] = []

      firstHalf.forEach((item: string): void => {
        tableRows.push([
          item,
          '',
          statusLabel(sub.data.items?.[item] as CheckStatus)
        ])
      })

      secondHalf.forEach((item: string): void => {
        tableRows.push([
          item,
          '',
          statusLabel(sub.data.items?.[item] as CheckStatus)
        ])
      })

      ;(doc as any).autoTable({
        startY: y,
        head: [['Inspection Item', '', 'Status']],
        body: tableRows,
        theme: 'grid',
        headStyles: {
          fillColor: [34, 100, 54],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
        },
        styles: {
          fontSize: 8,
          cellPadding: 4,
          lineColor: [200, 200, 200],
          lineWidth: 0.2,
        },
        columnStyles: {
          0: { cellWidth: 110, fontStyle: 'bold' },
          1: { cellWidth: 30, halign: 'center' },
          2: { cellWidth: 30, halign: 'center' }
        },
        margin: { left: 20, right: 20 },
        didParseCell: (data: Record<string, any>): void => {
          if (data.section === 'body') {
            data.cell.minHeight = 20;
          }
          if (data.section === 'body' && data.column.index === 2) {
            const val = data.row.raw[2] as string
            if (val === 'Defect') {
              data.cell.styles.textColor = [220, 50, 50]
              data.cell.styles.fontStyle = 'bold'
            } else if (val === 'OK') {
              data.cell.styles.textColor = [34, 139, 34]
            } else if (val === 'N/A') {
              data.cell.styles.textColor = [100, 100, 100]
            }
          }
          if (data.section === 'body' && data.column.index === 1) {
            data.cell.styles.lineWidth = 0;
          }
        },
        didDrawCell: (data: Record<string, any>): void => {
          // Draw icon in the middle column of the first row of the second half
          if (
            data.section === 'body' &&
            data.column.index === 1 &&
            data.row.index === firstHalf.length &&
            iconBase64 !== null
          ) {
            try {
              const cellWidth: number = data.cell.width
              const cellHeight: number = data.cell.height
              const maxImgSize = Math.min(cellWidth, cellHeight) - 4;
              const imgSize = Math.min(25, maxImgSize);
              const x: number = data.cell.x + (cellWidth - imgSize) / 2
              const y: number = data.cell.y + (cellHeight - imgSize) / 2
              doc.addImage(iconBase64, 'PNG', x, y, imgSize, imgSize)
            } catch (e) {
              console.error(`Failed to draw icon for ${section.title}`, e)
            }
          }
        }
      })

      y = (doc as any).lastAutoTable.finalY + 15;
    }
  } else {
    // ----- FALLBACK FOR OTHER FORM TYPES: FLAT LIST (NO ICONS) -----
    const itemRows: string[][] = []
    if (sub.data.items) {
      for (const [item, status] of Object.entries(sub.data.items)) {
        itemRows.push([item, statusLabel(status as CheckStatus)])
      }
    }
    if (itemRows.length > 0) {
      ;(doc as any).autoTable({
        startY: y,
        head: [['Inspection Item', 'Status']],
        body: itemRows,
        theme: 'grid',
        headStyles: {
          fillColor: [34, 100, 54],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
        },
        styles: { fontSize: 8, cellPadding: 4 },
        didParseCell: (data: Record<string, any>): void => {
          if (data.section === 'body') {
            data.cell.minHeight = 20;
          }
          if (data.section === 'body' && data.column.index === 1) {
            const val = data.row.raw[1] as string
            if (val === 'Defect') {
              data.cell.styles.textColor = [220, 50, 50]
              data.cell.styles.fontStyle = 'bold'
            } else if (val === 'OK') {
              data.cell.styles.textColor = [34, 139, 34]
            }
          }
        },
        margin: { left: 14, right: 14 },
      })
      y = (doc as any).lastAutoTable.finalY + 15;
    }
  }

  // ----- Defect Details -----
  if (sub.data.defectDetails) {
    y += 5;
    if (y > pageHeight - 50) {
      doc.addPage()
      y = 20
    }
    doc.setFontSize(10)
    doc.setTextColor(220, 50, 50)
    doc.text("Defect Details:", 14, y)
    y += 7
    doc.setFontSize(8)
    doc.setTextColor(60)
    const lines: string[] = doc.splitTextToSize(sub.data.defectDetails as string, pageWidth - 28)
    doc.text(lines, 14, y)
    y += lines.length * 5 + 10
  }

  // ----- Signature -----
  if (y > pageHeight - 40) {
    doc.addPage()
    y = 20
  }
  doc.setFontSize(10)
  doc.setTextColor(60)
  doc.text("Signature:", 14, y)
  y += 8

  const signature = sub.data.signature
  if (signature && typeof signature === 'string' && signature.startsWith('data:image')) {
    try {
      doc.addImage(signature, 'PNG', 14, y - 3, 50, 15)
      y += 20
    } catch (error) {
      console.error('Failed to add signature image, falling back to text', error)
      doc.setFontSize(9)
      doc.setFont("helvetica", "italic")
      doc.text("[Signature image failed to load]", 14, y)
      doc.setFont("helvetica", "normal")
      y += 8
    }
  } else {
    doc.setFontSize(9)
    doc.setFont("helvetica", "italic")
    doc.text(signature as string || "-", 14, y)
    doc.setFont("helvetica", "normal")
    y += 8
  }

  // ----- Footer -----
  const pageCount: number = doc.getNumberOfPages()
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

  const filename: string = `ringomode-${sub.formType}-${sub.submittedBy.replace(/\s/g, "_")}-${sub.id.slice(0, 8)}.pdf`
  doc.save(filename)
}

// ============================================================================
// DOWNLOAD HELPER
// ============================================================================
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