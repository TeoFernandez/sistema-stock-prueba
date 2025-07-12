
import {httpMethod} from "/js/utils/httpUtils.js";
import { MISCOMPROBANTES_SERVICE } from "/js/misComprobantes.js";

export function initBuscarComponente() {
    
    let btnBuscar = document.getElementById("btnBuscar");

    btnBuscar.addEventListener("click", buscar);
}

async function buscar() {

    let requestUri = `${MISCOMPROBANTES_SERVICE}/comprobantes?` +
                `entidad=${entidad.value}` +
                `&propiedad=${propiedad.value}` +
                `&fechaPagoDesde=${fechaPagoDesde.value}` +
                `&fechaPagoHasta=${fechaPagoHasta.value}`;

    console.log(requestUri);

    let comprobantes = await httpMethod(requestUri, "GET", null);

    let tablaHTML = `
    <table class="tabla-comprobantes">
        <thead>
            <tr>
                <th>Entidad</th>
                <th>Propiedad/Bien</th>
                <th>Fecha de pago</th>
                <th>Monto abonado</th>
                <th>Comprobante</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let comprobante of comprobantes) {

        tablaHTML += `<tr>
                        <td>${comprobante.entidad}</td>
                        <td>${comprobante.propiedad}</td>
                        <td>${comprobante.fechaPago}</td>
                        <td>${comprobante.montoAbonado}</td>
                        <td class="celda-comprobante">
                            <img src="${comprobante.comprobante}" />
                        </td>
                    </tr>`;
    }

    tablaHTML += `</tbody></table>`;

    opcBuscarRet.innerHTML = tablaHTML;

}