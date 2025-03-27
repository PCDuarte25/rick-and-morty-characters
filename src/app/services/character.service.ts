import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { CharacterResponse } from './character-response.dto';
import { Character } from './character.interface';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private cache = new Map<string, CharacterResponse>();
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  /**
   * Searches characters with optional filters
   * @param filters - Search parameters
   * @returns Observable with paginated results
   */
  searchCharacters(filters: { name?: string; status?: string; page?: number }): Observable<CharacterResponse> {
    const params = new URLSearchParams({
      ...(filters.name && { name: filters.name }),
      ...(filters.status && { status: filters.status }),
      ...(filters.page && { page: filters.page.toString() })
    });

    const cacheKey = params.toString();

    if (this.cache.has(cacheKey)) {
      const cachedResponse = this.cache.get(cacheKey);
      if (cachedResponse) {
        return of(cachedResponse);
      }
    }

    return this.http.get<CharacterResponse>(`${this.baseUrl}?${params}`).pipe(
      tap(response => this.cache.set(cacheKey, response)));
  }

  /**
   * Fetches single character by ID
   * @param id - Character identifier
   * @returns Observable with character details
   */
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`);
  }
}
