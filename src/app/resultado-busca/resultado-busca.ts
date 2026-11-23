
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

import { ProdutoService } from '../service/produto-service';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-resultado-busca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-busca.html',
  styleUrl: './resultado-busca.css',
})
export class ResultadoBusca implements OnInit {
  private service = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);

  lista: Produto[] = [];
  mensagem = '';
  carregando = true;

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos(): void {
    const json = localStorage.getItem('termoBusca');

    if (json === null) {
      this.mensagem = 'Nada foi informado, nada de pesquisa';
      this.carregando = false;
      return;
    }

    const termo = JSON.parse(json);

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
