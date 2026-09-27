import { Component } from '@angular/core';
import { InputComponent } from '../input/input';

@Component({
  selector: 'app-login',
  imports: [InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
