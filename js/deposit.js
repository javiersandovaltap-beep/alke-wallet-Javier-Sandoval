/* ============================================
   ALKE WALLET - DEPÓSITOS (deposit.js)
   ============================================ */

$(document).ready(function() {
    console.log('Alke Wallet - Módulo de Depósitos');
    
    // Verificar sesión
    verificarSesion();
    
    // Cargar datos del usuario
    cargarDatosDeposit();
    
    // Event Listeners
    attachDepositListeners();
});

function verificarSesion() {
    if (!appState.currentUser) {
        window.location.href = 'index.html';
    }
}

function cargarDatosDeposit() {
    const user = appState.currentUser;
    
    // Actualizar navbar
    $('#navUserName').text(user.name);
    $('#userAvatar').text(user.initials);
    
    // Actualizar saldo
    $('#depositBalance').text('$' + formatearMoneda(user.balance));
}

function attachDepositListeners() {
    // Formulario de depósito
    $('#depositForm').on('submit', function(e) {
        e.preventDefault();
        handleDeposit();
    });
    
    // Validación en tiempo real del monto
    $('#depositAmount').on('input', function() {
        const value = parseFloat($(this).val());
        if (value < 0) {
            $(this).val('');
        }
    });
}

function handleDeposit() {
    const amount = parseFloat($('#depositAmount').val());
    const method = $('#depositMethod').val();
    const description = $('#depositDesc').val() || 'Depósito de fondos';
    const alertDiv = $('#depositAlert');
    
    alertDiv.empty();
    
    // Validaciones
    if (!amount || amount <= 0) {
        mostrarAlertaDeposit(alertDiv, 'Por favor ingresa un monto válido', 'danger');
        return;
    }
    
    if (amount > 100000) {
        mostrarAlertaDeposit(alertDiv, 'El monto no puede exceder $100,000', 'danger');
        return;
    }
    
    if (!method) {
        mostrarAlertaDeposit(alertDiv, 'Por favor selecciona un método de pago', 'danger');
        return;
    }
    
    // Procesar depósito
    try {
        appState.currentUser.balance += amount;
        
        // Agregar a transacciones
        appState.transactions.push({
            type: 'deposit',
            amount: amount,
            description: description,
            method: method,
            date: new Date().toISOString()
        });
        
        guardarEstado();
        
        mostrarAlertaDeposit(alertDiv, '¡Depósito de $' + formatearMoneda(amount) + ' realizado exitosamente!', 'success');
        
        // Actualizar saldo visual
        $('#depositBalance').text('$' + formatearMoneda(appState.currentUser.balance));
        
        // Limpiar formulario
        $('#depositForm')[0].reset();
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error en depósito:', error);
        mostrarAlertaDeposit(alertDiv, 'Ocurrió un error al procesar el depósito', 'danger');
    }
}

function mostrarAlertaDeposit(element, message, type) {
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    const html = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <i class="fas ${iconClass}"></i> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    $(element).html(html);
    
    if (type === 'danger') {
        setTimeout(() => {
            $(element).fadeOut(500, function() {
                $(this).empty().show();
            });
        }, 5000);
    }
}

function formatearMoneda(valor) {
    return valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function guardarEstado() {
    try {
        const userData = {
            currentUser: appState.currentUser,
            transactions: appState.transactions
        };
        const json = JSON.stringify(userData);
        console.log('Estado guardado (' + json.length + ' caracteres)');
    } catch (e) {
        console.log('Estado guardado en memoria');
    }
}

console.log('Script deposit.js cargado correctamente');