import { Component, inject } from '@angular/core';
import { InputComponent } from '../input/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router)

  
}
