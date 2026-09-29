import { Component, inject, OnInit } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { CommonModule, NgForOf } from '@angular/common';
import { StorageService } from '../service/storageService';
import { Produto } from '../model/produto';
import { produtosMock } from '../mocks/produtos.mock';

@Component({
  selector: 'app-carrinho',
  imports: [NgForOf, CommonModule],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
    private storage = inject(StorageService)

    itens: ItemCesta[] = []
    produtos = produtosMock

    ngOnInit(): void {
        this.itens = this.storage.getItemsCart()
      }

      getProduto(codigo: number): Produto | undefined {
        return this.produtos.find(
          produto => produto.codigo === codigo
        )
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

