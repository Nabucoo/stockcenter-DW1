import { Storage } from "../../storage/storage.js";

const storage = new Storage();
const itensVenda = [];

const cards = document.querySelector(".cards");
const valorFinal = document.querySelector("#valor-final");
const formAdicionarProduto = document.querySelector("#form-adicionar-produto-venda");
const selectProduto = document.querySelector("#produto-venda");
const quantidadeVenda = document.querySelector("#quantidade-venda");
const botaoLimparVenda = document.querySelector("#btn-limpar-venda");
const botaoFinalizarVenda = document.querySelector("#btn-finalizar-venda");
const modalAdicionarProduto = document.querySelector("#modal-adicionar-produto-venda");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function carregarProdutosDisponiveis() {
    const produtos = storage.carregarProdutos();

    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    produtos
        .filter(produto => produto.ativo !== false && produto.quantidade > 0)
        .forEach(produto => {
            const option = document.createElement("option");

            option.value = produto.nome;
            option.textContent = `${produto.nome} - ${produto.quantidade} em estoque`;

            selectProduto.appendChild(option);
        });
}

function buscarProdutoNoEstoque(nome) {
    return storage.buscarProduto(nome);
}

function quantidadeJaAdicionada(nome) {
    const item = itensVenda.find(
        itemVenda => itemVenda.nome.toLowerCase() === nome.toLowerCase()
    );

    return item ? item.quantidade : 0;
}

function calcularTotal() {
    return itensVenda.reduce(
        (total, item) => total + item.quantidade * item.precoVenda,
        0
    );
}

function renderizarItensVenda() {
    cards.innerHTML = "";

    if (itensVenda.length === 0) {
        cards.innerHTML = '<p class="venda-vazia">Nenhum produto adicionado.</p>';
        valorFinal.textContent = "Valor final: R$ 0,00";
        return;
    }

    itensVenda.forEach(item => {
        const subtotal = item.quantidade * item.precoVenda;

        cards.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${item.nome}</h5>
                </div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Quantidade: ${item.quantidade}
                        </li>

                        <li class="list-group-item">
                            Preco unitario: ${formatarMoeda(item.precoVenda)}
                        </li>

                        <li class="list-group-item">
                            Subtotal: ${formatarMoeda(subtotal)}
                        </li>
                    </ul>
                </div>

                <div class="card-body d-flex justify-content-end gap-2">
                    <button type="button" class="btn-sair remover-produto-venda" data-produto="${item.nome}">
                        Remover
                    </button>
                </div>
            </div>
        `;
    });

    valorFinal.textContent = `Valor final: ${formatarMoeda(calcularTotal())}`;
}

function adicionarProdutoVenda(nome, quantidade) {
    const produto = buscarProdutoNoEstoque(nome);

    if (!produto) {
        alert("Produto nao encontrado no estoque.");
        return false;
    }

    const quantidadeTotal = quantidadeJaAdicionada(nome) + quantidade;

    if (quantidade <= 0 || Number.isNaN(quantidade)) {
        alert("Informe uma quantidade valida.");
        return false;
    }

    if (quantidadeTotal > produto.quantidade) {
        alert("Quantidade maior que a disponivel no estoque.");
        return false;
    }

    const itemExistente = itensVenda.find(
        item => item.nome.toLowerCase() === nome.toLowerCase()
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        itensVenda.push({
            nome: produto.nome,
            quantidade,
            precoVenda: Number(produto.precoVenda)
        });
    }

    renderizarItensVenda();
    return true;
}

function limparVenda() {
    itensVenda.length = 0;
    renderizarItensVenda();
}

function finalizarVenda() {
    if (itensVenda.length === 0) {
        alert("Adicione pelo menos um produto para finalizar a venda.");
        return;
    }

    const vendaValida = itensVenda.every(item => {
        const produto = buscarProdutoNoEstoque(item.nome);
        return produto && item.quantidade <= produto.quantidade;
    });

    if (!vendaValida) {
        alert("Algum produto nao possui estoque suficiente.");
        carregarProdutosDisponiveis();
        return;
    }

    itensVenda.forEach(item => {
        storage.removerProduto(item.nome, item.quantidade);
    });

    alert("Venda adicionada com sucesso.");
    limparVenda();
    carregarProdutosDisponiveis();
}

formAdicionarProduto.addEventListener("submit", (event) => {
    event.preventDefault();

    const produtoSelecionado = selectProduto.value;
    const quantidade = Number(quantidadeVenda.value);

    if (adicionarProdutoVenda(produtoSelecionado, quantidade)) {
        bootstrap.Modal.getInstance(modalAdicionarProduto).hide();
        formAdicionarProduto.reset();
        carregarProdutosDisponiveis();
    }
});

cards.addEventListener("click", (event) => {
    if (!event.target.classList.contains("remover-produto-venda")) {
        return;
    }

    const nomeProduto = event.target.dataset.produto;
    const indice = itensVenda.findIndex(item => item.nome === nomeProduto);

    if (indice !== -1) {
        itensVenda.splice(indice, 1);
        renderizarItensVenda();
        carregarProdutosDisponiveis();
    }
});

modalAdicionarProduto.addEventListener("show.bs.modal", carregarProdutosDisponiveis);
botaoLimparVenda.addEventListener("click", limparVenda);
botaoFinalizarVenda.addEventListener("click", finalizarVenda);

carregarProdutosDisponiveis();
renderizarItensVenda();
