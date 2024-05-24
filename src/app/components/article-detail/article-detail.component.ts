import { Component, OnInit, inject } from '@angular/core';
import { articulo } from '../../types/article.type';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [NgFor],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  article!: articulo;
  image!: string;
  image1!: string;
  color1!: string;
  color2!: string;
  id!: number;
  route = inject(ActivatedRoute);
  articleService = inject(ArticleService);
  rating!: number;
  stars!: string[];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.articleService.getProducts().subscribe({
      next: (data) => {
        this.article = data[this.id - 1];
        this.image = this.article.Image;
        this.image1 = this.article.Image1;
        this.color1 = this.article.Color_detail[0].image_url;
        this.color2 = this.article.Color_detail[1].image_url;
        this.rating = Math.round(this.article.Reviews.rating);
        this.stars = this.getStars(this.rating);
      },
      error: (error) => console.log(error),
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('★');
      } else {
        stars.push('☆');
      }
    }
    return stars;
  }
}