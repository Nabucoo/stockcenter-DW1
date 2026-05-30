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
}