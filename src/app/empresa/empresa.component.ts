import { Component, OnInit, inject } from '@angular/core';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Empresa } from '../models/empresa.model';
import { EmpresaFormComponent } from '../forms/empresa-form/empresa-form.component';
import { ModalService } from '../forms/modal/modal.service';
import { ModalComponent } from '../forms/modal/modal.component';

const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];
@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [MATIRIAL_MODULES,CommonModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit{

  displayedColumns: string[] = ['dni','nombre', 'sector', 'actividad','cnae','numero_trabajadores','cif', 'actions'];
  dataSource: Empresa[] = [];

  clientes: Empresa[] = [];
  filteredClientes: Empresa[] = [];
  searchQuery: string = '';
  revision: boolean = false;
  private readonly _modalService = inject(ModalService);

  constructor(private service: GestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEmpresa();
  }

  /**
   * Fetches all the users from the API and assigns them to the "facturas" and
   * "filteredFacturas" arrays. Also sets the "revision" flag to true.
   */
  fetchEmpresa(): void {
    this.service.getAll("empresa").subscribe(response => {
      console.log(response.data.items); // Log the response for debugging purposes
      // Assign the array of users to the "facturas" array
      this.clientes = response.data.items;
      // Assign the same array to the "filteredFacturas" array, to be used for filtering
      this.filteredClientes = response.data.items;
      // Assign the same array to the "dataSource" array, to be used for the MatTable
      this.dataSource = response.data.items;
      // Set the "revision" flag to true, indicating that the data has been loaded
      this.revision = true;
    });
  }


  // Ver Cliente
verCliente(id: string): void {
  console.log('Ver Cliente:', id);
  // Aquí podrías redirigir a una vista de detalle o mostrar un modal con información
}

/// Método para abrir el modal para crear
crearCliente(): void {
  this._modalService.openModal<EmpresaFormComponent, Empresa>(EmpresaFormComponent);

}

// Método para abrir el modal y actualizar
  actualizarCliente(cliente: Empresa): void {
    this._modalService.openModal<EmpresaFormComponent,Empresa>(EmpresaFormComponent, cliente, true);
  
  }

  deleteCliente(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este cliente?');

    if (confirmation) {
      this.service.delete("empresa",id).subscribe(
        (response) => {
          console.log(response);
          this.fetchEmpresa();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
