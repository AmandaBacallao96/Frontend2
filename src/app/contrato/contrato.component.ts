import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ControlhorarioComponent } from "./controlhorario/controlhorario.component";
import { MultipleComponent } from "./multiple/multiple.component";

const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule,MatTabsModule];

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule, ControlhorarioComponent, MultipleComponent],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.scss'
})
export class ContratoComponent {

}
