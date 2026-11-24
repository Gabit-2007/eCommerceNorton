import { inject, Injectable } from "@angular/core";
import { Cliente } from "../model/cliente";
import { Produto } from "../model/produto";
import { ItemCesta } from "../model/item-cesta";

@Injectable({
  providedIn: 'root'
})

export class StorageService {

    // No servidor (SSR/prerender) o localStorage não existe; nesse caso devolve null
    private get ls(): Storage | null {
        try {
            return typeof localStorage !== 'undefined' ? localStorage : null
        } catch {
            return null
        }
    }

    ///#region Funções de usuário
    setUser(user : Pick<Cliente, 'nome' | 'senha' | 'dtNascimento'>): void {
        this.ls?.setItem('user_data', JSON.stringify(user))
    }

    getUser(): Pick<Cliente, 'nome' | 'senha' | 'dtNascimento'> | null {
        const userData = this.ls?.getItem('user_data')

        return userData ? JSON.parse(userData) : null
    }
    ///#endregion

    ///#region Cliente logado (dados devolvidos pela API no login/cadastro)
    setCliente(cliente: Cliente): void {
        this.ls?.setItem('cliente_logado', JSON.stringify(cliente))
    }

    getCliente(): Cliente | null {
        const json = this.ls?.getItem('cliente_logado')

        return json ? JSON.parse(json) : null
    }

    removeCliente(): void {
        this.ls?.removeItem('cliente_logado')
    }
    ///#endregion

    ///#region Funções do carrinho
    setItemCart(item : ItemCesta): void {
        const itensCart = this.getItemsCart()

        const itensAdded = itensCart.find(i => i.produto === item.produto)
  
        if(itensAdded){
            itensAdded.quantidade += 1
            this.ls?.setItem('user_cart', JSON.stringify(itensCart))
            return
        }
        itensCart?.push(item)
        this.ls?.setItem('user_cart', JSON.stringify(itensCart))

    }

    getItemsCart(): ItemCesta[] {
        const itensCart = this.ls?.getItem('user_cart')
        return itensCart ? JSON.parse(itensCart) : []
    }

    clearCart(): void {
      localStorage.removeItem('user_cart');
    }
    ///#endregion

    ///#region Funções de favoritos
    setItemFavorite(item : Pick<Produto, 'codigo'>): void {
        const favItens = this.getItemFavorite()

        if (!favItens?.some(fav => fav.codigo === item.codigo)) {
            favItens?.push(item);
        } 
        else {
            const newFav = favItens.filter(fav => fav.codigo !== item.codigo)
            this.ls?.setItem('user_favorites', JSON.stringify(newFav))
            return
        }

        this.ls?.setItem('user_favorites', JSON.stringify(favItens))
        
    }

    getItemFavorite(): Pick<Produto, 'codigo'>[] {
        const favItens = this.ls?.getItem('user_favorites')

        return favItens ? JSON.parse(favItens) : []
    }


    //#endregion
}