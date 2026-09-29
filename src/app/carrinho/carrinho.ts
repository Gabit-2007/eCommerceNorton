import { Component, inject, OnInit } from '@angular/core';
import { ItemCesta } from '../model/item-cesta';
import { CommonModule, NgForOf } from '@angular/common';
import { StorageService } from '../service/storageService';
import { Produto } from '../model/produto';
import { produtosMock } from '../mocks/produtos.mock';
import { LucideTrash } from '@lucide/angular';

@Component({
  selector: 'app-carrinho',
  imports: [NgForOf, CommonModule, LucideTrash],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
    private storage = inject(StorageService)

    itens: ItemCesta[] = []
    produtos = produtosMock

    valorTotal = 0
    valorEconomizado = 0

    ngOnInit(): void {
        this.itens = this.storage.getItemsCart()
      }

      getProduto(codigo: number): Produto | undefined {
        return this.produtos.find(
          produto => produto.codigo === codigo
        )
      }

      totalizarValor(): any {
        for(let i = 0; i < this.itens.length; i++){
          this.itens.map(i => this.valorTotal += (i.valor * i.quantidade))
        }
        
        return this.valorTotal
      }

    FinalizarCompra() : void {
      localStorage.removeItem('user_cart')
    }

    RemoverItem(id: number) : void {
      const itens = this.storage.getItemsCart()
      const newList = itens.filter(d => d.produto !== id)
      localStorage.setItem('user_cart', JSON.stringify(newList))
      window.location.reload()
    }

    totalCarrinho(): number {
      return this.itens.reduce((total, item) => {
        const produto = produtosMock.find(
          produto => produto.codigo === item.produto
        );

        if (!produto) {
          return this.valorTotal;
        }

        const preco = produto.valorPromo > 0
          ? produto.valorPromo
          : produto.valor;

        return this.valorTotal + (preco * item.quantidade);
      }, 0);
    }
}

