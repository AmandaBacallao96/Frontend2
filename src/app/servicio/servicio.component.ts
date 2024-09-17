import { Component,OnInit, inject } from '@angular/core';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ServicioFormComponent } from '../forms/servicio-form/servicio-form.component';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ModalService } from '../forms/modal/modal.service';
import { ModalComponent } from '../forms/modal/modal.component';
import { Servicio } from '../models/servicio.model';

const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [CommonModule, MATIRIAL_MODULES, ServicioFormComponent],
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.scss'
})
export class ServicioComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name','actions'];
  dataSource: any[] = [];

  servicios: any[] = [];
  filteredServicios: any[] = [];
  searchQuery: string = '';
  revision: boolean = false;
  constructor(private serviciosService: GestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchServicios();
  }

  fetchServicios(): void {
    this.serviciosService.getAll("servicios").subscribe(response => {
      console.log(response.data.items); // Verifica el formato de la respuesta
      this.servicios = response.data.items; // Acceder al array dentro de 'items'
      this.filteredServicios = response.data.items; // Filtrado sobre el mismo array
      this.dataSource = response.data.items;
      this.revision = true;
    });
  }

  searchServicios(): void {
    if (this.searchQuery) {
      this.filteredServicios = this.servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()));
    } else {
      this.filteredServicios = this.servicios;
    }
  }

  deleteServicio(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este servicio?');

    if (confirmation) {
      this.serviciosService.delete("servicios",id).subscribe(
        (response) => {
          console.log(response);
          this.fetchServicios();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

// Ver servicio
verServicio(id: string): void {
  console.log('Ver servicio:', id);
  // Aquí podrías redirigir a una vista de detalle o mostrar un modal con información
}


private readonly _modalService = inject(ModalService);
/// Método para abrir el modal para crear un nuevo servicio
crearServicio(): void {
  this._modalService.openModal<ModalComponent>(ModalComponent);
}

// Método para abrir el modal y actualizar un servicio existente
  actualizarServicio(data: any): void {
    this._modalService.openModal<ModalComponent,Servicio>(ModalComponent, data, true);
  }


}
