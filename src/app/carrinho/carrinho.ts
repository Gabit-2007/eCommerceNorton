import { Component, inject, OnInit } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { CommonModule, NgForOf } from '@angular/common';
import { StorageService } from '../service/storageService';

@Component({
  selector: 'app-carrinho',
  imports: [NgForOf, CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
    private storage = inject(StorageService)

    ngOnInit(): ItemCesta[] {
        const itens = this.storage.getItemsCart()
        return itens
      }

    FinalizarCompra() : void {
      localStorage.removeItem('user_cart')
    }

    RemoverItem(id: number) : void {
      const itens = this.storage.getItemsCart()
      const newList = itens.filter(d => d.produto !== id)
      localStorage.setItem('user_cart', JSON.stringify(newList))
    }
}

