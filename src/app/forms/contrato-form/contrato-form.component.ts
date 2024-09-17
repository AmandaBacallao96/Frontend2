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

const MATIRIAL_MODULES = [MatLabel,MatFormField, MatInput, MatDialogModule, MatButtonModule,MatSelectModule];

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [MATIRIAL_MODULES,ReactiveFormsModule],
  templateUrl: './contrato-form.component.html',
  styleUrl: './contrato-form.component.scss'
})
export class ContratoFormComponent implements OnInit {
  contratoForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  private readonly _service = inject(GestionService);
  private readonly _modalSevcice = inject(ModalService);
  private crearContratoHorario = false;

ngOnInit(): void {
  this._buildForm();
  //this.contratoForm.patchValue(this._matDialog.data);

  if (this._matDialog.data) {
    // Preselecciona las opciones del mat-select
    this.contratoForm.patchValue({
      precio: this._matDialog.data.precio,
      estado: this._matDialog.data.estado.toString(),
      dni: this._matDialog.data.dni
    });
  }

}


async onSubmit() {
  const contrato = this.contratoForm.value; 
  if (this._matDialog.isEditing) {
    await this._service.update('contrato', this._matDialog.data.id_contrato,contrato).subscribe(
      (response) => {
        console.log(response);
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
          console.log("Entra a contrato_control_horario" );
          this.crearContratoHorario = true;
        }else{
          console.log("No Entra a contrato_control_horario" );
        }
        console.log(response);
        this.openSnackBar(response.message.toString(), "Aceptar");
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message.toString(), "Aceptar");
      }
    );

    if(this.crearContratoHorario){
      let contrato_control_horario = new ContratoControlHorario(uuid4(),this._matDialog.data.id_contrato.toString());
      await this._service.create('contrato_horario',contrato_control_horario).subscribe(
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
  this.crearContratoHorario = false;
}


getTitle(): string {
  return this._matDialog.data ? 'Actualizar' : 'Agregar';
}

  private _buildForm(): void {
    this.contratoForm = this._fb.nonNullable.group({
      precio: ['', Validators.required],
      estado: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
      dni: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
