import { Storage } from "../../storage/storage";

// função que renderiza os cards de produtos, toda atualizacao na lista de produtos, chamara essa função, para atualizar a renderização

export function renderizarProdutos() {
    const storage = new Storage();
    const produtos = storage.carregarProdutos();

    const cards = document.querySelector(".cards")

    cards.innerHTML = "";

    produtos.forEach(produto => {
        cards.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">${produto.nome}</h5>
                </div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Quantidade: ${produto.quantidade}
                        </li>

                        <li class="list-group-item">
                            Preço de compra: R$ ${produto.precoCompra}
                        </li>

                        <li class="list-group-item">
                            Preço de venda: R$ ${produto.precoVenda}
                        </li>

                        <li class="list-group-item">
                            Departamento: ${produto.departamento}
                        </li>
                    </ul>
                </div>

                <div class="card-body d-flex justify-content-end gap-2">
                    <button type="button" class="btn-add" data-produto="${produto.nome}">
                        ✏️ Editar
                    </button>

                    <button type="button" class="btn-sair sair" data-bs-toggle="modal" data-bs-target="#modal-remover-produto" data-produto="${produto.nome}">
                        🗑️ Remover
                    </button>
                </div>
            </div>
        `;
    });
}