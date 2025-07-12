import {httpMethod} from "/js/utils/httpUtils.js";
import { MISCOMPROBANTES_SERVICE } from "/js/misComprobantes.js";


let comprobanteCargado = null;

export function initNuevoComponente() {

    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
      
        e.preventDefault();
        dropZone.classList.remove('dragover');
      
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    
    });

    fileInput.addEventListener('change', (e) => {
      
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    btnNuevo.addEventListener("click", agregarComprobante);
}

async function agregarComprobante() {

    let requestUri = `${MISCOMPROBANTES_SERVICE}/comprobante`;

    console.log(requestUri);

    let comprobante = {
        "entidad": entidad.value,
        "propiedad": propiedad.value,
        "fechaPago": fechaPago.value,
        "montoAbonado": 123,
        "comprobante": await fileToBase64(comprobanteCargado)
    }

    console.log(comprobante);
    
    let ret = await httpMethod(requestUri, "POST", comprobante);

}

function handleFile(file) {

    comprobanteCargado = file;

    previewZone.innerHTML = ''; 

    const fileType = file.type;

    if (fileType === 'application/pdf') {

        const embed = document.createElement('embed');
        embed.src = URL.createObjectURL(file);
        embed.type = 'application/pdf';
        embed.width = '100%';
        embed.height = '600px';
        previewZone.appendChild(embed);

    } else if (fileType.startsWith('image/')) {
    
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        previewZone.appendChild(img);
    
    } else {
        previewZone.innerHTML = '<p>Tipo de archivo no soportado.</p>';
    }
}

async function fileToBase64(file) {

    if (!file) return null;

    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

