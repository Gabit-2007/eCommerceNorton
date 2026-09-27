import { Component } from '@angular/core';
import { LucideSearch } from '@lucide/angular'

@Component({
  selector: 'app-busca',
  imports: [LucideSearch],
  standalone: true,
  templateUrl: './busca.html',
  styleUrl: './busca.css',
})
export class Busca {}
