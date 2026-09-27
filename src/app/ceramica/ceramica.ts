import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ceramica',
  imports: [CommonModule],
  templateUrl: './ceramica.html',
  styleUrl: './ceramica.css',
})
export class Ceramica {
  produtos = produtosMock.filter(p => p.categoria === 'Ceramica');
}
