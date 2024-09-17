import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class DownloadFacturaServiceService {

  constructor() { }

  generatePDF(contentId: string) {
    const element = document.getElementById(contentId)!; // Recibe el id del contenido a convertir

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      pdf.addImage(imgData, 'PNG', 0, 0, 208, canvas.height * 208 / canvas.width);
      pdf.save('archivo.pdf');
    });
  }
}
