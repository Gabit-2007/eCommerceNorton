import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-papelaria',
  imports: [CommonModule],
  templateUrl: './papelaria.html',
  styleUrl: './papelaria.css',
})
export class Papelaria {
    produtos = produtosMock.filter(p => p.categoria === 'Papelaria');
}
