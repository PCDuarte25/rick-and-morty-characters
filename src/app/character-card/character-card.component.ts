import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../services/character.interface';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  /** Character data to display */
  @Input({ required: true }) character!: Character;

  private readonly router = inject(Router);

  /**
   * Translates status to Portuguese
   * @param status Character status from API
   * @returns Translated status label
   */
  translateStatus(status: string): string {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Morto';
      case 'unknown':
        return 'Desconhecido';
      default:
        return 'Status desconhecido';
    }
  }

  /**
   * Navigates to character details page
   * @emits Route navigation to '/character/:id'
   */
  viewDetails(): void {
    this.router.navigate(['/character', this.character.id]);
  }
}
