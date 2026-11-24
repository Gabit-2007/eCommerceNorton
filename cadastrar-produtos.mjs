// Cadastra na API (lojinha) os 10 produtos que combinam com as imagens 1.jpg ... 10.jpg
// da pasta public do projeto. A loja mostra a imagem pelo CÓDIGO do produto
// (produto 1 -> 1.jpg), então a ORDEM abaixo não pode ser trocada.
//
// Uso (com a API rodando na porta 8081):   node cadastrar-produtos.mjs
// Pode rodar de novo sem medo: produtos de código 1..10 que já existem são atualizados (PUT),
// e só os que faltam são criados (POST).

const API = process.env.API_URL ?? 'http://localhost:8081/api'

const produtos = [
  { // 1.jpg
    nome: 'Kit Pintura em Tela com Cavalete',
    descritivo: 'Cavalete de mesa, 2 telas, tintas guache, paleta e pincel. Tudo para começar a pintar.',
    valor: 129.9, valorPromo: 99.9, quantidade: 15, destaque: 1,
  },
  { // 2.jpg
    nome: 'Kit Bordado Floral com 4 Bastidores',
    descritivo: 'Quatro bastidores com tecido estampado, linhas coloridas, agulhas, tesoura e guia passo a passo. Costura e bordado para iniciantes.',
    valor: 89.9, valorPromo: 0, quantidade: 20, destaque: 2,
  },
  { // 3.jpg
    nome: 'Kit Amigurumi Gatinho Siamês',
    descritivo: 'Kit de linha para fazer um gatinho de crochê: fios, olhos de segurança, enchimento, agulha e receita.',
    valor: 74.9, valorPromo: 64.9, quantidade: 12, destaque: 3,
  },
  { // 4.jpg
    nome: 'Kit Crochê Completo com Estojo',
    descritivo: 'Estojo rosa com agulhas de crochê ergonômicas, novelos de linha e lã, marcadores e acessórios.',
    valor: 159.9, valorPromo: 0, quantidade: 8, destaque: 4,
  },
  { // 5.jpg
    nome: 'Kit para Fazer Velas Aromáticas',
    descritivo: 'Cera, essências aromáticas, latas, pavios, corantes e jarra para derramar. Faça suas próprias velas artesanais.',
    valor: 189.9, valorPromo: 159.9, quantidade: 10, destaque: 5,
  },
  { // 6.jpg
    nome: 'Kit Papelaria Vintage Scrapbook',
    descritivo: 'Papéis decorados, adesivos, washi tapes e cadernos para diário, colagem e scrapbook.',
    valor: 69.9, valorPromo: 0, quantidade: 25, destaque: 0,
  },
  { // 7.jpg
    nome: 'Aquarela Estojo com 128 Cores',
    descritivo: 'Estojo de metal com 128 cores de tinta aquarela, pincéis de reservatório e bloco de papel para pintura.',
    valor: 219.9, valorPromo: 179.9, quantidade: 6, destaque: 0,
  },
  { // 8.jpg
    nome: 'Kit Macramê Suporte para Plantas',
    descritivo: 'Cordas de algodão, argolas de madeira e instruções para fazer suportes de plantas em macramê.',
    valor: 54.9, valorPromo: 0, quantidade: 0, destaque: 0, // sem estoque: aparece "Sem estoque no momento!"
  },
  { // 9.jpg
    nome: 'Kit Escultura em Argila 40 Peças',
    descritivo: 'Ferramentas profissionais de modelagem e corte para cerâmica e argila, com estojo organizador.',
    valor: 99.9, valorPromo: 84.9, quantidade: 14, destaque: 0,
  },
  { // 10.jpg
    nome: 'Kit Pintura por Números Paisagem',
    descritivo: 'Tela com desenho numerado de paisagem com cactos, tintas e pincéis. Pintura relaxante para todas as idades.',
    valor: 79.9, valorPromo: 0, quantidade: 18, destaque: 0,
  },
]

async function chamar(metodo, caminho, corpo) {
  const resp = await fetch(API + caminho, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: corpo ? JSON.stringify(corpo) : undefined,
  })
  if (!resp.ok) throw new Error(`${metodo} ${caminho} -> HTTP ${resp.status}`)
  return resp.text()
}

let existentes
try {
  existentes = JSON.parse(await chamar('GET', '/produtos'))
} catch (e) {
  console.error('Não consegui falar com a API em ' + API + '. Ela está rodando? (' + e.message + ')')
  process.exit(1)
}

const codigos = new Set(existentes.map((p) => p.codigo))
const maiorCodigo = Math.max(0, ...codigos)

if (maiorCodigo > produtos.length || (codigos.size > 0 && codigos.size !== maiorCodigo)) {
  console.warn('Atenção: a API já tem produtos fora do padrão 1..10 (códigos: ' + [...codigos].join(', ') + ').')
  console.warn('As imagens só combinam se os códigos forem 1 a 10. Veja as instruções para zerar o banco.')
}

for (let i = 0; i < produtos.length; i++) {
  const codigo = i + 1
  if (codigos.has(codigo)) {
    const msg = await chamar('PUT', '/produto', { codigo, ...produtos[i] })
    console.log(`[${codigo}] atualizado: ${produtos[i].nome} (${msg.trim()})`)
  } else {
    const msg = await chamar('POST', '/produto', produtos[i])
    const novo = Number(msg.trim().split(' ').pop())
    console.log(`[${novo}] criado: ${produtos[i].nome}` + (novo !== codigo ? `  <-- ATENÇÃO: veio com código ${novo}, esperado ${codigo}` : ''))
  }
}
console.log('Pronto! Atualize a página da loja (F5).')
