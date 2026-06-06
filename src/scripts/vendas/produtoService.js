import { Storage } from "../../storage/storage.js";
import { renderizarItensVenda } from "./renderizar.js";
import { validarFinalizacaoVenda, validarProdutoVenda } from "./validacoes.js";

export function adicionarProdutoVenda(nome, quantidade, itensVenda) {
    if (!validarProdutoVenda(nome, quantidade, itensVenda)) {
        return false;
    }

    const storage = new Storage();
    const produto = storage.buscarProduto(nome);

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

    renderizarItensVenda(itensVenda);
    return true;
}

export function removerProdutoVenda(nome, itensVenda) {
    const indice = itensVenda.findIndex(item => item.nome === nome);

    if (indice !== -1) {
        itensVenda.splice(indice, 1);
        renderizarItensVenda(itensVenda);
    }
}

export function limparVenda(itensVenda) {
    itensVenda.length = 0;
    renderizarItensVenda(itensVenda);
}

export function finalizarVenda(itensVenda) {
    if (!validarFinalizacaoVenda(itensVenda)) {
        return false;
    }

    const storage = new Storage();

    itensVenda.forEach(item => {
        storage.removerProduto(item.nome, item.quantidade);
    });

    alert("Venda adicionada com sucesso.");
    limparVenda(itensVenda);

    return true;
}
