import { Component,OnInit } from '@angular/core';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Trabajador } from '../models/trabajador.model';
import { UsuarioFormComponent } from '../forms/usuario-form/usuario-form.component';


const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule,UsuarioFormComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = ['dni','nombre', 'direccion', 'numeroTelefono','cif', 'actions'];
  dataSource: Trabajador[] = [];

  trabajadores: Trabajador[] = [];
  filteredTrabajadores: Trabajador[] = [];
  searchQuery: string = '';
  revision: boolean = false;

  constructor(private service: GestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  /**
   * Fetches all the users from the API and assigns them to the "facturas" and
   * "filteredFacturas" arrays. Also sets the "revision" flag to true.
   */
  fetchUsuarios(): void {
    this.service.getAll("trabajador").subscribe(response => {
      console.log(response.data.items); // Log the response for debugging purposes
      // Assign the array of users to the "facturas" array
      this.trabajadores = response.data.items;
      // Assign the same array to the "filteredFacturas" array, to be used for filtering
      this.filteredTrabajadores = response.data.items;
      // Assign the same array to the "dataSource" array, to be used for the MatTable
      this.dataSource = response.data.items;
      // Set the "revision" flag to true, indicating that the data has been loaded
      this.revision = true;
    });
  }


  // Ver Usuario
verUsuario(id: string): void {
  console.log('Ver Usuario:', id);
  // Aquí podrías redirigir a una vista de detalle o mostrar un modal con información
}

/// Método para abrir el modal para crear
crearUsuario(): void {
  const dialogRef = this.dialog.open(UsuarioComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.service.create("trabajador",result).subscribe(() => this.fetchUsuarios());
    }
  });
}

// Método para abrir el modal y actualizar
  actualizarUsuario(trabajador: Trabajador): void {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      data: trabajador // Se pasan los datos del servicio a actualizar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se actualizan los datos, se llama al servicio para hacer la actualización
        this.service.update("trabajador",trabajador.dni, result).subscribe(() => this.fetchUsuarios());
      }
    });
  }


}
