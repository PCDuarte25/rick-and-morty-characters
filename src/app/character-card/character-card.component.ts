import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [
    CommonModule,
  ],
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character: any;

  private router = inject(Router);

  viewDetails() {
    this.router.navigate(['/character', this.character.id]);
  }
}
