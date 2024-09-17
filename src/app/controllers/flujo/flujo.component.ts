import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flujo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flujo.component.html',
  styleUrl: './flujo.component.scss'
})
export class FlujoComponent {

  esAdmin: boolean = false;

  ciudades =[{
    id: 1,nombre: 'Bogota'
  },{
    id: 2,nombre: 'Medellin'
  },{
    id: 3,nombre: 'Cali'
  }];
}
