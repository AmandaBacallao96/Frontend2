import { Component } from '@angular/core';
import { HijoComponent } from "../hijo/hijo.component";

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [HijoComponent],
  templateUrl: './padre.component.html',
  styleUrl: './padre.component.scss'
})
export class PadreComponent {
  profesion_padre: string = 'Programador';
  antiguedad:number = 0;

  obtenerAntiguedadPadre(emittedAntiguedad: number) {
    this.antiguedad = emittedAntiguedad;
  }

}
