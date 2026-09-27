import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-linha',
  imports: [CommonModule],
  templateUrl: './linha.html',
  styleUrl: './linha.css',
})
export class Linha {
    produtos = produtosMock.filter(p => p.categoria === 'Linha');
  
}
