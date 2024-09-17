import { Component,Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { GestionService } from '../../gestion.service';
import { ModalService } from '../modal/modal.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';

const MATIRIAL_MODULES = [MatFormFieldModule,MatLabel,MatFormField, MatInput, MatDialogModule, MatButtonModule,MatRadioModule,MatSelectModule,MatInputModule];


@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [MATIRIAL_MODULES,ReactiveFormsModule],
  templateUrl: './factura-form.component.html',
  styleUrl: './factura-form.component.scss'
})
export class FacturaFormComponent {

  facturaForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _service = inject(GestionService);
  private readonly _modalSevcice = inject(ModalService);

ngOnInit(): void {
  this._buildForm();
  //this.facturaForm.patchValue(this._matDialog.data);

  if (this._matDialog.data) {
    // Preselecciona las opciones del mat-select
    this.facturaForm.patchValue({
      dni: this._matDialog.data.dni,
      iva: this._matDialog.data.iva.toString(),
      irpf: this._matDialog.data.irpf.toString(),
      re: this._matDialog.data.re.toString(),
      pagado: this._matDialog.data.pagado.toString(),
      rectificativa: this._matDialog.data.rectificativa.toString(),
      codigo_factura: this._matDialog.data.codigo_factura
    });
  }

  // if(this._matDialog.isEditing){
  //   this._disabledForm();
  // }
}

// private _disabledForm(): void{
//   this.facturaForm.disable();
// }


  // Método para cerrar el modal y enviar los datos
  async onSubmit() {
    let message = 'edited successfully';
    const factura = this.facturaForm.value;

    // Validar que los campos booleanos sean 0 o 1
    if (factura.iva !== "0" && factura.iva !== "1") {
      this._modalSevcice.showMessage('El campo IVA debe ser 0 o 1');
      return;
    }
    if (factura.irpf !== "0" && factura.irpf !== "1") {
      this._modalSevcice.showMessage('El campo IRPF debe ser 0 o 1');
      return;
    }
    if (factura.re !== "0" && factura.re !== "1") {
      this._modalSevcice.showMessage('El campo RE debe ser 0 o 1');
      return;
    }
    if (factura.pagado !== "0" && factura.pagado !== "1") {
      this._modalSevcice.showMessage('El campo Pagado debe ser 0 o 1');
      return;
    }
    if (factura.rectificativa !== "0" && factura.rectificativa !== "1") {
      this._modalSevcice.showMessage('El campo Rectificativa debe ser 0 o 1');
      return;
    }

    if (this._matDialog.isEditing) {
      await this._service.update('facturas', this._matDialog.data.codigo_factura,factura ).subscribe(
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
      await this._service.create('facturas', factura).subscribe(
        (response) => {
          console.log(response);
          this.openSnackBar(response.message.toString(), "Aceptar");
        },
        (error) => {
          console.log(error);
          this.openSnackBar(error.message.toString(), "Aceptar");
        }
      );
      message = 'addded successfully';
    }
  
    // show snackbar
    console.log(message);
    this._modalSevcice.closeModal();
  }
  
  
  getTitle(): string {
    return this._matDialog.data ? 'Actualizar' : 'Agregar';
  }
  
    private _buildForm(): void {
      this.facturaForm = this._fb.nonNullable.group({
        codigo_factura: ['', Validators.required],
        iva: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
        irpf: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
        re: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
        dni: ['', Validators.required,Validators.pattern('^[0-9]{8}[A-Z]$')],
        pagado: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
        rectificativa: [null, [Validators.required, Validators.pattern('^[01]$')]], // Validación para 0 o 1
      });
    }

    private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
