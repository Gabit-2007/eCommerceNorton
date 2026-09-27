import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-costura',
  imports: [CommonModule],
  templateUrl: './costura.html',
  styleUrl: './costura.css',
})
export class Costura {
    produtos = produtosMock.filter(p => p.categoria === 'Costura');
  
}
