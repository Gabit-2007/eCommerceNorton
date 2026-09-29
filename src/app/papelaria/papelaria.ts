import { Component, inject } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../service/storageService';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-papelaria',
  imports: [CommonModule],
  templateUrl: './papelaria.html',
  styleUrl: './papelaria.css',
})
export class Papelaria {
  private router = inject(Router);
  private storage = inject(StorageService)

  adicionarCarrinho(produto: Produto) : void {
    console.log("a", produto.codigo)
    const item: ItemCesta = {
      quantidade: 1,
      produto: produto.codigo,
      valor: produto.valorPromo ? produto.valorPromo : produto.valor
    }

    this.storage.setItemCart(item)
  }

  verDetalhe(codigo: number) : void {
    this.router.navigate(['/detalhe-item', codigo]);
  }
    produtos = produtosMock.filter(p => p.categoria === 'Papelaria');
}
