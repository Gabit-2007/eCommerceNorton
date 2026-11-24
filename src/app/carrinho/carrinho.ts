import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideTrash } from '@lucide/angular';
import { finalize, forkJoin } from 'rxjs';

import { ItemCesta } from '../model/item-cesta';
import { Produto } from '../model/produto';
import { StorageService } from '../service/storageService';
import { ProdutoService } from '../service/produto-service';
import { PedidoService } from '../service/pedido-service';
import { NovoPedido } from '../model/pedido';

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
  private pedidoService = inject(PedidoService);

  itens: ItemCesta[] = [];
  produtos: Produto[] = [];

  carregando = true;
  finalizando = false;

  total = 0;
  valorEconomizado = 0;

  mensagem = '';
  mensagemSucesso = false;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.itens = this.storage.getItemsCart();

    if (this.itens.length === 0) {
      this.carregando = false;
      this.total = 0;
      return;
    }

    const requisicoes = this.itens.map(item =>
      this.produtoService.buscarPorCodigo(item.produto)
    );

    forkJoin(requisicoes)
      .pipe(
        finalize(() => {
          this.carregando = false;
        })
      )
      .subscribe({
        next: (dados) => {
          this.produtos = dados.filter(
            produto => produto.codigo > 0
          );

          this.calcularTotal();

          if (this.produtos.length === 0) {
            this.mensagem = 'Nenhum produto encontrado no carrinho.';
          }
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos do carrinho:', erro);
          this.mensagem = 'Não foi possível carregar os produtos.';
        }
      });
  }

  getProduto(codigo: number): Produto | undefined {
    return this.produtos.find(
      produto => produto.codigo === codigo
    );
  }

  calcularTotal(): void {
    this.total = this.itens.reduce((soma, item) => {
      const produto = this.getProduto(item.produto);

      if (!produto) {
        return soma;
      }

      const preco = produto.valorPromo > 0
        ? produto.valorPromo
        : produto.valor;

      return soma + preco * item.quantidade;
    }, 0);
  }

 FinalizarCompra(): void {
  console.log('clicou', { total: this.total, itens: this.itens.length });
  if (
    this.carregando ||
    this.finalizando ||
    this.itens.length === 0 ||
    this.total <= 0
  ) {
    return;
  }

  this.finalizando = true;
  this.mensagem = '';

  const pedido: NovoPedido = {
    valorTotal: this.total,
    entrega: 'Endereço do cliente', // ajuste: de onde vem a entrega?
    obs: '',
    dataPedido: new Date().toISOString(),
    codigoCliente: 1, // ajuste: pegar do cliente logado
  };

  this.pedidoService.criarPedido(pedido)
    .pipe(finalize(() => (this.finalizando = false)))
    .subscribe({
      next: () => {
        this.mensagem = 'Pedido realizado com sucesso!';
        this.mensagemSucesso = true;

        this.itens = [];
        this.produtos = [];
        this.total = 0;
        localStorage.removeItem('user_cart');
      },
      error: (erro) => {
        console.error('Erro ao finalizar pedido:', erro);
        this.mensagem = 'Não foi possível finalizar a compra.';
        this.mensagemSucesso = false;
      }
    });
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

    this.calcularTotal();
  }
}