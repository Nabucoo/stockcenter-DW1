import { Produto } from "./produto.js";
import { Storage } from "../storage/storage.js";

const storage = new Storage();

// função que valida os inputs
// true -> validação bem-sucedida
// false -> validação mal-sucedida
function validarProduto(nome, quantidade, precoCompra, precoVenda) {
    if (!nome) {
        alert("O nome do produto é obrigatório.");
        return false;
    }

    if (quantidade < 0 || isNaN(quantidade)) {
        alert("A quantidade não pode ser negativa.");
        return false;
    }

    if (precoCompra < 0 || isNaN(precoCompra)) {
        alert("O preço de compra é inválido.");
        return false;
    }

    if (precoVenda < 0 || isNaN(precoVenda)) {
        alert("O preço de venda é inválido.");
        return false;
    }

    const produtos = storage.carregarProdutos();

    const produtoExistente = produtos.find(
        produto => produto.nome.toLowerCase() === nome.toLowerCase()
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse nome.");
        return false;
    }

    return true;
}

// função que renderiza os cards de produtos, toda atualizacao na lista de produtos, chamara essa função, para atualizar a renderização
function renderizarProdutos() {
    const produtos = storage.carregarProdutos();

    const cards = document.querySelector(".cards")

    cards.innerHTML = "";

    produtos.forEach(produto => {
        cards.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${produto.nome}</h5>
                </div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Nome: ${produto.nome}
                        </li>

                        <li class="list-group-item">
                            Quantidade: ${produto.quantidade}
                        </li>

                        <li class="list-group-item">
                            Preço de compra: R$ ${produto.precoCompra}
                        </li>

                        <li class="list-group-item">
                            Preço de venda: R$ ${produto.precoVenda}
                        </li>

                        <li class="list-group-item">
                            Departamento: ${produto.departamento}
                        </li>
                    </ul>
                </div>

                <div class="card-body d-flex justify-content-end gap-2">
                    <button type="button" class="btn-sair">
                        ✏️ Editar
                    </button>

                    <button type="button" class="btn-add">
                        🗑️ Remover
                    </button>
                </div>
            </div>
        `;
    });
}

//funcao que adiciona produto, faz verificação, adiciona no localStorage e renderiza
function adicionarProduto(form) {
    const dados = Object.fromEntries(new FormData(form));

    const nome = dados.nome?.trim();
    const quantidade = Number(dados.quantidade);
    const precoCompra = Number(dados.preco_compra);
    const precoVenda = Number(dados.preco_venda);
    const departamento = dados.departamento?.trim();
    const ativo = document.getElementById("ativo").checked;

    if (!validarProduto(nome, quantidade, precoCompra, precoVenda)) {
        return;
    }
    const novoProduto = new Produto(
        nome,
        quantidade,
        precoCompra,
        precoVenda,
        departamento,
        ativo
    );

    storage.adicionarProduto(novoProduto);

    console.log(storage.carregarProdutos());
    renderizarProdutos();
    limparFormulario();
}


function limparFormulario() {
    document.getElementById("form-produto").reset();
}

const form = document.getElementById("form-produto");


//formulario de adicionar produto acionado!
form.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarProduto(form);
});