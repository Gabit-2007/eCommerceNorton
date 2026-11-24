
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

import { ProdutoService } from '../service/produto-service';
import { Produto } from '../model/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [CommonModule, CardProduto],
  templateUrl: './resultado-busca.html',
  styleUrl: './resultado-busca.css',
})
export class ResultadoBusca implements OnInit {
  private service = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);

  lista: Produto[] = [];
  mensagem = '';
  carregando = true;

  ngOnInit(): void {
    // O termo vem na URL (/resultado-busca?termo=...). Assim, uma nova busca
    // feita estando nesta mesma página também atualiza a lista.
    this.route.queryParamMap.subscribe((params) => {
      this.buscarProdutos((params.get('termo') ?? '').trim());
    });
  }

  buscarProdutos(termo: string): void {
    this.lista = [];
    this.mensagem = '';

    if (!termo) {
      this.mensagem = 'Nada foi informado na pesquisa';
      this.carregando = false;
      this.cdr.detectChanges();
      return;
    }

    this.carregando = true;

    this.service.buscar(termo)
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (dados) => {
          this.lista = dados;

          if (this.lista.length <= 0) {
            this.mensagem = `Não foi encontrado nada com o termo "${termo}"`;
          }

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro ao buscar produtos:', err);
          this.mensagem = 'Ocorreu um erro, tente mais tarde!';
        }
      });
  }
}
