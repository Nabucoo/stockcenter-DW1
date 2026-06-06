estoqueCard = document.querySelector("#estoque-card");
vendasCard = document.querySelector("#vendas-card");
dashboardCard = document.querySelector("#dashboard-card");

estoqueCard.addEventListener('click', () => {
    window.location.href = "./src/pages/estoque.html";
});

vendasCard.addEventListener('click', () => {
    window.location.href = "./src/pages/vendas.html";
});
dashboardCard.addEventListener('click', () => {
    window.location.href = "./src/pages/dashboard.html";
});



