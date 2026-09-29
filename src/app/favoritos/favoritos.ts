import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../service/storageService';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {
  private router = inject(Router);
  private storage = inject(StorageService)
  verDetalhe(codigo: number) : void {
    this.router.navigate(['/detalhe-item', codigo]);
  }

  itens: Pick<Produto, "codigo">[] = []
  produtos = produtosMock

  ngOnInit(): void {
      this.itens = this.storage.getItemFavorite()
    }

  adicionarCarrinho(produto: Produto) : void {
       
      const item: ItemCesta = {
        quantidade: 1,
        produto: produto.codigo,
        valor: produto.valorPromo ? produto.valorPromo : produto.valor
      }
  
      this.storage.setItemCart(item)
    }
    getProduto(codigo: number): Produto | undefined {
        return this.produtos.find(
          produto => produto.codigo === codigo
        )
      }
  
}
