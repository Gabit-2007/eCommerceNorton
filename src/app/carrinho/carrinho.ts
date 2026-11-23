
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideTrash } from '@lucide/angular';
import { finalize, forkJoin } from 'rxjs';

import { ItemCesta } from '../model/item-cesta';
import { Produto } from '../model/produto';
import { StorageService } from '../service/storageService';
import { ProdutoService } from '../service/produto-service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, LucideTrash],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho implements OnInit {
  private storage = inject(StorageService);
  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  itens: ItemCesta[] = [];
  produtos: Produto[] = [];

  valorEconomizado = 0;
  carregando = true;
  mensagem = '';

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.itens = this.storage.getItemsCart();

    if (this.itens.length === 0) {
      this.carregando = false;
      return;
    }

    const requisicoes = this.itens.map(item =>
      this.produtoService.buscarPorCodigo(item.produto)
    );

    forkJoin(requisicoes)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          // Remove produtos que não foram encontrados na API
          this.produtos = dados.filter(produto => produto.codigo > 0);

          if (this.produtos.length === 0) {
            this.mensagem = 'Nenhum produto encontrado no carrinho.';
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar produtos do carrinho:', err);
          this.mensagem = 'Não foi possível carregar os produtos.';
        }
      });
  }

  getProduto(codigo: number): Produto | undefined {
    return this.produtos.find(
      produto => produto.codigo === codigo
    );
  }

  totalCarrinho(): number {
    return this.itens.reduce((total, item) => {
      const produto = this.getProduto(item.produto);

      if (!produto) {
        return total;
      }

      const preco = produto.valorPromo > 0
        ? produto.valorPromo
        : produto.valor;

      return total + (preco * item.quantidade);
    }, 0);
  }

  FinalizarCompra(): void {
    localStorage.removeItem('user_cart');
    this.itens = [];
    this.produtos = [];
  }

  RemoverItem(id: number): void {
    this.itens = this.itens.filter(
      item => item.produto !== id
    );

    this.produtos = this.produtos.filter(
      produto => produto.codigo !== id
    );

    localStorage.setItem(
      'user_cart',
      JSON.stringify(this.itens)
    );
  }
}
