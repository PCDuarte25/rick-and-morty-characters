import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CharacterResponse } from './character-response.dto';
import { Character } from './character.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private cache = new Map<string, CharacterResponse>();
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  searchCharacters(filters: { name?: string; status?: string; page?: number }): Observable<CharacterResponse> {
    const params = new URLSearchParams();
    if (filters.name) params.set('name', filters.name);
    if (filters.status) params.set('status', filters.status);
    if (filters.page) params.set('page', filters.page.toString());

    const cacheKey = params.toString();

    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }

    return this.http.get<CharacterResponse>(`${this.baseUrl}?${params}`).pipe(
      tap(response => this.cache.set(cacheKey, response))
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`);
  }
}
