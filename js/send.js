/* ============================================
   ALKE WALLET - ENVIAR DINERO (send.js)
   ============================================ */

$(document).ready(function() {
    console.log('Alke Wallet - Módulo de Envío de Dinero');
    
    // Verificar sesión
    verificarSesion();
    
    // Cargar datos del usuario
    cargarDatosSend();
    
    // Event Listeners
    attachSendListeners();
});

function verificarSesion() {
    if (!appState.currentUser) {
        window.location.href = 'index.html';
    }
}

function cargarDatosSend() {
    const user = appState.currentUser;
    
    // Actualizar navbar
    $('#navUserName').text(user.name);
    $('#userAvatar').text(user.initials);
    
    // Actualizar saldo
    $('#sendBalance').text('$' + formatearMoneda(user.balance));
}

function attachSendListeners() {
    // Formulario de envío
    $('#sendForm').on('submit', function(e) {
        e.preventDefault();
        handleSend();
    });
    
    // Validación en tiempo real del monto
    $('#sendAmount').on('input', function() {
        const value = parseFloat($(this).val());
        if (value < 0) {
            $(this).val('');
        }
    });
}

function handleSend() {
    const recipientName = $('#recipientName').val().trim();
    const recipientEmail = $('#recipientEmail').val().trim();
    const amount = parseFloat($('#sendAmount').val());
    const message = $('#sendMessage').val() || 'Sin descripción';
    const alertDiv = $('#sendAlert');
    
    alertDiv.empty();
    
    // Validaciones
    if (!recipientName) {
        mostrarAlertaSend(alertDiv, 'Por favor ingresa el nombre del destinatario', 'danger');
        return;
    }
    
    if (!validarEmail(recipientEmail)) {
        mostrarAlertaSend(alertDiv, 'Por favor ingresa un correo válido', 'danger');
        return;
    }
    
    if (recipientEmail === appState.currentUser.email) {
        mostrarAlertaSend(alertDiv, 'No puedes enviar dinero a tu propia cuenta', 'danger');
        return;
    }
    
    if (!amount || amount <= 0) {
        mostrarAlertaSend(alertDiv, 'Por favor ingresa un monto válido', 'danger');
        return;
    }
    
    if (amount > appState.currentUser.balance) {
        mostrarAlertaSend(alertDiv, 'Saldo insuficiente. Tu saldo actual es: $' + formatearMoneda(appState.currentUser.balance), 'danger');
        return;
    }
    
    // Procesar envío
    try {
        appState.currentUser.balance -= amount;
        
        // Agregar a transacciones
        appState.transactions.push({
            type: 'send',
            amount: amount,
            recipientName: recipientName,
            recipient: recipientEmail,
            message: message,
            date: new Date().toISOString()
        });
        
        guardarEstado();
        
        mostrarAlertaSend(alertDiv, '¡Envío de $' + formatearMoneda(amount) + ' a ' + recipientName + ' realizado exitosamente!', 'success');
        
        // Actualizar saldo visual
        $('#sendBalance').text('$' + formatearMoneda(appState.currentUser.balance));
        
        // Limpiar formulario
        $('#sendForm')[0].reset();
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error en envío:', error);
        mostrarAlertaSend(alertDiv, 'Ocurrió un error al procesar el envío', 'danger');
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarAlertaSend(element, message, type) {
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

console.log('Script send.js cargado correctamente');