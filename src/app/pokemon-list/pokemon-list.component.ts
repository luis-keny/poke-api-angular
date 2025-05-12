import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

import { PokeApiService } from '@/service/poke-api.service';
import { PokemonPaginator } from '@/model/pokemon-paginator';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [MatCardModule, MatPaginatorModule, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private pokeApiSrv: PokeApiService = new PokeApiService()
  private pokeApiSub = new Subscription()
  
  public pokemonPaginator: PokemonPaginator | null = null
  public pageSize: number = 20
  public listVoid = Array(this.pageSize)
  public isLoading: boolean = true
  public pageIndex: number = 0
  public pageCurrent: number = 0

  ngOnInit(): void {
    this.pokeApiGetPaginator(this.pageCurrent, this.pageSize)
  }

  ngOnDestroy(): void {
    if(this.pokeApiSub) this.pokeApiSub.unsubscribe();
  }

  private pokeApiGetPaginator(pageCurrent: number, pageSize: number) {
    this.pokeApiSub = this.pokeApiSrv.getPokemonPaginator(pageCurrent, pageSize).subscribe({
      next: (result) => this.pokemonPaginator = result,
      complete: () => this.isLoading = false,
    })
  }

  public getImages(index: number) {
    return this.pokeApiSrv.getImageByIndex(index)
  }

  public changePage({ pageSize, pageIndex }: PageEvent) {
    this.pokemonPaginator = null
    this.listVoid = Array(this.pageSize)
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.pageCurrent = pageIndex * pageSize

    this.isLoading = true
    this.pokeApiGetPaginator(this.pageCurrent, this.pageSize)
  }
}
