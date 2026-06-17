<<<<<<< HEAD
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
=======
export class Venda {
    constructor(itens, total) {
        this.itens = itens;
        this.total = total;
    }
}
>>>>>>> 53f74548b92a7a2f75ceb56552becb855582376a
