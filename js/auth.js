/* ============================================
   ALKE WALLET - AUTENTICACIÓN (auth.js)
   ============================================ */

// Objeto de estado de la aplicación
const appState = {
    currentUser: null,
    users: {
        'test@ejemplo.com': {
            password: 'password123',
            name: 'Juan Pérez',
            email: 'test@ejemplo.com',
            balance: 5000,
            initials: 'JP'
        }
    },
    transactions: []
};

// Inicialización
$(document).ready(function() {
    console.log('Alke Wallet - Módulo de Autenticación');
    
    // Cargar estado guardado
    loadAppState();
    
    // Verificar si hay usuario loggeado
    if (appState.currentUser) {
        window.location.href = 'menu.html';
    }
    
    // Event Listeners
    attachAuthListeners();
    
    // Inicializar datos de demostración
    initializeDemoData();
});

function attachAuthListeners() {
    // Formulario de Login
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

function handleLogin() {
    const email = $('#loginEmail').val().trim();
    const password = $('#loginPassword').val();
    const alertDiv = $('#loginAlert');
    
    alertDiv.empty();
    
    // Validación
    if (!email || !password) {
        mostrarAlerta(alertDiv, 'Por favor completa todos los campos', 'danger');
        return;
    }
    
    // Verificar credenciales
    if (appState.users[email] && appState.users[email].password === password) {
        appState.currentUser = appState.users[email];
        guardarEstado();
        
        mostrarAlerta(alertDiv, '¡Bienvenido ' + appState.currentUser.name + '!', 'success');
        
        // Redirigir después de 1 segundo
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 1000);
    } else {
        mostrarAlerta(alertDiv, 'Correo o contraseña incorrectos', 'danger');
        $('#loginPassword').val('');
    }
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function mostrarAlerta(element, message, type) {
    const iconClass = type === 'success' ? 'fa-check-circle' : 
                      type === 'danger' ? 'fa-exclamation-circle' : 
                      'fa-info-circle';
    
    const html = `
        <div class="alert alert-${type}" role="alert">
            <i class="fas ${iconClass}"></i> ${message}
        </div>
    `;
    
    $(element).html(html);
    
    // Auto-remover alerta
    setTimeout(() => {
        $(element).fadeOut(500, function() {
            $(this).empty().show();
        });
    }, 5000);
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

function loadAppState() {
    console.log('Cargando estado de la aplicación');
}

function initializeDemoData() {
    if (appState.transactions.length === 0) {
        appState.transactions = [
            {
                type: 'deposit',
                amount: 1000,
                description: 'Depósito Inicial',
                method: 'transferencia',
                date: new Date(Date.now() - 86400000 * 7).toISOString()
            },
            {
                type: 'send',
                amount: 50,
                description: 'Transferencia a María',
                recipient: 'maria@ejemplo.com',
                message: 'Pago por favor',
                date: new Date(Date.now() - 86400000 * 5).toISOString()
            },
            {
                type: 'deposit',
                amount: 500,
                description: 'Pago por freelance',
                method: 'wallet',
                date: new Date(Date.now() - 86400000 * 3).toISOString()
            },
            {
                type: 'send',
                amount: 100,
                description: 'Transferencia a Carlos',
                recipient: 'carlos@ejemplo.com',
                message: 'Almuerzo',
                date: new Date(Date.now() - 86400000 * 1).toISOString()
            }
        ];
        guardarEstado();
    }
}

console.log('Script auth.js cargado correctamente');