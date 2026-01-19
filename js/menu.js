/* ============================================
   ALKE WALLET - MENÚ PRINCIPAL (menu.js)
   ============================================ */

$(document).ready(function() {
    console.log('Alke Wallet - Módulo de Menú Principal');
    
    // Verificar sesión
    verificarSesion();
    
    // Cargar datos del usuario
    cargarDatosUsuario();
    
    // Cargar estadísticas
    cargarEstadisticas();
    
    // Cargar transacciones recientes
    cargarTransaccionesRecientes();
    
    // Event Listeners
    attachMenuListeners();
});

function verificarSesion() {
    if (!appState.currentUser) {
        console.warn('No hay usuario loggeado');
        window.location.href = 'index.html';
    }
}

function cargarDatosUsuario() {
    const user = appState.currentUser;
    
    // Actualizar navbar
    $('#navUserName').text(user.name);
    $('#userAvatar').text(user.initials).addClass('avatar-' + user.initials.toLowerCase());
    
    // Actualizar encabezado
    $('#userName').text(user.name);
    $('#userEmail').text(user.email);
    
    // Actualizar saldo
    actualizarSaldo();
}

function actualizarSaldo() {
    const user = appState.currentUser;
    $('#userBalance').text('$' + formatearMoneda(user.balance));
}

function cargarEstadisticas() {
    const transactions = appState.transactions;
    
    let ingresos = 0;
    let gastos = 0;
    
    transactions.forEach(trans => {
        if (trans.type === 'deposit') {
            ingresos += trans.amount;
        } else if (trans.type === 'send') {
            gastos += trans.amount;
        }
    });
    
    $('#statsIngresos').text('$' + formatearMoneda(ingresos));
    $('#statsGastos').text('$' + formatearMoneda(gastos));
    $('#statsTransacciones').text(transactions.length);
}

function cargarTransaccionesRecientes() {
    const transactions = appState.transactions;
    const recientes = transactions.slice(-3).reverse();
    const listContainer = $('#recentTransactionsList');
    
    if (recientes.length === 0) {
        listContainer.html('<p class="text-muted text-center">Sin transacciones aún</p>');
        return;
    }
    
    let html = '';
    recientes.forEach(trans => {
        const tipo = trans.type === 'deposit' ? 'Depósito' : 'Envío';
        const colorClass = trans.type === 'deposit' ? 'success' : 'danger';
        const icon = trans.type === 'deposit' ? 'fa-arrow-down' : 'fa-arrow-up';
        const signo = trans.type === 'deposit' ? '+' : '-';
        
        const fecha = new Date(trans.date);
        const fechaFormato = fecha.toLocaleDateString('es-AR');
        
        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center py-3 border-bottom">
                <div class="d-flex align-items-center">
                    <div class="bg-${colorClass} bg-opacity-10 p-3 rounded-circle me-3">
                        <i class="fas ${icon} text-${colorClass}"></i>
                    </div>
                    <div>
                        <h6 class="mb-0">${tipo}</h6>
                        <small class="text-muted">${fechaFormato}</small>
                    </div>
                </div>
                <h6 class="text-${colorClass} mb-0">${signo}$${formatearMoneda(trans.amount)}</h6>
            </div>
        `;
    });
    
    listContainer.html(html);
}

function attachMenuListeners() {
    // Botón Depositar
    $('#btnDeposit').on('click', function() {
        window.location.href = 'deposit.html';
    });
    
    // Botón Enviar
    $('#btnSend').on('click', function() {
        window.location.href = 'send.html';
    });
    
    // Botón Ver Historial
    $('#btnHistory').on('click', function() {
        window.location.href = 'transactions.html';
    });
    
    // Botón Logout
    $('#btnLogout').on('click', function() {
        handleLogout();
    });
}

function handleLogout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        appState.currentUser = null;
        appState.transactions = [];
        window.location.href = 'index.html';
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function formatearMoneda(valor) {
    return valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log('Script menu.js cargado correctamente');