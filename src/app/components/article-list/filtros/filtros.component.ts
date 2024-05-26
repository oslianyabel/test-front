import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent {
  price = false;
  category = false;
  promo = false;
  reviews = false;
  min_price = 0;
  max_price = 999;
  min_stars!: number;
  max_stars!: number;

  @Output() price_emitter = new EventEmitter<[number, number]>();
  @Output() price_emitter_sort = new EventEmitter<string>();
  @Output() category_emitter = new EventEmitter<string>();
  @Output() promo_emitter = new EventEmitter<string>();
  @Output() reviews_emitter = new EventEmitter<[number, number]>();
  @Output() reviews_emitter_sort = new EventEmitter<string>();

}
