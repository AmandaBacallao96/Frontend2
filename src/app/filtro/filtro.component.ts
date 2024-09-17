import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const MATIRIAL_MODULES = [MatInput, MatFormField, MatLabel,];

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [FormsModule, MATIRIAL_MODULES],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>{{label()}}</mat-label>
      <input matInput type="text" [(ngModel)]="filter" [placeholder]="placeholder()">
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './filtro.component.scss'
})
export class FiltroComponent {
  filter = model('');
  label = input<string>('Filter');
  placeholder = input<string>('Ex. name');

}
