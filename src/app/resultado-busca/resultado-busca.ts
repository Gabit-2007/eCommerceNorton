import { Component } from '@angular/core';
import { ProdutoService } from '../service/produto-service';
import { Produto } from '../model/produto';
import { error } from 'console';

@Component({
  selector: 'app-resultado-busca',
  imports: [],
  templateUrl: './resultado-busca.html',
  styleUrl: './resultado-busca.css',
})
export class ResultadoBusca {
  lista: Produto[] = [];
  mensagem: string = "";
}

constructor(private service: ProdutoService){}

ngOnInit(){
  let json =localStorage.getItem("termoBusca");

  if(json==null){
  this.mensagem = "Nada foi informado, nada de pesquisa";
} else {
  this.service.fazerBusca(JASON.parse(json)).subscribe({
    next:(dados) => {
      this.lista= dados;
      if(this.lista.length <= 0) this.mensagem = "Não foi encontrado nada com o termo" + json;
    },
    error: (err) => {
      this.mensagem = "ocorreu erro, tente mais tarde!";
    } 
  })
}
