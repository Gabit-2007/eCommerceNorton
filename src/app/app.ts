import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LucideShoppingCart, LucideUser, LucideStar, LucideTrash } from '@lucide/angular'
import { Busca } from './busca/busca';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    Busca, 
    LucideUser, 
    LucideShoppingCart, 
    LucideStar, 
    LucideTrash,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('e-commerce');
}
