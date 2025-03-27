import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { TranslateStatusPipe } from '../shared/translate-status.pipe';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateStatusPipe
  ],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly characterService = inject(CharacterService);

  /** Observable of character details loaded based on route ID */
  readonly character$ = this.route.params.pipe(
    switchMap(params =>
      this.characterService.getCharacterById(Number(params['id']))
    )
  );
}
