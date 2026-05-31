import { Produto } from "../produto.js";
import { Storage } from "../../storage/storage.js";
import { adicionarProduto, editarProduto, removerProduto } from "./produtoService.js";
import { renderizarProdutos } from "./renderizar.js";

window.addEventListener("load", renderizarProdutos);

const storage = new Storage();


const formAdicionar = document.getElementById("form-adicionar-produto");
const formRemover = document.getElementById("form-remover-produto");
const formEditar = document.getElementById("form-editar-produto");

//passar o identificador do produto, para poder remove-lo
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("abrirModalRemover")) {
        console.log(e.target.dataset.produto);
        const produto = JSON.parse(e.target.dataset.produto);
        console.log(produto.nome)
        document.querySelector("#nome-produto").value = produto.nome
    }
})

//passar o identificador do produto, para poder edita-lo
//passar atributos de produto, para deixar nos values
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("abrirModalEditar")) {
        const produto = JSON.parse(e.target.dataset.produto);
        console.log(produto)
        document.querySelector("#nome-produto-editar").value = produto.nome

        document.querySelector("#novo-nome").value = produto.nome
        document.querySelector("#nova-quantidade").value = produto.quantidade
        document.querySelector("#novo-preco-compra").value = produto.precoCompra
        document.querySelector("#novo-preco-venda").value = produto.precoVenda
        document.querySelector("#novo-departamento").value = produto.departamento
    }
})

//formulario de adicionar produto acionado!
formAdicionar.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarProduto(formAdicionar);
});

//formulario de remover produto acionado!
formRemover.addEventListener("submit", (e) => {
    e.preventDefault();
    removerProduto(formRemover)

})

//formulario de editar produto acionado!
formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    editarProduto(formEditar);

})


