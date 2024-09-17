import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GestionService } from '../../gestion.service';
import { ModalService } from './modal.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { v4 as uuid4 } from 'uuid';


const MATIRIAL_MODULES = [MatLabel,MatFormField, MatInput, MatDialogModule, MatButtonModule];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MATIRIAL_MODULES, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  contactForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _service = inject(GestionService);
  private readonly _modalSevcice = inject(ModalService);

ngOnInit(): void {
  this._buildForm();
  this.contactForm.patchValue(this._matDialog.data);

}


async onSubmit() {
  let message = 'Edited successfully';
  const servicio = this.contactForm.value;
  if (this._matDialog.isEditing) {
    this._service.update('servicios', this._matDialog.data.id_servicio,servicio ).subscribe(
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
    servicio.id_servicio = nuevoId;
    await this._service.create('servicios', servicio).subscribe(
      (response) => {
        console.log(response);
        this.openSnackBar(response.message.toString(), "Aceptar");
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message.toString(), "Aceptar");
      }
    );
  }

  // show snackbar
  console.log(message);
  this._modalSevcice.closeModal();
}


getTitle(): string {
  return this._matDialog.data ? 'Actualizar' : 'Agregar';
}

  private _buildForm(): void {
    this.contactForm = this._fb.nonNullable.group({
      nombre: ['', Validators.required],
      //id_servicio: ['', Validators.required],
    });
  }


  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
