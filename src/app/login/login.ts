import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '../input/input';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente-service';
import { StorageService } from '../service/storageService';

@Component({
  selector: 'app-login',
  imports: [InputComponent, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router)
  private service = inject(ClienteService)
  private storage = inject(StorageService)
  private cdr = inject(ChangeDetectorRef)

  obj: Cliente = new Cliente()
  mensagem: string = ''

  fazerLogin(event?: Event): void {
    // o botão está dentro de um <a href>: evita que o link recarregue a página antes da API responder
    event?.preventDefault()

    if (!this.obj.email || !this.obj.senha) {
      this.mensagem = 'Informe o email e a senha!'
      return
    }

    this.mensagem = ''

    this.service.login({ email: this.obj.email, senha: this.obj.senha }).subscribe({
      next: (dados) => {
        if (dados.codigo > 0) {
          this.storage.setCliente(dados)
          this.router.navigate(['/'])
        } else {
          this.mensagem = 'Email ou senha incorretos! Verifique'
        }
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err)
        this.mensagem = 'Ocorreu um erro, tente mais tarde!'
        this.cdr.detectChanges()
      }
    })
  }
}
