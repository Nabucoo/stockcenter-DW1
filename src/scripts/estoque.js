/*
<tr>
    <td>1</td>
    <td>Mouse Gamer</td>
    <td>Periféricos</td>
    <td>15</td>
    <td>R$ 120,00</td>
    <td>
        <button class="btn-edit">
            Editar
        </button>
    </td>
</tr>
*/

const tabela = document.getElementById("tabela");

let contadorId = 1;

function adicionarProduto() {

    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const precoVenda = document.getElementById("preco_venda").value;
    const departamento = document.getElementById("departamento").value;

    tabela.innerHTML += `
        <tr>

            <td>${contadorId}</td>

            <td>${nome}</td>

            <td>${departamento}</td>

            <td>${quantidade}</td>

            <td>R$ ${precoVenda}</td>

            <td>

                <button class="btn btn-warning btn-sm">
                    Editar
                </button>

                <button class="btn btn-danger btn-sm">
                    Remover
                </button>

            </td>

        </tr>
    `;

    contadorId++;

    limparFormulario();
}

function limparFormulario() {

    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco_compra").value = "";
    document.getElementById("preco_venda").value = "";
    document.getElementById("caminho").value = "";
    document.getElementById("departamento").selectedIndex = 0;
    document.getElementById("ativo").checked = true;
}
