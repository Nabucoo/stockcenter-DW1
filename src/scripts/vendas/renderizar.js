import { Storage } from "../../storage/storage.js";

export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

export function calcularTotal(itensVenda) {
    return itensVenda.reduce(
        (total, item) => total + item.quantidade * item.precoVenda,
        0
    );
}

export function carregarProdutosDisponiveis(selectProduto) {
    const storage = new Storage();
    const produtos = storage.carregarProdutos();

    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';

    produtos
        .filter(produto => produto.ativo !== false && produto.quantidade > 0)
        .forEach(produto => {
            const option = document.createElement("option");

            option.value = produto.nome;
            option.textContent = `${produto.nome} - ${produto.quantidade} em estoque`;

            selectProduto.appendChild(option);
        });
}

export function renderizarItensVenda(itensVenda) {
    const cards = document.querySelector(".cards");
    const valorFinal = document.querySelector("#valor-final");

    cards.innerHTML = "";

    if (itensVenda.length === 0) {
        cards.innerHTML = '<p class="venda-vazia">Nenhum produto adicionado.</p>';
        valorFinal.textContent = "Valor final: R$ 0,00";
        return;
    }

    itensVenda.forEach(item => {
        const subtotal = item.quantidade * item.precoVenda;

        cards.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${item.nome}</h5>
                </div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Quantidade: ${item.quantidade}
                        </li>

                        <li class="list-group-item">
                            Preco unitario: ${formatarMoeda(item.precoVenda)}
                        </li>

                        <li class="list-group-item">
                            Subtotal: ${formatarMoeda(subtotal)}
                        </li>
                    </ul>
                </div>

                <div class="card-body d-flex justify-content-end gap-2">
                    <button type="button" class="btn-sair remover-produto-venda" data-produto="${item.nome}">
                        Remover
                    </button>
                </div>
            </div>
        `;
    });

    valorFinal.textContent = `Valor final: ${formatarMoeda(calcularTotal(itensVenda))}`;
}
