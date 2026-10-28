import { Component } from '@angular/core';
import { InputComponent } from '../input/input';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [InputComponent, FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  mensagem:string=''
  obj:Cliente = new Cliente();

  ngOnInit(){
    this.carregar()
  }
  gravar(){
    this.mensagem= "Cadastro atualizado com sucesso!";
    let json = JSON.stringify(this.obj);
    localStorage.setItem('Cadastro', json)
  }

  carregar(){
    this.mensagem = '';
    let json = localStorage.getItem('Cadastro');
    if (json !== null) {
      this.obj = JSON.parse(json)
    }
  }
  mudarSenha(){}
}
