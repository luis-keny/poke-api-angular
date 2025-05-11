import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { PokemonDetail } from '@/model/pokemon-detail';
import { PokemonPaginator } from '@/model/pokemon-paginator';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private API_URL = 'https://pokeapi.co/api/v2/pokemon';
  private IMAGE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
  private http = inject(HttpClient);

  public getPokemonPaginator(offset: number, limit: number) {
    return this.http.get<PokemonPaginator>(`${this.API_URL}/?offset=${offset}&limit=${limit}`)
  }

  public getPokemonById(id: number) {
    return this.http.get<PokemonDetail>(`${this.API_URL}/${id}`)
  }

  public getImageByIndex(index: number) {
    return `${this.IMAGE_URL}/${index}.png`
  }
}
