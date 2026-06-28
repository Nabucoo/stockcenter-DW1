import { Storage } from "../../storage/storage.js";
import { Venda } from "./venda.js";

function formatarData(dataHora) {
    const data = new Date(dataHora);
    return data.toLocaleString("pt-BR");
}

function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function ordenarVendas(vendas) {
    return [...vendas].sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
}

function obterVendasFiltradasPorData(vendas) {
    const dataInicialValor = document.querySelector("#data-inicial")?.value;
    const dataFinalValor = document.querySelector("#data-final")?.value;

    if (!dataInicialValor && !dataFinalValor) {
        return vendas;
    }

    const dataInicial = dataInicialValor ? new Date(`${dataInicialValor}T00:00:00`) : null;
    const dataFinal = dataFinalValor ? new Date(`${dataFinalValor}T23:59:59.999`) : null;

    return vendas.filter(venda => {
        const dataVenda = new Date(venda.dataHora);

        if (dataInicial && dataVenda < dataInicial) {
            return false;
        }

        if (dataFinal && dataVenda > dataFinal) {
            return false;
        }

        return true;
    });
}

function renderizarHistorico(vendas) {
    const container = document.querySelector("#historico-vendas-cards");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!vendas.length) {
        container.innerHTML = '<p class="venda-vazia">Nenhuma venda registrada para o perÃ­odo selecionado.</p>';
        return;
    }

    vendas.forEach(venda => {
        const produtosTexto = venda.itens.map(item => `${item.nome} (${item.quantidade})`).join(", ");
        const statusClass = venda.status === "Cancelada" ? "status-cancelada" : "status-ativa";
        const estaCancelada = venda.status === "Cancelada";

        container.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Venda #${venda.id}</h5>
                </div>

                <div class="card-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Data/Hora: ${formatarData(venda.dataHora)}</li>
                        <li class="list-group-item">Produtos: ${produtosTexto}</li>
                        <li class="list-group-item">Quantidade: ${venda.itens.reduce((total, item) => total + item.quantidade, 0)}</li>
                        <li class="list-group-item">Valor total: ${formatarMoeda(venda.total)}</li>
                        <li class="list-group-item">
                            Status: <span class="status-badge ${statusClass}">${venda.status}</span>
                        </li>
                    </ul>
                </div>

                <div class="card-body d-flex justify-content-end gap-2">
                    <button type="button" class="btn-add editar-venda" data-venda='${JSON.stringify(venda)}' ${estaCancelada ? "disabled" : ""}>
                        Editar
                    </button>

                    <button type="button" class="btn-sair cancelar-venda" data-venda-id="${venda.id}" ${estaCancelada ? "disabled" : ""}>
                        Cancelar
                    </button>
                </div>
            </div>
        `;
    });
}

function abrirModalEdicao(venda) {
    const dialog = document.createElement("div");
    dialog.innerHTML = `
        <div class="modal fade" id="modal-editar-venda" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form id="form-editar-venda">
                        <div class="modal-header">
                            <h1 class="modal-title">Editar Venda</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="venda-id-editar" name="vendaId" value="${venda.id}" />
                            <div class="mb-3">
                                <label class="form-label" for="produtos-venda-editar">Produtos</label>
                                <textarea class="form-control" id="produtos-venda-editar" name="produtosVenda" required>${venda.itens.map(item => `${item.nome}:${item.quantidade}`).join("\n")}</textarea>
                                <div class="form-text">Use o formato: NomeDoProduto:Quantidade</div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-sair" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn-add">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(dialog);
    const modal = new bootstrap.Modal(document.getElementById("modal-editar-venda"));
    modal.show();

    document.addEventListener("submit", function tratarSubmit(event) {
        if (event.target.id !== "form-editar-venda") {
            return;
        }

        event.preventDefault();
        const storage = new Storage();
        const formData = new FormData(event.target);
        const linhas = String(formData.get("produtosVenda") || "")
            .split(/\n|;/)
            .map(linha => linha.trim())
            .filter(Boolean);

        const itensAtualizados = [];
        const erros = [];

        linhas.forEach(linha => {
            const [nome, quantidadeTexto] = linha.split(":");
            const quantidade = Number(quantidadeTexto);
            const produto = storage.buscarProduto(nome.trim());

            if (!produto) {
                erros.push(`Produto nÃ£o encontrado: ${nome}`);
                return;
            }

            if (!Number.isInteger(quantidade) || quantidade <= 0) {
                erros.push(`Quantidade invÃ¡lida para ${nome}`);
                return;
            }

            const estoqueAtual = storage.carregarProdutos().find(item => item.nome.toLowerCase() === produto.nome.toLowerCase());
            const diferenca = quantidade - (venda.itens.find(item => item.nome.toLowerCase() === produto.nome.toLowerCase())?.quantidade || 0);

            if (estoqueAtual && estoqueAtual.quantidade < diferenca) {
                erros.push(`Estoque insuficiente para ${produto.nome}`);
                return;
            }

            itensAtualizados.push({
                nome: produto.nome,
                quantidade,
                precoCompra: Number(produto.precoCompra),
                precoVenda: Number(produto.precoVenda),
                subtotal: quantidade * Number(produto.precoVenda)
            });
        });

        if (erros.length) {
            alert(erros.join("\n"));
            return;
        }

        const vendaAtualizada = new Venda(
            itensAtualizados,
            itensAtualizados.reduce((total, item) => total + item.quantidade * item.precoVenda, 0),
            venda.id,
            venda.dataHora,
            venda.status
        );

        const itensOriginais = venda.itens;
        const estoque = storage.carregarProdutos();

        itensOriginais.forEach(itemOriginal => {
            const produtoEstoque = estoque.find(produto => produto.nome.toLowerCase() === itemOriginal.nome.toLowerCase());
            if (produtoEstoque) {
                produtoEstoque.quantidade += itemOriginal.quantidade;
            }
        });

        itensAtualizados.forEach(itemAtualizado => {
            const produtoEstoque = estoque.find(produto => produto.nome.toLowerCase() === itemAtualizado.nome.toLowerCase());
            if (produtoEstoque) {
                produtoEstoque.quantidade -= itemAtualizado.quantidade;
            }
        });

        storage.salvarProdutos(estoque);
        storage.atualizarVenda(vendaAtualizada);
        atualizarHistorico();
        bootstrap.Modal.getInstance(document.getElementById("modal-editar-venda")).hide();
        document.body.removeChild(dialog);
        document.removeEventListener("submit", tratarSubmit);
        alert("Venda atualizada com sucesso.");
    });
}

document.addEventListener("click", (event) => {
    const botaoEditar = event.target.closest(".editar-venda");
    const botaoCancelar = event.target.closest(".cancelar-venda");

    if (botaoEditar) {
        const venda = JSON.parse(botaoEditar.dataset.venda);
        abrirModalEdicao(venda);
        return;
    }

    if (botaoCancelar) {
        const storage = new Storage();
        const venda = storage.buscarVenda(botaoCancelar.dataset.vendaId);

        if (!venda || venda.status === "Cancelada") {
            return;
        }

        const confirmarCancelamento = window.confirm("Deseja realmente cancelar esta venda? O estoque serÃ¡ atualizado.");

        if (!confirmarCancelamento) {
            return;
        }

        const vendasAtualizadas = storage.carregarVendas().map(v => {
            if (v.id === venda.id) {
                return { ...v, status: "Cancelada" };
            }
            return v;
        });

        const estoque = storage.carregarProdutos();
        venda.itens.forEach(item => {
            const produtoEstoque = estoque.find(produto => produto.nome.toLowerCase() === item.nome.toLowerCase());
            if (produtoEstoque) {
                produtoEstoque.quantidade += item.quantidade;
            }
        });

        storage.salvarProdutos(estoque);
        storage.salvarVendas(vendasAtualizadas);
        atualizarHistorico();
        alert("Venda cancelada com sucesso.");
    }
});

function atualizarHistorico() {
    const storage = new Storage();
    const vendasOrdenadas = ordenarVendas(storage.carregarVendas());
    const vendasFiltradas = obterVendasFiltradasPorData(vendasOrdenadas);
    renderizarHistorico(vendasFiltradas);
}

const formFiltroData = document.querySelector("#form-filtro-data");
const botaoLimparFiltro = document.querySelector("#btn-limpar-filtro");

if (formFiltroData) {
    formFiltroData.addEventListener("submit", (event) => {
        event.preventDefault();
        atualizarHistorico();
    });
}

if (botaoLimparFiltro) {
    botaoLimparFiltro.addEventListener("click", () => {
        document.querySelector("#data-inicial").value = "";
        document.querySelector("#data-final").value = "";
        atualizarHistorico();
    });
}

window.addEventListener("stockcenter:storage-update", atualizarHistorico);
atualizarHistorico();
