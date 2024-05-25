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

  @Output() price_emitter = new EventEmitter<string>();
  @Output() category_emitter = new EventEmitter<string>();
  @Output() promo_emitter = new EventEmitter<string>();
  @Output() reviews_emitter = new EventEmitter<string>();

}
