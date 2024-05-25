import { Component, OnInit, inject } from '@angular/core';
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
  articleService = inject(ArticleService);
  imagen_hover: boolean[] = new Array(445).fill(false);
  url: string[] = new Array(445).fill("");
  private router = inject(Router);
  aside = false;

  ngOnInit(): void {
    this.articleService.getProducts().subscribe({
      next: (data) => {
        this.articulos = data;
        for (let i = 1; i < this.articulos.length; i++) {
          this.url[i] = this.articulos[i].Image;
        }
      },
      error: (error) => console.log(error),
    });
  }

  navegar(id: number): void {
    this.router.navigate([`/article/${id}`]);
  }

  ordenarPorPrecio(articulos: articulo[]): articulo[] {
    return articulos.sort((a, b) => {
      const precioA = parseFloat(a.Price);
      const precioB = parseFloat(b.Price);
      return precioA - precioB;
    });
  }

}
