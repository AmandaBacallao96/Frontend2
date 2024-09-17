import { Component,OnInit, inject } from '@angular/core';
import { GestionService } from '../../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ContratoControlHorario } from '../../models/contratocontrolhorario.model';
import { ModalService } from '../../forms/modal/modal.service';
import { ContratoMultipleFull } from '../../models/contratomultiple.model';
import { Contrato } from '../../models/contrato.model';
import { ContratoFormComponent } from '../../forms/contrato-form/contrato-form.component';

const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];


@Component({
  selector: 'app-controlhorario',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule],
  templateUrl: './controlhorario.component.html',
  styleUrl: './controlhorario.component.scss'
})
export class ControlhorarioComponent implements OnInit {

  displayedColumns: string[] = ['dni', 'precio','estado','actions'];
  dataSource: any[] = [];

  contratos: Contrato[] = [];
  contratosHorarios: ContratoControlHorario[] = [];
  contratos_full: Contrato[] = [];
  searchQuery: string = '';
  revision: boolean = false;
  constructor(private service: GestionService, public dialog: MatDialog) { }

  combinedItems: Contrato[] = [];

  /**
   * OnInit lifecycle hook. This method is called when the component is
   * initialized. It fetches all the services from the API and assigns them
   * to the "servicios" and "filteredServicios" arrays. Also sets the "revision"
   * flag to true.
   */
  ngOnInit(): void {
    this.fetchContratos();
  }

  async fetchContratos() {
    await this.service.getAll("contrato_horario").subscribe(
      (response)=>{
        this.contratosHorarios = response.data.items;
      }
    );
    await this.service.getAll("contrato").subscribe(
      (response) => {
        this.contratos = response.data.items;
        this.contratos_full = this.contratos.filter(contrato => 
          this.contratosHorarios.some(control => control.id_contrato === contrato.id_contrato)
        );
        this.dataSource = this.contratos_full;
        this.revision = true;
    }
  ); 
  }

  deleteContrato(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este contrato?');

    if (confirmation) {
      this.service.delete("contrato_horario",id).subscribe(
        (response) => {
          this.fetchContratos();
      },(error)=>{
        console.log(error);
      }
    );
      this.fetchContratos();
    }
  }



private readonly _modalService = inject(ModalService);

crearContrato(): void {
  this._modalService.openModal<ContratoFormComponent,ContratoControlHorario>(ContratoFormComponent);
}

// Método para abrir el modal y actualizar un servicio existente
  actualizarContrato(data: any): void {
    this._modalService.openModal<ContratoFormComponent,ContratoControlHorario>(ContratoFormComponent, data, true);
  }



}
