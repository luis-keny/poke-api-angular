import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';

import { PokeApiService } from '@/service/poke-api.service';
import { PokemonDetail } from '@/model/pokemon-detail';

@Component({
  selector: 'app-pokemon-detail',
  imports: [MatCardModule, RouterLink],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private router = inject(ActivatedRoute)
  private pokeApiSrv = new PokeApiService
  private pokeApiSub = new Subscription()
  
  public pokemonDetail: PokemonDetail | null = null;

  ngOnInit(): void {
    const getId = this.router.snapshot.paramMap.get('id')
    if(!getId) return;
    const id = parseInt(getId)
    this.pokeApiSub = this.pokeApiSrv.getPokemonById(id).subscribe({
      next: (result) => this.pokemonDetail = result
    })
  }

  ngOnDestroy(): void {
    if(this.pokeApiSub) this.pokeApiSub.unsubscribe
  }

  public getImages(id: number) {
    return this.pokeApiSrv.getImageByIndex(id)
  }
}
