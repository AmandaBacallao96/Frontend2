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
import { ContratoMultiple, ContratoMultipleFull } from '../../models/contratomultiple.model';
import { Contrato } from '../../models/contrato.model';
import { ContratoFormComponent } from '../../forms/contrato-form/contrato-form.component';
import { ContratoMultipleFormComponent } from '../../forms/contrato-multiple-form/contrato-multiple-form.component';

const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule];


@Component({
  selector: 'app-multiple',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule],
  templateUrl: './multiple.component.html',
  styleUrl: './multiple.component.scss'
})
export class MultipleComponent implements OnInit {

  displayedColumns: string[] = ['dni', 'precio','estado','fecha','actions'];
  dataSource: any[] = [];

  contratos: Contrato[] = [];
  contratosMultiples: ContratoMultiple[] = [];
  temp: ContratoMultiple[] = [];
  contratos_full: ContratoMultipleFull[] = [];
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

  /**
   * Fetches all the contracts from the API and assigns them to the "contratos" and
   * "contratos_full" arrays. Also sets the "revision" flag to true.
   */
  async fetchContratos() {
    // Fetch all the contract_multiple records from the API
    await this.service.getAll("contrato_multiple").subscribe(
      (response) => {
        this.contratosMultiples = response.data.items;
      }
    );

    // Fetch all the contract records from the API
    await this.service.getAll("contrato").subscribe(
      (response) => {
        this.contratos = response.data.items;
        // Loop through each contract and check if it has a matching
        // contract_multiple record. If it does, create a new
        // ContratoMultipleFull object with the contract data and
        // the contract_multiple data, and add it to the contratos_full array
        this.contratos.filter(contrato => 
          this.contratosMultiples.some(multiple => {
            if (multiple.id_contrato === contrato.id_contrato) {
              let contrat = new ContratoMultipleFull(
                contrato.id_contrato,
                contrato.precio,
                contrato.estado,
                contrato.dni,
                multiple.fecha_cobro,
                multiple.id_contrato_multiple
              );
              this.contratos_full.push(contrat);
            }
          }
            
          )
        );

        // Set the data source to the contratos_full array and set the revision flag to true
        this.dataSource = this.contratos_full;
        this.revision = true;
      }
    );
  }


  deleteContrato(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este contrato?');

    if (confirmation) {
      this.service.delete("contrato_multiple",id).subscribe(
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
  this._modalService.openModal<ContratoMultipleFormComponent,ContratoMultiple>(ContratoMultipleFormComponent);
}

// Método para abrir el modal y actualizar un servicio existente
  actualizarContrato(data: any): void {
    this._modalService.openModal<ContratoMultipleFormComponent,ContratoMultiple>(ContratoMultipleFormComponent, data, true);
  }



}
