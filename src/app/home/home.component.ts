import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../services/character.service';
import { CharacterResponse } from '../services/character-response.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  searchControl = new FormControl('');
  statusControl = new FormControl('');
  currentPage = signal(1);

  maxTotalCharacters = signal(0);


  constructor(private characterService: CharacterService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.search());

    this.statusControl.valueChanges.subscribe(() => {
      this.currentPage.set(1);
      this.search();
    });
  }

  ngOnInit() {
    this.characterService.searchCharacters({}).subscribe({
      next: (response: CharacterResponse) => {
        this.maxTotalCharacters.set(response.info.count);
      },
      error: () => {
        this.maxTotalCharacters.set(0);
      }
    });

    this.search();
  }

  search() {
    this.characterService.searchCharacters({
      name: this.searchControl.value || undefined,
      status: this.statusControl.value || undefined,
      page: this.currentPage()
    }).subscribe({
      next: (response: CharacterResponse) => {

      },
      error: () => {

      }
    });
  }
}
