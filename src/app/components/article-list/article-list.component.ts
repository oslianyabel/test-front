import { Component, OnInit, inject, ElementRef } from '@angular/core';
import { articulo } from '../../types/article.type';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { FiltrosComponent } from './filtros/filtros.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [FiltrosComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articulos!: articulo[];
  articulos_copy!: articulo[];
  articleService = inject(ArticleService);
  imagen_hover: boolean[] = new Array(445).fill(false);
  url: string[] = new Array(445).fill('');
  private router = inject(Router);
  aside = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.articleService.getProducts().subscribe({
      next: (data) => {
        this.articulos = data;
        this.articulos_copy = data;
        for (let i = 0; i < this.articulos.length; i++) {
          this.url[i] = this.articulos[i].Image;
        }
      },
      error: (error) => console.log(error),
    });
  }

  navegar(id: number): void {
    this.router.navigate([`/article/${id}`]);
  }

  category_filter(user_selection: string) {
    this.articulos = this.articulos_copy;
    if (user_selection != 'all')
      this.articulos = this.articulos.filter(
        (articulo) => articulo.Category == user_selection
      );
  }

  price_filter(range: number[]) {
    this.articulos = this.articulos_copy;
    this.articulos = this.articulos.filter((articulo) =>
        Number(articulo.Price.replace('$', '')) >= range[0] &&
        Number(articulo.Price.replace('$', '')) <= range[1]
    );
  }

  price_sort(order: string) {
    if(order == 'menor')
      this.articulos.sort((a, b) => {
        const precioA = parseFloat(a.Price.replace('$', ''));
        const precioB = parseFloat(b.Price.replace('$', ''));
        return precioA - precioB;
      });
    else
      this.articulos.sort((a, b) => {
        const precioA = parseFloat(a.Price.replace('$', ''));
        const precioB = parseFloat(b.Price.replace('$', ''));
        return precioB - precioA;
      });
  }

  promo_filter(promo: string) {
    if(promo == 'none') {
      this.articulos = this.articulos_copy;
      this.articulos = this.articulos.filter((articulo) => 
        articulo.Promo_apply == '' || articulo.Promo_apply == 'Promo codes will not apply to this product.'
      );
    }
    else {
      this.articulos = this.articulos_copy;
      this.articulos = this.articulos.filter((articulo) => articulo.Promo_apply == promo);
    }
  }

  reviews_filter(stars: [number, number]) {
    this.articulos = this.articulos_copy;
    this.articulos = this.articulos.filter((articulo) => 
      articulo.Reviews.rating >= stars[0] &&
      articulo.Reviews.rating <= stars[1]
    );
  }

  reviews_sort(order: string) {
    if(order == 'top')
      this.articulos.sort((a, b) => b.Reviews.rating - a.Reviews.rating);
    else
      this.articulos.sort((a, b) => a.Reviews.rating - b.Reviews.rating);
  }

  onWheel(event: WheelEvent) {
    const asideElement = this.elementRef.nativeElement.querySelector('aside');
    const isAsideScrollable = asideElement.scrollHeight > asideElement.offsetHeight;

    if (isAsideScrollable && event.deltaY!== 0) {
      event.preventDefault();
      asideElement.scrollTop += event.deltaY;
    }
  }

}
