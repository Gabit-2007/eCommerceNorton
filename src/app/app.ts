import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideShoppingCart } from '@lucide/angular'
import { Busca } from './busca/busca';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Busca],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('e-commerce');
}
