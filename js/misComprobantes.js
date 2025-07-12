import { initBuscarComponente } from "../components/buscar/js/buscar.js";

export const MISCOMPROBANTES_SERVICE = "http://localhost:8080";

addEventListener("DOMContentLoaded", ()=>{

    opcBuscar.addEventListener("click", buscarComprobantes);

});

async function buscarComprobantes() {

    principalHeader.innerText = "Usuarios";

    await loadComponent("components/buscar/html/index.html", 
                    "components/buscar/css/buscar.css",
                    "components/buscar/js/buscar.js");


    initBuscarComponente();
}

async function loadComponent(html, css, js) {

    let htmlContent = await fetch(html);
    
    if (htmlContent.ok) {
        principalBody.innerHTML = await htmlContent.text();
        
        if (js != null) {
            const script = document.createElement("script");
            script.src = js;
            script.type = "module"; 
            document.body.appendChild(script);
        }

        if (css != null) {
            const link = document.createElement("link");
            link.rel = "stylesheet"     ;
            link.href = css;
            document.head.appendChild(link);
        }

    }
}

