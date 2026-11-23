import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../service/produto-service';
import { CardProduto } from '../card-produto/card-produto';
import { finalize } from 'rxjs';
import { Router } from 'express';
import { StorageService } from '../service/storageService';

@Component({
  selector: 'app-feed',
  imports: [CommonModule, CardProduto],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
  mensagem : String = "";
  lista: Produto[] = [];

   private router = inject(Router());
  private storage = inject(StorageService);
  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  produtos: Produto[] = [];

  carregando = true;
  erro = false;

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.carregando = true;
    this.erro = false;

    this.produtoService.listar()
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          this.produtos = dados;

          this.cdr.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao buscar produtos:', erro);

          this.erro = true;
        }
      });
  }
}
