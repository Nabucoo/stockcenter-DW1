import { Storage } from "../../storage/storage.js";

function quantidadeJaAdicionada(nome, itensVenda) {
    const item = itensVenda.find(
        itemVenda => itemVenda.nome.toLowerCase() === nome.toLowerCase()
    );

    return item ? item.quantidade : 0;
}

export function validarProdutoVenda(nome, quantidade, itensVenda) {
    const storage = new Storage();
    const produto = storage.buscarProduto(nome);

    if (!produto) {
        alert("Produto nao encontrado no estoque.");
        return false;
    }

    if (quantidade <= 0 || Number.isNaN(quantidade)) {
        alert("Informe uma quantidade valida.");
        return false;
    }

    const quantidadeTotal = quantidadeJaAdicionada(nome, itensVenda) + quantidade;

    if (quantidadeTotal > produto.quantidade) {
        alert("Quantidade maior que a disponivel no estoque.");
        return false;
    }

    return true;
}

export function validarFinalizacaoVenda(itensVenda) {
    if (itensVenda.length === 0) {
        alert("Adicione pelo menos um produto para finalizar a venda.");
        return false;
    }

    const storage = new Storage();

    const vendaValida = itensVenda.every(item => {
        const produto = storage.buscarProduto(item.nome);
        return produto && item.quantidade <= produto.quantidade;
    });

    if (!vendaValida) {
        alert("Algum produto nao possui estoque suficiente.");
        return false;
    }

    return true;
}
