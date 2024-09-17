import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-download-factura',
  standalone: true,
  imports: [],
  templateUrl: './download-factura.component.html',
  styleUrl: './download-factura.component.scss'
})
export class DownloadFacturaComponent {

  downloadPDF() {
    const element = document.getElementById('content')!; // Selecciona el contenido HTML

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      // Agregar la imagen al PDF en la posición (x, y), con el ancho y alto deseados
      pdf.addImage(imgData, 'PNG', 0, 0, 208, canvas.height * 208 / canvas.width);
      
      // Guardar el archivo PDF
      pdf.save('archivo.pdf');
    });
  }

}
