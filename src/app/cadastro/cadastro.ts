import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { InputComponent } from '../input/input';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente-service';
import { StorageService } from '../service/storageService';

@Component({
  selector: 'app-cadastro',
  imports: [InputComponent, FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  private service = inject(ClienteService)
  private storage = inject(StorageService)
  private router = inject(Router)
  private cdr = inject(ChangeDetectorRef)

  mensagem:string=''
  erro:boolean=false
  confirmaSenha:string=''
  obj:Cliente = new Cliente();

  ngOnInit(){
    this.carregar()
  }

  // Mesmas regras de senha/telefone do projeto de exemplo do professor
  private validar(): string {
    if (!this.obj.nome.trim()) return 'Nome é obrigatório!'
    if (!this.obj.documento.trim()) return 'Documento é obrigatório!'
    if (!this.obj.email.trim()) return 'Email é obrigatório!'
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.obj.senha)) {
      return 'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&).'
    }
    if (this.obj.senha !== this.confirmaSenha) return 'As senhas não conferem!'
    if (!/^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/.test(this.obj.telefone.trim())) return 'Informe um telefone válido!'
    return ''
  }

  private mostrar(texto: string, erro: boolean) {
    this.mensagem = texto
    this.erro = erro
    this.cdr.detectChanges()
  }

  // O botão está dentro de um <a href>: o preventDefault evita que o link recarregue a página antes da API responder
  gravar(event?: Event){
    event?.preventDefault()

    const problema = this.validar()
    if (problema) {
      this.mostrar(problema, true)
      return
    }

    // dtNascimento só existe na tela, a API não tem esse campo
    const { dtNascimento, ...dados } = this.obj

    if (this.obj.codigo == 0) {
      // novo cliente: a API só deixa logar clientes com ativo=1
      dados.ativo = 1
      this.service.gravar(dados).subscribe({
        next: (resposta) => {
          this.mostrar(resposta, false)
          setTimeout(() => this.router.navigate(['/login']), 1500)
        },
        error: (err) => {
          console.error('Erro ao gravar cliente:', err)
          this.mostrar('Ocorreu um erro durante a gravação do cliente!', true)
        }
      })
    } else {
      // cliente já logado: altera os dados dele
      this.service.alterar(dados).subscribe({
        next: (resposta) => {
          this.storage.setCliente({ ...this.obj })
          this.mostrar(resposta, false)
        },
        error: (err) => {
          console.error('Erro ao alterar cliente:', err)
          this.mostrar('Ocorreu um erro durante a gravação do cliente!', true)
        }
      })
    }
  }

  // Se já existe cliente logado, carrega os dados dele para edição
  carregar(){
    this.mensagem = '';
    const cliente = this.storage.getCliente()
    if (cliente !== null) {
      // a API pode devolver campos null (ex.: telefone); ignora-os para manter os valores padrão
      const preenchidos = Object.fromEntries(Object.entries(cliente).filter(([, v]) => v !== null))
      this.obj = Object.assign(new Cliente(), preenchidos)
      this.confirmaSenha = this.obj.senha
    }
  }
  mudarSenha(){}
}
