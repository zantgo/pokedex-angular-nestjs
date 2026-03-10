import { Routes } from '@angular/router';

export const routes: Routes =[
  {
    path: '',
    loadComponent: () =>
      import('./features/pokedex/features/pokedex/pages/pokemon-list-page/pokemon-list-page').then(m => m.PokemonListPage)
  },
  {
    path: 'pokemon/:id',
    loadComponent: () =>
      import('./features/pokedex/features/pokedex/pages/pokemon-detail-page/pokemon-detail-page').then(m => m.PokemonDetailPage)
  },
  {
    path: '**', // Si el usuario escribe una URL que no existe, lo mandamos al inicio
    redirectTo: ''
  }
];
