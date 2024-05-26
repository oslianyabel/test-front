import { Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';

export const routes: Routes = [
  {
    path: 'articles',
    component: ArticleListComponent,
  },
  {
    path: 'article/:id',
    component: ArticleDetailComponent,
  },
  {
    path: '**',
    redirectTo: '/articles',
  },
];
