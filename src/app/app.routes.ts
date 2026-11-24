import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Carrinho } from './carrinho/carrinho';
import { DetalheItem } from './detalhe-item/detalhe-item';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Feed } from './feed/feed';
import { Login } from './login/login';
import { Busca } from './busca/busca';
import { Favoritos } from './favoritos/favoritos';
import { EmailSenha } from './email-senha/email-senha';
import { ConfirmarCodigo } from './confirmar-codigo/confirmar-codigo';
import { ResultadoBusca } from './resultado-busca/resultado-busca';


export const routes: Routes = [
    {path: "", component: Feed}, 
    {path: "busca", component: Busca},
    {path: "resultado-busca", component: ResultadoBusca},
    {path: "cadastro", component: Cadastro},
    {path: "carrinho", component: Carrinho},
    {path: "detalhe-item/:codigo", component: DetalheItem}, 
    {path: "esqueci-senha", component: EsqueciSenha},
    {path: "email-senha", component: EmailSenha},
    {path: "codigo-email", component: ConfirmarCodigo},
    {path: "login", component: Login},
    {path: 'favoritos', component: Favoritos }
];
