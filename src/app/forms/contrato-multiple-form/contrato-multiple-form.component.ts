import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionService } from '../../gestion.service';
import { ModalService } from '../modal/modal.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuid4 } from 'uuid';
import { ContratoControlHorario } from '../../models/contratocontrolhorario.model';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ContratoMultiple } from '../../models/contratomultiple.model';

const MATIRIAL_MODULES = [MatLabel,MatFormField, MatInput, MatDialogModule, MatButtonModule,MatSelectModule,MatFormFieldModule, MatInputModule, MatDatepickerModule];

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [MATIRIAL_MODULES,ReactiveFormsModule],
  templateUrl: './contrato-multiple-form.component.html',
  styleUrl: './contrato-multiple-form.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoMultipleFormComponent implements OnInit {
  contratoForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  private readonly _service = inject(GestionService);
  private readonly _modalSevcice = inject(ModalService);
  private crearContratoMultiple = false;

  date:Date=new Date();

ngOnInit(): void {
  this._buildForm();
  
  if (this._matDialog.data) {
       
    this.contratoForm.patchValue({
      precio: this._matDialog.data.precio,
      estado: this._matDialog.data.estado.toString(),
      dni: this._matDialog.data.dni,
      fecha: this._matDialog.data.fecha
    });
    
    // Reemplazar el espacio entre la fecha y la hora con una 'T' para que sea un formato válido en JavaScript
    const fechaFormateada = this._matDialog.data.fecha.replace(' ', 'T');

    // Crear un objeto Date con la cadena formateada
    const fechaObjeto = new Date(fechaFormateada);
    
    this.date = fechaObjeto;
  }
  else{
    this.date = new Date();
  }

}


async onSubmit() {
  const contrato = this.contratoForm.value; 
  if (this._matDialog.isEditing) {
    await this._service.update('contrato', this._matDialog.data.id_contrato,contrato).subscribe(
      (response) => {
        if(response.statusCode === 200){
          console.log("Entra a contrato_multiple" );
          let contrato_multiple= new ContratoMultiple(this._matDialog.data.id_contrato_multiple,this._matDialog.data.fecha,this._matDialog.data.id_contrato.toString());
          this._service.update('contrato_multiple',this._matDialog.data.id_contrato_multiple,contrato_multiple).subscribe(
            (response) => {
              if(response.status == 200){
                console.log(response);
                this.openSnackBar(response.message.toString(), "Aceptar");
              }
            } 
          );
        }else{
          console.log("No Entra a contrato_multiple" );
        }
        this.openSnackBar(response.message.toString(), "Aceptar");
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message.toString(), "Aceptar");
      }
    );
  } else {
    const nuevoId = uuid4();
    contrato.id_contrato = nuevoId;
    await this._service.create('contrato', contrato).subscribe(
      (response) => {
        if(response.statusCode === 200){
          console.log("Entra a contrato_multiple" );
          this.crearContratoMultiple = true;
        }else{
          console.log("No Entra a contrato_multiple" );
        }
        console.log(response);
        this.openSnackBar(response.message.toString(), "Aceptar");
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message.toString(), "Aceptar");
      }
    );

    if(this.crearContratoMultiple){
      let contrato_multiple= new ContratoMultiple(uuid4(),this._matDialog.data.fecha,this._matDialog.data.id_contrato.toString());
      await this._service.create('contrato_multiple',contrato_multiple).subscribe(
        (response) => {
          if(response.status == 200){
            console.log(response);
            this.openSnackBar(response.message.toString(), "Aceptar");
          }
        } 
      );
    }
  }

  this._modalSevcice.closeModal();
  this.crearContratoMultiple = false;
}


getTitle(): string {
  return this._matDialog.data ? 'Actualizar' : 'Agregar';
}

  private _buildForm(): void {
    this.contratoForm = this._fb.nonNullable.group({
      precio: ['', Validators.required],
      estado: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
      dni: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
