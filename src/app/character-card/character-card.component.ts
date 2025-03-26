import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

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

  viewDetails() {
    // Implementar depois da paginação.
  }
}
