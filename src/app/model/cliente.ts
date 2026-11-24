// Campos iguais aos da entidade Cliente da API (lojinha).
// "dtNascimento" existe só na tela de cadastro e não é enviado à API.
export class Cliente {
    codigo: number = 0;
    nome: string = '';
    telefone: string = '';
    documento: string = '';
    email: string = '';
    senha: string = '';
    logradouro: string = '';
    ativo: number = 0;
    dtNascimento?: string = '';
}
