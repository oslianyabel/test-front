import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { articulo } from '../types/article.type';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = 'assets/json/DatosScraping.json';
  http = inject(HttpClient);

  constructor() {
  }

  getProducts(): Observable<articulo[]> {
    return this.http.get<articulo[]>(this.url);
  }
}
