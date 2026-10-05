import { Component, inject } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';
import { StorageService } from '../service/storageService';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-pintura',
  imports: [CommonModule, CardProduto],
  templateUrl: './pintura.html',
  styleUrl: './pintura.css',
})
export class Pintura {
  private router = inject(Router);
  private storage = inject(StorageService)
  verDetalhe(codigo: number) : void {
    this.router.navigate(['/detalhe-item', codigo]);
  }

  adicionarCarrinho(produto: Produto) : void {
       
      const item: ItemCesta = {
        quantidade: 1,
        produto: produto.codigo,
        valor: produto.valorPromo ? produto.valorPromo : produto.valor
      }
  
      this.storage.setItemCart(item)
    }
    produtos = produtosMock.filter(p => p.categoria === 'Pintura');
  
}
