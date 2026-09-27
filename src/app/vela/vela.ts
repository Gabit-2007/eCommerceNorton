import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-vela',
  imports: [CommonModule],
  templateUrl: './vela.html',
  styleUrl: './vela.css',
})
export class Vela {
    produtos = produtosMock.filter(p => p.categoria === 'Vela');

    constructor(private router: Router) {}

    verDetalhe(codigo: number) {
      this.router.navigate(['/detalhe', codigo]);
    }
}
