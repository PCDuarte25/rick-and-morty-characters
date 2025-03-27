import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  private route = inject(ActivatedRoute);
  private characterService = inject(CharacterService);

  character$ = this.route.params.pipe(
    switchMap(params =>
      this.characterService.getCharacterById(Number(params['id']))
    )
  );
}
