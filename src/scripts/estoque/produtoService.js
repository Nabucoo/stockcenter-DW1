import { renderizarProdutos } from "./renderizar";
import { validarProduto, validarRemocao } from "./validacoes";
import { Storage } from "../../storage/storage";
import { Produto } from "../produto";
//funcao que adiciona produto, faz verificação, adiciona no localStorage e renderiza

export function limparFormulario(id) {
    document.getElementById(id).reset();
}


export function adicionarProduto(form) {
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
    const storage = new Storage();
    storage.adicionarProduto(novoProduto);

    console.log(storage.carregarProdutos());
    renderizarProdutos();
    limparFormulario("form-adicionar-produto");
}

export function removerProduto(form) {
    const dados = Object.fromEntries(new FormData(form));
    const quantidadeRemover = Number(dados.quantidadeRemover);
    const nome = dados.nomeProduto;

    if (!validarRemocao(nome, quantidadeRemover)) {
        return;
    }

    const storage = new Storage();
    storage.removerProduto(nome, quantidadeRemover)
    renderizarProdutos();
    limparFormulario("form-remover-produto");
}