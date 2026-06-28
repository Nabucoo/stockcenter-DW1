export class Storage {
    static instancia = null;

    constructor() {
        if (Storage.instancia) {
            return Storage.instancia;
        }

        if (!localStorage.getItem("produtos")) {
            localStorage.setItem("produtos", JSON.stringify([]));
        }

        if (!localStorage.getItem("vendas")) {
            localStorage.setItem("vendas", JSON.stringify([]));
        }

        Storage.instancia = this;
    }

    notificarAtualizacao() {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("stockcenter:storage-update"));
        }
    }

    salvarProdutos(produtos) {
        localStorage.setItem("produtos", JSON.stringify(produtos));
        this.notificarAtualizacao();
    }

    carregarProdutos() {
        return JSON.parse(localStorage.getItem("produtos") || "[]");
    }

    adicionarProduto(produto) {
        const produtos = this.carregarProdutos();
        produtos.push(produto);
        this.salvarProdutos(produtos);
    }

    removerProduto(nome, quantidadeRemover) {
        const produtos = this.carregarProdutos();
        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nome.toLowerCase()
        );

        if (indice === -1) {
            return;
        }

        produtos[indice].quantidade -= quantidadeRemover;

        if (produtos[indice].quantidade <= 0) {
            produtos.splice(indice, 1);
        }

        this.salvarProdutos(produtos);
    }

    ajustarQuantidadeProduto(nome, diferenca) {
        const produtos = this.carregarProdutos();
        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nome.toLowerCase()
        );

        if (indice === -1) {
            return false;
        }

        produtos[indice].quantidade += diferenca;

        if (produtos[indice].quantidade <= 0) {
            produtos.splice(indice, 1);
        }

        this.salvarProdutos(produtos);
        return true;
    }

    editarProduto(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo, departamentoNovo) {
        const produtos = this.carregarProdutos();
        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nomeAntigo.toLowerCase()
        );

        if (indice === -1) {
            return;
        }

        produtos[indice].nome = nomeNovo;
        produtos[indice].quantidade = quantidadeNova;
        produtos[indice].precoCompra = precoCompraNovo;
        produtos[indice].precoVenda = precoVendaNovo;
        produtos[indice].departamento = departamentoNovo;

        this.salvarProdutos(produtos);
    }

    buscarProduto(nome) {
        const produtos = this.carregarProdutos();
        return produtos.find(produto => produto.nome.toLowerCase().trim() === nome.toLowerCase().trim());
    }

    carregarVendas() {
        return JSON.parse(localStorage.getItem("vendas") || "[]");
    }

    salvarVendas(vendas) {
        localStorage.setItem("vendas", JSON.stringify(vendas));
        this.notificarAtualizacao();
    }

    adicionarVenda(venda) {
        const vendas = this.carregarVendas();
        vendas.push(venda);
        this.salvarVendas(vendas);
    }

    buscarVenda(id) {
        return this.carregarVendas().find(venda => venda.id === id);
    }

    atualizarVenda(vendaAtualizada) {
        const vendas = this.carregarVendas();
        const indice = vendas.findIndex(venda => venda.id === vendaAtualizada.id);

        if (indice === -1) {
            return false;
        }

        vendas[indice] = vendaAtualizada;
        this.salvarVendas(vendas);
        return true;
    }
}