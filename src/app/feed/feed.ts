import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {}

export class Vitrine {
  mensagem : String = "";
  lista: Produto[] = [];

  constructor{private service: ProdutoService}{}

  ngOninit(){
    this.service.carregarVitrine().subscribe({
      next:(dados) =>{
        this.lista = dados;
      }
    })
  }
}