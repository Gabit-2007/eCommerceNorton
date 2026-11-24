import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideSearch } from '@lucide/angular'

@Component({
  selector: 'app-busca',
  imports: [LucideSearch, FormsModule],
  standalone: true,
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {
  private router = inject(Router);

  termo: string = '';

  // Vai para a página de resultados; quem chama a API é o ResultadoBusca
  buscar(): void {
    const termo = this.termo.trim();

    if (!termo) {
      return;
    }

    this.router.navigate(['/resultado-busca'], { queryParams: { termo } });
  }
}
