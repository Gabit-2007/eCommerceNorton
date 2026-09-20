import { Component } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  imports: [NgForOf],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
  lista: ItemCesta[] = [
  {
    "produto": 1,
    "quantidade": 2,
    "valor": 49.90
  },
  {
    "produto": 2,
    "quantidade": 1,
    "valor": 39.90
  },
  {
    "produto": 4,
    "quantidade": 1,
    "valor": 59.90
  },
  {
    "produto": 6,
    "quantidade": 3,
    "valor": 42.90
  },
  {
    "produto": 7,
    "quantidade": 1,
    "valor": 54.90
  },
  {
    "produto": 9,
    "quantidade": 2,
    "valor": 64.90
  },
  {
    "produto": 10,
    "quantidade": 1,
    "valor": 44.90
  }
]
}
