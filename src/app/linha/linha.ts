import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-linha',
  imports: [CommonModule, CardProduto],
  templateUrl: './linha.html',
  styleUrl: './linha.css',
})
export class Linha {
    produtos = produtosMock.filter(p => p.categoria === 'Linha');
  
}
