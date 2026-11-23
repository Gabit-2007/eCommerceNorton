
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { Produto } from '../model/produto';
import { StorageService } from '../service/storageService';
import { ProdutoService } from '../service/produto-service';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-detalhe-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe-item.html',
  styleUrl: './detalhe-item.css',
})
export class DetalheItem implements OnInit {
  private route = inject(ActivatedRoute);
  private storage = inject(StorageService);
  private service = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  produto: Produto | undefined;
  carregando = true;
  mensagem = '';

  ngOnInit(): void {
    const codigo = Number(this.route.snapshot.paramMap.get('codigo'));

    if (!codigo || isNaN(codigo)) {
      this.mensagem = 'Produto não encontrado!';
      this.carregando = false;
      return;
    }

    this.service.buscarPorCodigo(codigo)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          if (dados.codigo) {
            this.produto = dados;
          } else {
            this.mensagem = 'Produto não encontrado!';
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar produto:', err);
          this.mensagem = 'Ocorreu um erro ao carregar o produto!';
        }
      });
  }

  adicionarCarrinho(produto: Produto): void {
    const item: ItemCesta = {
      quantidade: 1,
      produto: produto.codigo,
      valor: produto.valorPromo ? produto.valorPromo : produto.valor
    };

    this.storage.setItemCart(item);
  }

  favoritar(produto: Produto): void {
    this.storage.setItemFavorite({
      codigo: produto.codigo
    });
  }
}
