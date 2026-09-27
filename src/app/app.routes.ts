import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Carrinho } from './carrinho/carrinho';
import { DetalheItem } from './detalhe-item/detalhe-item';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Feed } from './feed/feed';
import { Login } from './login/login';
import { Busca } from './busca/busca';
import { Pintura } from './pintura/pintura';
import { Linha } from './linha/linha';
import { Vela } from './vela/vela';
import { Ceramica } from './ceramica/ceramica';
import { Papelaria } from './papelaria/papelaria';
import { Costura } from './costura/costura';
import { Favoritos } from './favoritos/favoritos';
import { EmailSenha } from './email-senha/email-senha';
import { ConfirmarCodigo } from './confirmar-codigo/confirmar-codigo';


export const routes: Routes = [
    {path: "", component: Feed}, 
    {path: "busca", component: Busca},
    {path: "cadastro", component: Cadastro},
    {path: "carrinho", component: Carrinho},
    {path: "detalhe-item/:codigo", component: DetalheItem}, 
    {path: "esqueci-senha", component: EsqueciSenha},
    {path: "email-senha", component: EmailSenha},
    {path: "codigo-email", component: ConfirmarCodigo},
    {path: "login", component: Login},
    {path: 'pintura', component: Pintura},
    {path: 'ceramica', component: Ceramica},
    {path: 'vela', component: Vela},
    {path: 'linha', component: Linha},
    {path: 'papelaria', component: Papelaria},
    {path: 'costura', component: Costura},
    {path: 'favoritos', component: Favoritos }
];
