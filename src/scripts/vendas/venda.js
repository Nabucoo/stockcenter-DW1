function gerarIdVenda() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";

    for (let indice = 0; indice < 6; indice += 1) {
        const posicao = Math.floor(Math.random() * caracteres.length);
        id += caracteres[posicao];
    }

    return id;
}

export class Venda {
    constructor(itens, total, id = gerarIdVenda(), dataHora = new Date().toISOString(), status = "Ativa") {
        this.id = id;
        this.itens = itens;
        this.total = total;
        this.dataHora = dataHora;
        this.status = status;
    }
}