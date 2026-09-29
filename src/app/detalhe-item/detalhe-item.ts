import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../model/produto';
import { StorageService } from '../service/storageService';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-detalhe-item',
  imports: [CommonModule],
  templateUrl: './detalhe-item.html',
  styleUrl: './detalhe-item.css',
})
export class DetalheItem implements OnInit {
  private route = inject(ActivatedRoute);

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

  produto: Produto | undefined;

  ngOnInit(): void {
    const codigo = Number(this.route.snapshot.paramMap.get('codigo'));

    this.produto = produtosMock.find(
      p => p.codigo === Number(this.route.snapshot.paramMap.get('codigo'))
    );
  }
}
