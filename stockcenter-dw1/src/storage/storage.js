

export class Storage {
    static instancia = null;

    constructor() {
        if (Storage.instancia) {
            return Storage.instancia;
        }

        if (!localStorage.getItem("produtos")) {
            localStorage.setItem(
                "produtos",
                JSON.stringify([])
            );
        }

        Storage.instancia = this;
    }

    carregarProdutos() {
        return JSON.parse(
            localStorage.getItem("produtos")
        );
    }

    adicionarProduto(produto) {
        const produtos = this.carregarProdutos();

        produtos.push(produto);

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
    }

    removerProduto(nome, quantidadeRemover) {
        const produtos = this.carregarProdutos();

        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nome.toLowerCase()
        );

        produtos[indice].quantidade -= quantidadeRemover;

        if (produtos[indice].quantidade === 0) {
            produtos.splice(indice, 1);
        }

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
    }

    editarProduto(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo, departamentoNovo) {
        const produtos = this.carregarProdutos();

        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nomeAntigo.toLowerCase()
        );

        produtos[indice].nome = nomeNovo;
        produtos[indice].quantidade = quantidadeNova;
        produtos[indice].precoCompra = precoCompraNovo;
        produtos[indice].precoVenda = precoVendaNovo;
        produtos[indice].departamento = departamentoNovo;

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
    }

    buscarProduto(nome) {
        const produtos = this.carregarProdutos();
        return produtos.find(produto => produto.nome.toLowerCase().trim() === nome.toLowerCase().trim());
    }
}

