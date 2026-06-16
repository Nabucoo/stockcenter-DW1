import { renderizarDashboard } from "./renderizar";

window.addEventListener("load", renderizarDashboard);
window.addEventListener("stockcenter:storage-update", renderizarDashboard);