import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.scss'
})
export class HijoComponent {
  @Input() profesion: string = '';

  @Output() antiguedadEvent = new EventEmitter<number>();
  obtenerAntiguedad() {
    this.antiguedadEvent.emit(10);
  }

}
