import { Component, OnInit,ViewChild,ElementRef,AfterViewInit, inject } from '@angular/core';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FacturaFormComponent } from '../forms/factura-form/factura-form.component';
import { Factura } from '../models/factura.model';
import { DownloadFacturaServiceService } from '../file/download-factura-service.service';
import { ModalService } from '../forms/modal/modal.service';
import { ModalComponent } from '../forms/modal/modal.component';
import { NgxPrintModule, PrintOptions } from 'ngx-print';
import { NgxPrintService } from 'ngx-print';
import { DownloadFacturaComponent } from "../file/download-factura/download-factura.component";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];


@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule, FacturaFormComponent, NgxPrintModule, DownloadFacturaComponent],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.scss'
})
export class FacturaComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['code', 'dni','iva', 'irpf','pagado','rectificativa','re' ,'actions'];
  dataSource: Factura[] = [];

  facturas: Factura[] = [];
  filteredFacturas: Factura[] = [];
  searchQuery: string = '';
  revision: boolean = false;

  constructor(private facturasService: GestionService, public dialog: MatDialog, private pdfService: DownloadFacturaServiceService,
    private printService: NgxPrintService
  ) { }

  ngOnInit(): void {
    this.fetchFacturas();
  }

  fetchFacturas(): void {
    this.facturasService.getAll("facturas").subscribe(response => {
      console.log(response.data.items); // Verifica el formato de la respuesta
      this.facturas = response.data.items; // Acceder al array dentro de 'items'
      this.filteredFacturas = response.data.items; // Filtrado sobre el mismo array
      this.dataSource = response.data.items;
      this.revision = true;
    });
  }

  // Ver Factura
verFactura(id: string): void {
  console.log('Ver factura:', id);
  // Aquí podrías redirigir a una vista de detalle o mostrar un modal con información
}

private readonly _modalService = inject(ModalService);

/// Método para abrir el modal para crear
crearFactura(): void {
  this._modalService.openModal<FacturaFormComponent,Factura>(FacturaFormComponent);
}

// Método para abrir el modal y actualizar
  actualizarFactura(factura: Factura): void {
    this._modalService.openModal<FacturaFormComponent,Factura>(FacturaFormComponent, factura, true);
  }

  deleteFactura(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta Factura?');
   
    if (confirmation) {
      this.facturasService.delete("facturas",id).subscribe(
        (response) => {
          console.log(response);
          this.fetchFacturas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  @ViewChild('otherContent', { static: false }) otherContent: ElementRef | undefined;

  ngAfterViewInit() {
    // Verifica que `otherContent` está definido
    if (this.otherContent) {
      console.log(this.otherContent.nativeElement.innerHTML); // Acceso al contenido del otro componente
    }
  }


  @ViewChild('contentToExport') contentToExport!: ElementRef;

  imprimir(id: string) {
    // console.log('Ver Factura:', id);
    // const doc = new jsPDF();
    // doc.text('Sale Invoice', 10, 10);
    // doc.text(`Customer: ${id}`, 10, 20);
    // doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
    // doc.save('sale-invoice-'+id+'.pdf');


    html2canvas(this.contentToExport.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('sale-invoice-'+id+'.pdf');
    });
  
    
  }

  enviarFactura(id: string): void {
    // console.log('Ver Factura:', id);
    // const doc = new jsPDF();
    // doc.text('Sale Invoice', 10, 10);
    // doc.text(`Customer: ${id}`, 10, 20);
    // doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);
    // doc.save('sale-invoice-'+id+'.pdf');
    
  }


  





}
