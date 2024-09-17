import { Component,OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GestionService } from '../../gestion.service';
import { ModalService } from '../modal/modal.service';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { v4 as uuid4 } from 'uuid';


const MATIRIAL_MODULES = [MatLabel,MatFormField, MatInput, MatDialogModule, MatButtonModule];

@Component({
  selector: 'app-empresa-form',
  standalone: true,
  imports: [MATIRIAL_MODULES, ReactiveFormsModule],
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.scss'
})
export class EmpresaFormComponent implements OnInit {
  empresaForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _service = inject(GestionService);
  private readonly _modalSevcice = inject(ModalService);

  ngOnInit(): void {
    this._buildForm();
    this.empresaForm.patchValue(this._matDialog.data);
  
    // if(this._matDialog.isEditing){
    //   this._disabledForm();
    // }
  }
  
  // private _disabledForm(): void{
  //   this.empresaForm.disable();
  // }
  
  async onSubmit() {
    let message = 'Edited Successfully';
    const empresa = this.empresaForm.value;
    if (this._matDialog.isEditing) {
      console.log("id_empresa: "+this._matDialog.data.id_empresa);
      await this._service.update('empresa', this._matDialog.data.id_empresa,empresa).subscribe(
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
      message = 'Added Successfully';
      const nuevoId = uuid4();
      empresa.id_empresa = nuevoId;
      await this._service.create('empresa', empresa).subscribe(
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
  
    this._modalSevcice.closeModal();
  }
  
  
  getTitle(): string {
    return this._matDialog.data ? 'Actualizar' : 'Agregar';
  }
  
    private _buildForm(): void {
      this.empresaForm = this._fb.nonNullable.group({
        representante_legal: ['', Validators.required],
        dni_representante_legal: ['', Validators.required],
        sector:['', Validators.required],
        actividad:['', Validators.required],
        cnae: ['', Validators.required],
        numero_trabajadores: ['', Validators.required],
        cif: ['', Validators.required],
      });
    }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
