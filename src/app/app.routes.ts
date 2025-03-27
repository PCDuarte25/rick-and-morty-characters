import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

/**
 * Application routes configuration
 * - Home: Main listing page
 * - Character: Details view for individual characters
 */
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Personagens R&M' },
  {
    path: 'character/:id',
    component: CharacterDetailsComponent,
    title: 'Detalhes do Personagem'
  }
];
