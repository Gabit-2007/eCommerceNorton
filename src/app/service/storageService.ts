import { Injectable } from "@angular/core";
import { Cliente } from "../model/cliente";
import { Produto } from "../model/produto";
import { ItemCesta } from "../model/item-cesta";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
    ///#region Funções de usuário
    setUser(user : Pick<Cliente, 'nome' | 'senha' | 'dtNascimento'>): void {
        localStorage.setItem('user_data', JSON.stringify(user))
    }

    getUser(): Pick<Cliente, 'nome' | 'senha' | 'dtNascimento'> | null {
        const userData = localStorage.getItem('user_data')

        return userData ? JSON.parse(userData) : null
    }
    ///#endregion

    ///#region Funções do carrinho
    setItemCart(item : ItemCesta): void {
        const itensCart = this.getItemsCart()

        const itensAdded = itensCart.find(i => i.produto === item.produto)
  
        if(itensAdded){
            itensAdded.quantidade += 1
            localStorage.setItem('user_cart', JSON.stringify(itensAdded))
            return
        }
        itensCart?.push(item)
        localStorage.setItem('user_cart', JSON.stringify(itensCart))
    }

    getItemsCart(): ItemCesta[] {
        const itensCart = localStorage.getItem('user_cart')
        return itensCart ? JSON.parse(itensCart) : []
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
            localStorage.setItem('user_favorites', JSON.stringify(newFav))
            return
        }

        localStorage.setItem('user_favorites', JSON.stringify(favItens))
    }

    getItemFavorite(): Pick<Produto, 'codigo'>[] {
        const favItens = localStorage.getItem('user_favorites')

        return favItens ? JSON.parse(favItens) : []
    }


    //#endregion
}