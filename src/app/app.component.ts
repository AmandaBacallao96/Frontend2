import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PadreComponent } from "./comunicacion/padre/padre.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

const MATIRIAL_MODULES = [MatIconModule, MatButtonModule, MatToolbarModule,MatCardModule];


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PadreComponent, RouterLink, RouterLinkActive,MATIRIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gestion-angular';
}
