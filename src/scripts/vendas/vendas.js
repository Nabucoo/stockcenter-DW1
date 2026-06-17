import { carregarProdutosDisponiveis, renderizarItensVenda } from "./renderizar.js";
import {
    adicionarProdutoVenda,
    finalizarVenda,
    limparVenda,
    removerProdutoVenda
} from "./produtoService.js";

const itensVenda = [];

const cards = document.querySelector(".cards");
const formAdicionarProduto = document.querySelector("#form-adicionar-produto-venda");
const selectProduto = document.querySelector("#produto-venda");
const quantidadeVenda = document.querySelector("#quantidade-venda");
const botaoLimparVenda = document.querySelector("#btn-limpar-venda");
const botaoFinalizarVenda = document.querySelector("#btn-finalizar-venda");
const modalAdicionarProduto = document.querySelector("#modal-adicionar-produto-venda");

<<<<<<< HEAD
window.addEventListener("stockcenter:storage-update", () => {
    carregarProdutosDisponiveis(selectProduto);
});

=======
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
formAdicionarProduto.addEventListener("submit", (event) => {
    event.preventDefault();

    const produtoSelecionado = selectProduto.value;
    const quantidade = Number(quantidadeVenda.value);

    if (adicionarProdutoVenda(produtoSelecionado, quantidade, itensVenda)) {
        bootstrap.Modal.getInstance(modalAdicionarProduto).hide();
        formAdicionarProduto.reset();
        carregarProdutosDisponiveis(selectProduto);
    }
});

cards.addEventListener("click", (event) => {
    if (!event.target.classList.contains("remover-produto-venda")) {
        return;
    }

    const nomeProduto = event.target.dataset.produto;

    removerProdutoVenda(nomeProduto, itensVenda);
    carregarProdutosDisponiveis(selectProduto);
});

modalAdicionarProduto.addEventListener("show.bs.modal", () => {
    carregarProdutosDisponiveis(selectProduto);
});

botaoLimparVenda.addEventListener("click", () => {
    limparVenda(itensVenda);
});

botaoFinalizarVenda.addEventListener("click", () => {
<<<<<<< HEAD
    if (finalizarVenda(itensVenda)) {
        carregarProdutosDisponiveis(selectProduto);
=======
    
    if (finalizarVenda(itensVenda)) {
        
        carregarProdutosDisponiveis(selectProduto);
        
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }
});

carregarProdutosDisponiveis(selectProduto);
<<<<<<< HEAD
renderizarItensVenda(itensVenda);
=======
renderizarItensVenda(itensVenda);
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
