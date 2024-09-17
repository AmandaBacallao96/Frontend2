import { ComponentType } from '@angular/cdk/portal';
import { Component, Inject, Injectable, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Servicio } from '../../models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

 private readonly _dialog = inject(MatDialog);

 openModal<CT,T = Servicio>(componentRef: ComponentType<CT>, data?: T, isEditing = false): void {
  const config = { data, isEditing};

  this._dialog.open(componentRef, {
    data: config,
    width: '600px',
  });
}



 closeModal(): void {
   this._dialog.closeAll();
 }

 showMessage(message: string): void {
    // Aquí debes definir tu componente de mensaje
    const dialogRef = this._dialog.open(MessageDialogComponent, {
      data: { message },
      width: '300px',
    });

    // Puedes agregar un cierre automático al diálogo
    dialogRef.afterClosed().subscribe(() => {
      // Cierra el diálogo después de un tiempo determinado (opcional)
    });
  }

 
}

// Define un componente simple para mostrar el mensaje
@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="dialogRef.close()">Cerrar</button>
    </div>
  `,
})
export class MessageDialogComponent {
  data: { message: string };

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public injectedData: { message: string }) {
    this.data = injectedData;
  }
}
