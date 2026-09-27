import { Component } from '@angular/core';
import { produtosMock } from '../mocks/produtos.mock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pintura',
  imports: [CommonModule],
  templateUrl: './pintura.html',
  styleUrl: './pintura.css',
})
export class Pintura {
    produtos = produtosMock.filter(p => p.categoria === 'Pintura');
  
}
