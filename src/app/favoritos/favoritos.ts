
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { StorageService } from '../service/storageService';
import { ProdutoService } from '../service/produto-service';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos implements OnInit {
  private router = inject(Router);
  private storage = inject(StorageService);
  private service = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  itens: Pick<Produto, 'codigo'>[] = [];
  produtos: Produto[] = [];

  carregando = true;

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos(): void {
    this.itens = this.storage.getItemFavorite();

    if (this.itens.length === 0) {
      this.carregando = false;
      return;
    }

    const requisicoes = this.itens.map(item =>
      this.service.buscarPorCodigo(item.codigo)
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
          this.produtos = dados.filter(produto => produto.codigo > 0);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao carregar favoritos:', err);
        }
      });
  }

  verDetalhe(codigo: number): void {
    this.router.navigate(['/detalhe-item', codigo]);
  }

  adicionarCarrinho(produto: Produto): void {
    const item: ItemCesta = {
      quantidade: 1,
      produto: produto.codigo,
      valor: produto.valorPromo
        ? produto.valorPromo
        : produto.valor
    };

    this.storage.setItemCart(item);
  }
}
