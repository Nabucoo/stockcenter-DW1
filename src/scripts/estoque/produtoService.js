import { renderizarProdutos } from "./renderizar";
import { validarProduto, validarRemocao, validarEdicao } from "./validacoes";
import { Storage } from "../../storage/storage";
import { Produto } from "../produto";
//funcao que adiciona produto, faz verificação, adiciona no localStorage e renderiza

export function limparFormulario(form) {
    form.reset();
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

    const modalAdicionarProduto = document.querySelector("#modal-adicionar-produto");
    bootstrap.Modal.getInstance(modalAdicionarProduto).hide();
    limparFormulario(form);
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

    const modalRemoverProduto = document.querySelector("#modal-remover-produto");
    bootstrap.Modal.getInstance(modalRemoverProduto).hide();
    limparFormulario(form);
}

export function editarProduto(form) {
    const dados = Object.fromEntries(new FormData(form));

    const nomeAntigo = dados.nomeProduto;
    const nomeNovo = dados.novoNome?.trim();
    const quantidadeNova = Number(dados.novaQuantidade);
    const precoCompraNovo = Number(dados.novoPrecoCompra);
    const precoVendaNovo = Number(dados.novoPrecoVenda);
    const departamentoNovo = dados.novoDepartamento?.trim();
    const ativoNovo = dados.novoAtivo === "on";

    if (!validarEdicao(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo)) {
        return;
    }

    const storage = new Storage();
    storage.editarProduto(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo, departamentoNovo);
    renderizarProdutos();

    const modalEditarProduto = document.querySelector("#modal-editar-produto");
    bootstrap.Modal.getInstance(modalEditarProduto).hide();
    limparFormulario(form);
    
}