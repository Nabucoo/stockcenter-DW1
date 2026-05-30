import { Produto } from "../produto.js";
import { Storage } from "../../storage/storage.js";
import { adicionarProduto, removerProduto } from "./produtoService.js";
import { renderizarProdutos } from "./renderizar.js";

window.addEventListener("load", renderizarProdutos);

const storage = new Storage();


const formAdicionar = document.getElementById("form-adicionar-produto");
const formRemover = document.getElementById("form-remover-produto");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("sair")) {
        const nomeProduto = e.target.dataset.produto;
        document.querySelector("#nome-produto").value = nomeProduto
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
