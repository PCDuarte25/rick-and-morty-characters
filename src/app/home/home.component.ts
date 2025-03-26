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

  characters = signal<any[]>([]);
  totalCharacters = signal(0);
  maxTotalCharacters = signal(0);
  searchTerm = signal<string>('');
  statusLabel = signal<string>('');

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

  hasSearchTerm(): boolean {
    return !!this.searchControl.value;
  }

  hasStatus(): boolean {
    return !!this.statusControl.value;
  }

  getStatusLabel(): string {
    const status = this.statusControl.value;
    switch (status) {
      case 'alive':
        return 'Vivo';
      case 'dead':
        return 'Morto';
      default:
        return '';
    }
  }

  search() {
    this.updateSearchCriteria();
    this.characterService.searchCharacters({
      name: this.searchControl.value || undefined,
      status: this.statusControl.value || undefined,
      page: this.currentPage()
    }).subscribe({
      next: (response: CharacterResponse) => {
        this.characters.set(response.results);
        this.totalCharacters.set(response.info.count);
      },
      error: () => {
        this.characters.set([]);
        this.totalCharacters.set(0);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.search();
  }

  private updateSearchCriteria() {
    this.searchTerm.set(this.searchControl.value || '');
    this.statusLabel.set(this.getStatusLabel());
  }
}
