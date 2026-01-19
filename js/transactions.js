/* ============================================
   ALKE WALLET - TRANSACCIONES (transactions.js)
   ============================================ */

$(document).ready(function() {
    console.log('Alke Wallet - Módulo de Transacciones');
    
    // Verificar sesión
    verificarSesion();
    
    // Cargar datos del usuario
    cargarDatosTransactions();
    
    // Cargar historial
    cargarHistorialTransacciones();
});

function verificarSesion() {
    if (!appState.currentUser) {
        window.location.href = 'index.html';
    }
}

function cargarDatosTransactions() {
    const user = appState.currentUser;
    
    // Actualizar navbar
    $('#navUserName').text(user.name);
    $('#userAvatar').text(user.initials);
}

function cargarHistorialTransacciones() {
    const transactions = appState.transactions;
    const container = $('#historyList');
    
    if (transactions.length === 0) {
        container.html(`
            <div class="text-center py-5">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <p class="text-muted">Sin transacciones aún</p>
            </div>
        `);
        return;
    }
    
    // Ordenar por fecha (más recientes primero)
    const transOrdenadas = transactions.slice().reverse();
    
    let html = `
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-light">
                    <tr>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    transOrdenadas.forEach((trans, index) => {
        const tipo = trans.type === 'deposit' ? 'Depósito' : 'Envío';
        const colorClass = trans.type === 'deposit' ? 'success' : 'danger';
        const signo = trans.type === 'deposit' ? '+' : '-';
        const icon = trans.type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up';
        
        const fecha = new Date(trans.date);
        const fechaFormato = fecha.toLocaleDateString('es-AR') + ' ' + fecha.toLocaleTimeString('es-AR', {hour: '2-digit', minute:'2-digit'});
        
        let detalles = '';
        if (trans.type === 'deposit') {
            detalles = trans.method || 'Transferencia';
        } else {
            detalles = trans.recipient || 'Destinatario desconocido';
        }
        
        html += `
            <tr>
                <td>
                    <span class="badge bg-${colorClass} bg-opacity-10 text-${colorClass}">
                        <i class="fas ${icon}"></i> ${tipo}
                    </span>
                </td>
                <td>
                    <strong>${trans.description || trans.message || 'Sin descripción'}</strong>
                </td>
                <td>
                    <span class="text-${colorClass} fw-bold">
                        ${signo}$${formatearMoneda(trans.amount)}
                    </span>
                </td>
                <td>
                    <small class="text-muted">${fechaFormato}</small>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#details${index}">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
            <tr>
                <td colspan="5" class="p-0">
                    <div class="collapse" id="details${index}">
                        <div class="card card-body">
                            ${generarDetalles(trans)}
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    container.html(html);
}

function generarDetalles(trans) {
    let detalles = `
        <div class="row">
            <div class="col-md-6">
                <p><strong>Tipo:</strong> ${trans.type === 'deposit' ? 'Depósito' : 'Envío'}</p>
                <p><strong>Monto:</strong> $${formatearMoneda(trans.amount)}</p>
    `;
    
    if (trans.type === 'deposit') {
        detalles += `
            <p><strong>Método:</strong> ${trans.method || 'No especificado'}</p>
            <p><strong>Descripción:</strong> ${trans.description || 'Sin descripción'}</p>
        `;
    } else {
        detalles += `
            <p><strong>Destinatario:</strong> ${trans.recipientName || 'Desconocido'}</p>
            <p><strong>Correo:</strong> ${trans.recipient || 'No disponible'}</p>
            <p><strong>Mensaje:</strong> ${trans.message || 'Sin mensaje'}</p>
        `;
    }
    
    const fecha = new Date(trans.date);
    const fechaCompleta = fecha.toLocaleString('es-AR');
    
    detalles += `
            </div>
            <div class="col-md-6">
                <p><strong>Fecha y Hora:</strong> ${fechaCompleta}</p>
                <p><strong>Estado:</strong> <span class="badge bg-success">Completado</span></p>
            </div>
        </div>
    `;
    
    return detalles;
}

function formatearMoneda(valor) {
    return valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log('Script transactions.js cargado correctamente');