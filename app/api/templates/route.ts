
import { NextResponse } from 'next/server';
import { formConfigs } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const format = searchParams.get('format') || 'pdf';
    
    if (!type) {
      return NextResponse.json({ error: 'Form type is required' }, { status: 400 });
    }

    const config = formConfigs[type as keyof typeof formConfigs];
    
    if (!config) {
      return NextResponse.json({ error: 'Form type not found' }, { status: 404 });
    }
    
    if (format === 'csv') {
      const csv = generateTemplateCSV(config);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${type}-template.csv"`,
        },
      });
    } else {
      const pdf = await generateTemplatePDF(config);
      return new NextResponse(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${type}-template.pdf"`,
        },
      });
    }
    
  } catch (error) {
    console.error('Failed to generate template:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}

function generateTemplateCSV(config: any): string {
  const headers = ['Item', 'Status (OK/DEF/NA)', 'Comments'];
  const rows = config.items.map((item: string) => [item, '', '']);
  
  const csvContent = [
    `Form: ${config.title}`,
    `Document Ref: ${getDocumentRef(config.type)}`,
    `Generated: ${new Date().toLocaleDateString('en-ZA')}`,
    '',
    headers.join(','),
    ...rows.map(row => row.map(cell => 
      cell.includes(',') ? `"${cell}"` : cell
    ).join(','))
  ].join('\n');
  
  return csvContent;
}

async function generateTemplatePDF(config: any): Promise<Buffer> {
  const jsPDF = (await import('jspdf')).default;
  const autoTable = (await import('jspdf-autotable')).default;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('RINGOMODE', 20, 20);
  
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'normal');
  doc.text('Excellence · Relevance · Significance', 20, 28);
  
  // Document info
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'bold');
  doc.text('HSE INSPECTION TEMPLATE', pageWidth - 20, 20, { align: 'right' });
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Document: ${getDocumentRef(config.type)}`, pageWidth - 20, 28, { align: 'right' });
  doc.text(`Generated: ${new Date().toLocaleDateString('en-ZA')}`, pageWidth - 20, 35, { align: 'right' });
  
  // Title
  doc.setFontSize(16);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text(config.title, 20, 50);
  
  // Horizontal line
  doc.setDrawColor(0, 51, 153);
  doc.setLineWidth(0.5);
  doc.line(20, 55, pageWidth - 20, 55);
  
  // Operator Information Section
  doc.setFontSize(11);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('OPERATOR INFORMATION', 20, 70);
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(20, 73, pageWidth - 20, 73);
  
  // Operator fields based on form type
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  
  if (config.type === 'light-delivery' || config.type === 'mechanic-ldv') {
    doc.text('Operator Name:', 20, 88);
    doc.line(55, 90, 100, 90);
    doc.text('Date:', 120, 88);
    doc.line(135, 90, 180, 90);
    
    doc.text('Vehicle Registration:', 20, 108);
    doc.line(55, 110, 100, 110);
    doc.text('Odometer:', 120, 108);
    doc.line(135, 110, 180, 110);
    
    doc.text('Valid Training Card:', 20, 128);
    doc.line(55, 130, 100, 130);
    doc.text('License Expiry:', 120, 128);
    doc.line(135, 130, 180, 130);
  } else {
    doc.text('Operator Name:', 20, 88);
    doc.line(55, 90, 100, 90);
    doc.text('Date:', 120, 88);
    doc.line(135, 90, 180, 90);
    
    doc.text('Unit Number:', 20, 108);
    doc.line(55, 110, 100, 110);
    doc.text('Hour Meter:', 120, 108);
    doc.line(135, 110, 180, 110);
    
    doc.text('Valid Training Card:', 20, 128);
    doc.line(55, 130, 100, 130);
    doc.text('Shift:', 120, 128);
    doc.line(135, 130, 180, 130);
  }
  
  // Inspection Items Section
  doc.setFontSize(11);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('INSPECTION ITEMS', 20, 155);
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(20, 158, pageWidth - 20, 158);
  
  const tableData = config.items.map((item: string) => [item, '☐', '☐', '☐', '']);
  
  autoTable(doc, {
    startY: 168,
    head: [['Inspection Item', 'OK', 'DEF', 'N/A', 'Comments']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [0, 51, 153], 
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    columnStyles: {
      0: { cellWidth: 80, fontStyle: 'bold' },
      1: { cellWidth: 15, halign: 'center' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 15, halign: 'center' },
      4: { cellWidth: 45 }
    },
    styles: { fontSize: 8, cellPadding: 2 },
    margin: { left: 20, right: 20 },
    alternateRowStyles: { fillColor: [245, 245, 245] }
  });
  
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  // Defect Report Section
  doc.setFontSize(11);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('DEFECT REPORT', 20, finalY);
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(20, finalY + 3, pageWidth - 20, finalY + 3);
  
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.setFont('helvetica', 'normal');
  doc.text('Describe any defects found during inspection:', 20, finalY + 15);
  
  doc.setDrawColor(200, 200, 200);
  doc.rect(20, finalY + 18, pageWidth - 40, 25);
  doc.setTextColor(150, 150, 150);
  doc.text('Enter defect details here...', 25, finalY + 30);
  
  // Signature Section
  const sigY = finalY + 55;
  doc.setFontSize(11);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('SIGN-OFF', 20, sigY);
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(20, sigY + 3, pageWidth - 20, sigY + 3);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.text("Operator's Signature:", 20, sigY + 18);
  doc.line(60, sigY + 20, 120, sigY + 20);
  doc.text('Date:', 140, sigY + 18);
  doc.line(155, sigY + 20, 190, sigY + 20);
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Ringomode HSE Management System - ${config.title}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - 20,
      doc.internal.pageSize.height - 10,
      { align: 'right' }
    );
  }
  
  return Buffer.from(doc.output('arraybuffer'));
}

function getDocumentRef(type: string): string {
  switch (type) {
    case 'light-delivery':
      return 'HSEMS/8.1.19/REG/012';
    case 'excavator-loader':
      return 'HSEMS/8.1.19/REG/002';
    case 'excavator-harvester':
      return 'HSEMS/8.1.19/REG/001';
    case 'lowbed-trailer':
      return 'HSEMS/8.1.19/REG/020';
    case 'mechanic-ldv':
      return 'HSEMS/8.1.19/REG/017';
    default:
      return 'HSEMS/8.1.19/REG/000';
  }
}
