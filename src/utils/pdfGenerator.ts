import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface ReportData {
  commerceName: string;
  ownerName: string;
  period: string;
  stats: {
    totalRevenue: number;
    totalSales: number;
    averageBasket: number;
    averageMargin: number;
  };
  dailyData: Array<{
    day: string;
    revenue: number;
    sales: number;
  }>;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}

export function generateSalesReportPDF(data: ReportData, logoBase64?: string): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let yPos = 20;

  // Header with logo
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, 'PNG', 15, 10, 30, 30);
    } catch (e) {
      console.error('Error adding logo:', e);
    }
  }

  // Title
  doc.setFontSize(24);
  doc.setTextColor(33, 150, 243); // Blue
  doc.text('Rapport de Ventes', logoBase64 ? 55 : 15, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(data.commerceName || 'Stock DZ', logoBase64 ? 55 : 15, yPos);
  
  yPos += 6;
  doc.setFontSize(10);
  doc.text(`Gérant: ${data.ownerName || 'Non renseigné'}`, logoBase64 ? 55 : 15, yPos);
  
  yPos += 6;
  doc.text(`Période: ${data.period}`, logoBase64 ? 55 : 15, yPos);
  
  yPos += 6;
  doc.text(`Généré le: ${format(new Date(), "d MMMM yyyy 'à' HH:mm", { locale: fr })}`, logoBase64 ? 55 : 15, yPos);

  yPos = logoBase64 ? 50 : yPos + 15;

  // Separator line
  doc.setDrawColor(33, 150, 243);
  doc.setLineWidth(0.5);
  doc.line(15, yPos, pageWidth - 15, yPos);
  yPos += 15;

  // KPIs Section
  doc.setFontSize(14);
  doc.setTextColor(33, 150, 243);
  doc.text('Indicateurs Clés', 15, yPos);
  yPos += 10;

  const kpiData = [
    ['Chiffre d\'affaires', `${data.stats.totalRevenue.toLocaleString('fr-DZ')} DA`],
    ['Nombre de ventes', `${data.stats.totalSales}`],
    ['Panier moyen', `${data.stats.averageBasket.toLocaleString('fr-DZ')} DA`],
    ['Marge moyenne', `${data.stats.averageMargin.toFixed(1)}%`],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Indicateur', 'Valeur']],
    body: kpiData,
    theme: 'striped',
    headStyles: { 
      fillColor: [33, 150, 243],
      textColor: 255,
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 11,
      cellPadding: 5,
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' }
    },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Daily Sales Section
  if (data.dailyData.length > 0) {
    doc.setFontSize(14);
    doc.setTextColor(33, 150, 243);
    doc.text('Ventes par Jour', 15, yPos);
    yPos += 10;

    const dailyTableData = data.dailyData.map(d => [
      d.day,
      `${d.revenue.toLocaleString('fr-DZ')} DA`,
      d.sales.toString()
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['Jour', 'Chiffre d\'affaires', 'Nb. Ventes']],
      body: dailyTableData,
      theme: 'striped',
      headStyles: { 
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        1: { halign: 'right' },
        2: { halign: 'center' }
      },
      margin: { left: 15, right: 15 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 15;
  }

  // Top Products Section
  if (data.topProducts.length > 0) {
    // Check if we need a new page
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(33, 150, 243);
    doc.text('Top 5 Produits', 15, yPos);
    yPos += 10;

    const topProductsData = data.topProducts.map((p, i) => [
      `${i + 1}`,
      p.name,
      p.sales.toString(),
      `${p.revenue.toLocaleString('fr-DZ')} DA`
    ]);

    autoTable(doc, {
      startY: yPos,
      head: [['#', 'Produit', 'Quantité', 'Revenu']],
      body: topProductsData,
      theme: 'striped',
      headStyles: { 
        fillColor: [33, 150, 243],
        textColor: 255,
        fontStyle: 'bold'
      },
      styles: { 
        fontSize: 10,
        cellPadding: 4,
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 15 },
        2: { halign: 'center' },
        3: { halign: 'right' }
      },
      margin: { left: 15, right: 15 },
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} / ${pageCount} - Stock DZ - Gestion de Stock`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  return doc;
}

export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename);
}
