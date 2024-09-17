import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const MATIRIAL_MODULES = [MatSelectModule, MatInputModule, MatFormFieldModule,MatCardModule,MatIconModule]

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  imports: [MATIRIAL_MODULES],
  templateUrl: './servicio-form.component.html'
})
export class ServicioFormComponent {
  servicioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServicioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del servicio para actualizar
  ) {
    this.servicioForm = this.fb.group({
      nombre: [data?.nombre || '', Validators.required],
      id_servicio: [data?.id_servicio || '', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicializa el formulario con los datos, si existen (para actualización)
    this.servicioForm = this.fb.group({
      id_servicio: [this.data?.id_servicio || '', Validators.required],
      nombre: [this.data?.nombre || '', Validators.required]
    });
  }


  // Método para cerrar el modal y enviar los datos
  onSubmit(): void {
    if (this.servicioForm.valid) {
      this.dialogRef.close(this.servicioForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
