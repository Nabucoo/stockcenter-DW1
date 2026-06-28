import Chart from "chart.js/auto";
import { Storage } from "../../storage/storage";

function renderizarEstadoVazio(container, titulo, texto = "Sem dados") {
    container.innerHTML = `
        <h2>${titulo}</h2>
        <p>${texto}</p>
    `;
}

function carregarVendasAtivas() {
    const storage = new Storage();
    return storage.carregarVendas().filter(venda => venda.status !== "Cancelada");
}

function renderizarticketMedio(ticketMedioDiv) {
    const vendas = carregarVendasAtivas();

    if (vendas.length == 0) {
        renderizarEstadoVazio(ticketMedioDiv, "Ticket Medio", "R$ 0,00");
        return;
    }

    let valorTotal = 0;
    const qntVendas = vendas.length;

    vendas.forEach(venda => {
        valorTotal += venda.total;
    });

    const ticketMedio = valorTotal / qntVendas;

    ticketMedioDiv.innerHTML = `
        <h2>Ticket Médio</h2>
        <p>R$ ${ticketMedio.toFixed(2)}</p>
    `;
}

function renderizarProdutosmedia(produtosMediaDiv) {
    const vendas = carregarVendasAtivas();

    if (vendas.length == 0) {
        renderizarEstadoVazio(produtosMediaDiv, "Media de produtos por compra", "0");
        return;
    }

    let totalProdutos = 0;
    const qntVendas = vendas.length;

    vendas.forEach(venda => {
        venda.itens.forEach(item => {
            totalProdutos += item.quantidade;
        });
    });

    const produtosMedia = totalProdutos / qntVendas;

    produtosMediaDiv.innerHTML = `
        <h2>Média de produtos por compra</h2>
        <p>${produtosMedia.toFixed(2)}</p>
    `;
}

function renderizarFaturamentoBruto(faturamentoBrutoDiv) {
    const vendas = carregarVendasAtivas();

    if (vendas.length == 0) {
        renderizarEstadoVazio(faturamentoBrutoDiv, "Faturamento Bruto", "R$ 0,00");
        return;
    }

    let faturamentoBruto = 0;

    vendas.forEach(venda => {
        faturamentoBruto += venda.total;
    });

    faturamentoBrutoDiv.innerHTML = `
        <h2>Faturamento Bruto</h2>
        <p>R$ ${faturamentoBruto.toFixed(2)}</p>
    `;
}

function renderizarVendasPorProduto(vendasPorProdutoDiv) {
    const vendas = carregarVendasAtivas();

    if (vendas.length === 0) {
        renderizarEstadoVazio(vendasPorProdutoDiv, "Vendas por Produto", "Sem vendas");
        return;
    }

    const vendasPorProduto = {};

    vendas.forEach(venda => {
        venda.itens.forEach(item => {
            if (!vendasPorProduto[item.nome]) {
                vendasPorProduto[item.nome] = 0;
            }

            vendasPorProduto[item.nome] += item.quantidade;
        });
    });

    const labels = Object.keys(vendasPorProduto);
    const data = Object.values(vendasPorProduto);

    vendasPorProdutoDiv.innerHTML = `
        <h2>Vendas por Produto</h2>
        <canvas id="grafico-produtos"></canvas>
    `;

    const ctx = document.getElementById("grafico-produtos");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Quantidade Vendida",
                data,
                backgroundColor: "rgba(39, 211, 162, 0.78)",
                borderColor: "rgba(183, 247, 216, 1)",
                borderWidth: 1,
                borderRadius: 10,
                hoverBackgroundColor: "rgba(90, 169, 255, 0.9)"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: "rgba(247, 251, 255, 0.72)"
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: "rgba(247, 251, 255, 0.72)",
                        precision: 0
                    },
                    grid: {
                        color: "rgba(255, 255, 255, 0.08)"
                    }
                }
            }
        }
    });
}

function renderizarLucro(lucroDiv) {
    const vendas = carregarVendasAtivas();

    if (vendas.length == 0) {
        renderizarEstadoVazio(lucroDiv, "Lucro", "R$ 0,00");
        return;
    }

    let lucro = 0;

    vendas.forEach(venda => {
        venda.itens.forEach(item => {
            lucro +=
                item.precoVenda * item.quantidade -
                item.precoCompra * item.quantidade;
        });
    });

    lucroDiv.innerHTML = `
        <h2>Lucro</h2>
        <p>R$ ${lucro.toFixed(2)}</p>
    `;
}

export function renderizarDashboard() {
    const ticketMedioDiv = document.getElementById("ticket-medio");
    const produtosMediaDiv = document.getElementById("produtos-media");
    const vendasPorProdutoDiv = document.getElementById("produtos-mais-vendidos");
    const produtosMargemLucroDiv = document.getElementById("produtos-margem-lucro");
    const faturamentoBrutoDiv = document.getElementById("faturamento-bruto");
    const lucroDiv = document.getElementById("lucro");

    renderizarticketMedio(ticketMedioDiv);
    renderizarProdutosmedia(produtosMediaDiv);
    renderizarFaturamentoBruto(faturamentoBrutoDiv);
    renderizarVendasPorProduto(vendasPorProdutoDiv);
    renderizarLucro(lucroDiv);
}
