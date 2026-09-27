import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {}
