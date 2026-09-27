import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class InputComponent {

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = '';

}