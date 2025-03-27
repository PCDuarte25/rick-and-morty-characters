import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../services/character.interface';
import { TranslateStatusPipe } from '../shared/translate-status.pipe';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    CommonModule,
    TranslateStatusPipe
  ],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  /** Character data to display */
  @Input({ required: true }) character!: Character;

  private readonly router = inject(Router);

  /**
   * Navigates to character details page
   * @emits Route navigation to '/character/:id'
   */
  viewDetails(): void {
    this.router.navigate(['/character', this.character.id]);
  }
}
