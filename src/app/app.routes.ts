import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { Page404Component } from './page-404/page-404.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

export const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent,
    title: 'PokeApi',
  },
  {
    path: ':id',
    component: PokemonDetailComponent,
    title: 'PokeApi - detail',
  },
  {
    path: '**',
    component: Page404Component,
    title: 'PokeApi - not found',
  },
];
