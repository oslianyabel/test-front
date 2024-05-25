import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  price = false;
  category = false;
  promo = false;
  reviews = false;

  @Output() close_emitter = new EventEmitter();

  close() {
    this.close_emitter.emit("cerrar");
  }

}
