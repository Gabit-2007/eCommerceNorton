import { Component, inject, Input } from '@angular/core';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';
import { StorageService } from '../service/storageService';
import { ItemCesta } from '../model/item-cesta';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-card-produto',
  imports: [CommonModule, NgIf],
  templateUrl: './card-produto.html',
  styleUrl: './card-produto.css',
})
export class CardProduto {
  @Input() produto!: Produto;

  private router = inject(Router);
  private storage = inject(StorageService);

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
}
