import Chart from "chart.js/auto";
import { Storage } from "../../storage/storage";

function renderizarticketMedio(ticketMedioDiv) {
    const storage = new Storage();
    const vendas = storage.carregarVendas();

    if (vendas.length == 0) {
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
    const storage = new Storage();

    const vendas = storage.carregarVendas();

    if (vendas.length == 0) {
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
    const storage = new Storage();
    const vendas = storage.carregarVendas();

    if (vendas.length == 0) {
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
    const storage = new Storage();
    const vendas = storage.carregarVendas();

    if (vendas.length === 0) {
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
                data
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function renderizarLucro(lucroDiv) {
    const storage = new Storage();
    const vendas = storage.carregarVendas();

    if (vendas.length == 0) {
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