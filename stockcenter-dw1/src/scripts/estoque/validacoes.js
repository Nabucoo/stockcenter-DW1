import { Storage } from "../../storage/storage";
// função que valida os inputs
// true -> validação bem-sucedida
// false -> validação mal-sucedida
export function validarProduto(nome, quantidade, precoCompra, precoVenda) {
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
    
    const storage = new Storage();
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

export function validarRemocao(nome, quantidadeRemover) {
    const storage = new Storage();
    const produtos = storage.carregarProdutos();

    const produto = produtos.find(
        produto => produto.nome.toLowerCase() === nome.toLowerCase()
    );

    if (!produto) {
        alert("Produto não encontrado.");
        return false;
    }

    if (isNaN(quantidadeRemover)) {
        alert("Quantidade inválida.");
        return false;
    }

    if (quantidadeRemover <= 0) {
        alert("A quantidade deve ser maior que zero.");
        return false;
    }

    if (quantidadeRemover > produto.quantidade) {
        alert("Quantidade insuficiente em estoque.");
        return false;
    }

    return true;
}

export function validarEdicao(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo) {
    if (!nomeNovo) {
        alert("O nome do produto é obrigatório.");
        return false;
    }

    if (quantidadeNova < 0 || isNaN(quantidadeNova)) {
        alert("A quantidade não pode ser negativa.");
        return false;
    }

    if (precoCompraNovo < 0 || isNaN(precoCompraNovo)) {
        alert("O preço de compra é inválido.");
        return false;
    }

    if (precoVendaNovo < 0 || isNaN(precoVendaNovo)) {
        alert("O preço de venda é inválido.");
        return false;
    }

    const storage = new Storage();
    const produtos = storage.carregarProdutos();

    const produtoExistente = produtos.find(
        produto =>
            produto.nome.toLowerCase() === nomeNovo.toLowerCase() &&
            produto.nome.toLowerCase() !== nomeAntigo.toLowerCase()
    );

    if (produtoExistente) {
        alert("Já existe um produto com esse nome.");
        return false;
    }

    return true;
}