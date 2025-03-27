import { Component, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CharacterService } from '../services/character.service';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { Character } from '../services/character.interface';
import { CharacterResponse } from '../services/character-response.dto';
import { TranslateStatusPipe } from '../shared/translate-status.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CharacterCardComponent,
    PaginationComponent,
    TranslateStatusPipe,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Form controls
  readonly searchControl = new FormControl('');
  readonly statusControl = new FormControl('');

  // State signals
  readonly currentPage = signal(1);
  readonly characters = signal<Character[]>([]);
  readonly totalCharacters = signal(0);
  readonly totalPages = signal(0);
  readonly maxTotalCharacters = signal(0);
  readonly searchTerm = signal<string>('');
  readonly statusLabel = signal<string>('');

  constructor(private readonly characterService: CharacterService) {
    this.setupSearchListeners();
  }

  ngOnInit(): void {
    this.initializeMaxCharacters();
  }

  /** Sets up form control subscriptions */
  private setupSearchListeners(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.search());

    this.statusControl.valueChanges.subscribe(() => {
      this.currentPage.set(1);
      this.search();
    });
  }

  /** Loads initial max characters count */
  private initializeMaxCharacters(): void {
    this.characterService.searchCharacters({}).subscribe({
      next: (response: CharacterResponse) => this.maxTotalCharacters.set(response.info.count),
      error: () => this.maxTotalCharacters.set(0)
    });
    this.search();
  }

  /** Executes character search with current filters */
  search(): void {
    this.updateSearchCriteria();
    this.characterService.searchCharacters({
      name: this.searchControl.value || undefined,
      status: this.statusControl.value || undefined,
      page: this.currentPage()
    }).subscribe({
      next: response => this.handleSearchSuccess(response),
      error: () => this.handleSearchError()
    });
  }

  /** Updates search metadata signals */
  private updateSearchCriteria(): void {
    this.searchTerm.set(this.searchControl.value ?? '');
    this.statusLabel.set(this.statusControl.value ?? '');
  }

  /** Handles successful search response */
  private handleSearchSuccess(response: CharacterResponse): void {
    this.characters.set(response.results);
    this.totalCharacters.set(response.info.count);
    this.totalPages.set(response.info.pages);
  }

  /** Handles search errors */
  private handleSearchError(): void {
    this.characters.set([]);
    this.totalCharacters.set(0);
    this.totalPages.set(0);
  }

  /** Determines if search term exists */
  hasSearchTerm(): boolean {
    return !!this.searchControl.value?.trim();
  }

  /** Determines if status filter is active */
  hasStatus(): boolean {
    return !!this.statusControl.value;
  }

  /** Handles pagination changes */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.search();
  }
}
