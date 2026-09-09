import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Carrinho } from './carrinho/carrinho';
import { DetalheItem } from './detalhe-item/detalhe-item';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Feed } from './feed/feed';
import { Login } from './login/login';
import { Busca } from './busca/busca';


export const routes: Routes = [
    {path:"", component:Feed}, {path:"promo", component:Feed},
    {path:"busca", component:Busca},
    {path:"cadastro", component:Cadastro},
    {path:"carrinho", component:Carrinho},
    {path:"detalhe-item", component:DetalheItem}, 
    {path:"esqueci-senha", component:EsqueciSenha},
    {path:"login", component:Login}
];
