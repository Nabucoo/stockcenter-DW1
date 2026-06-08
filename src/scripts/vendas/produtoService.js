import { Storage } from "../../storage/storage.js";
import { Venda } from "./venda.js";
import { calcularTotal, renderizarItensVenda } from "./renderizar.js";
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
            precoCompra: Number(produto.precoCompra),
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
    const itens = itensVenda.map(item => ({
        nome: item.nome,
        quantidade: item.quantidade,
        precoCompra: item.precoCompra,
        precoVenda: item.precoVenda,
        subtotal: item.quantidade * item.precoVenda
    }));

    const venda = new Venda(
        itens,
        calcularTotal(itensVenda)
    );

    itensVenda.forEach(item => {
        storage.removerProduto(item.nome, item.quantidade);
    });

    storage.adicionarVenda(venda);

    alert("Venda adicionada com sucesso.");
    limparVenda(itensVenda);

    return true;
}
