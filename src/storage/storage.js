export class Storage {
    static instancia = null;

    constructor() {
        if (Storage.instancia) {
            return Storage.instancia;
        }

        if (!localStorage.getItem("produtos")) {
<<<<<<< HEAD
            localStorage.setItem("produtos", JSON.stringify([]));
        }

        if (!localStorage.getItem("vendas")) {
            localStorage.setItem("vendas", JSON.stringify([]));
=======
            localStorage.setItem(
                "produtos",
                JSON.stringify([])
            );
        }

        if (!localStorage.getItem("vendas")) {
            localStorage.setItem(
                "vendas",
                JSON.stringify([])
            );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
        }

        Storage.instancia = this;
    }

<<<<<<< HEAD
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
=======
    carregarProdutos() {
        return JSON.parse(
            localStorage.getItem("produtos")
        );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }

    adicionarProduto(produto) {
        const produtos = this.carregarProdutos();
<<<<<<< HEAD
        produtos.push(produto);
        this.salvarProdutos(produtos);
=======

        produtos.push(produto);

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }

    removerProduto(nome, quantidadeRemover) {
        const produtos = this.carregarProdutos();
<<<<<<< HEAD
=======

>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nome.toLowerCase()
        );

<<<<<<< HEAD
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
=======
        produtos[indice].quantidade -= quantidadeRemover;

        if (produtos[indice].quantidade === 0) {
            produtos.splice(indice, 1);
        }

        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }

    editarProduto(nomeAntigo, nomeNovo, quantidadeNova, precoCompraNovo, precoVendaNovo, departamentoNovo) {
        const produtos = this.carregarProdutos();
<<<<<<< HEAD
=======

>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
        const indice = produtos.findIndex(
            produto => produto.nome.toLowerCase() === nomeAntigo.toLowerCase()
        );

<<<<<<< HEAD
        if (indice === -1) {
            return;
        }

=======
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
        produtos[indice].nome = nomeNovo;
        produtos[indice].quantidade = quantidadeNova;
        produtos[indice].precoCompra = precoCompraNovo;
        produtos[indice].precoVenda = precoVendaNovo;
        produtos[indice].departamento = departamentoNovo;

<<<<<<< HEAD
        this.salvarProdutos(produtos);
=======
        localStorage.setItem(
            "produtos",
            JSON.stringify(produtos)
        );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }

    buscarProduto(nome) {
        const produtos = this.carregarProdutos();
        return produtos.find(produto => produto.nome.toLowerCase().trim() === nome.toLowerCase().trim());
    }

    carregarVendas() {
<<<<<<< HEAD
        return JSON.parse(localStorage.getItem("vendas") || "[]");
    }

    salvarVendas(vendas) {
        localStorage.setItem("vendas", JSON.stringify(vendas));
        this.notificarAtualizacao();
=======
        return JSON.parse(
            localStorage.getItem("vendas")
        );
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
    }

    adicionarVenda(venda) {
        const vendas = this.carregarVendas();
<<<<<<< HEAD
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
=======

        vendas.push(venda);

        localStorage.setItem(
            "vendas",
            JSON.stringify(vendas)
        );
    }
}
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
