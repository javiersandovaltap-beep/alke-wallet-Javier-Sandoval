Alke Wallet - Billetera Digital Frontend
Alke Wallet es una aplicación web frontend para una billetera digital, desarrollada como Trabajo Práctico del Módulo 2: Fundamentos del Desarrollo Frontend. Implementa una interfaz dinámica y responsive para gestionar finanzas personales de forma segura y simulada.
​

El proyecto permite login, visualización de saldo, depósitos, envíos a contactos con gestión de lista, y historial filtrable de transacciones, usando localStorage para persistencia de datos.
​

Funcionalidades
Autenticación: Login demo con test@ejemplo.com / password123. Redirige a dashboard post-login.
​

Dashboard (menu.html): Saldo total, stats (ingresos/gastos/transacciones), acciones rápidas y transacciones recientes.
​

Depósitos (deposit.html): Selecciona método (tarjeta, transferencia), ingresa monto y descripción. Actualiza saldo.
​

Envíos (send.html): Tabs para enviar (con contactos), ver/agregar/eliminar contactos. Valida saldo antes de transferir.
​

Historial (transactions.html): Lista completa con filtros (todas/ingresos/gastos), stats resumidas.
​

Tecnologías y Estructura
Categoría	Archivos	Descripción
HTML	index.html (login), menu.html, deposit.html, send.html, transactions.html	Estructura semántica responsive con Bootstrap 5.
​
JavaScript	menu.js, send.js, auth.js, transactions.js, deposit.js	Lógica interactiva con jQuery, validaciones, localStorage.
​
CSS	styles.css	Estilos personalizados: gradientes púrpura, animaciones, dark mode ready.
​
Documentación	6.-Trabajo-practico-M2_-Fundamentos-del-desarrollo-Frontend.pdf	Consigna original del proyecto.
​
Dependencias externas (CDNs):

Bootstrap 5.3 CSS/JS

jQuery 3.6

Font Awesome 6.4

Instalación y Demo
Clona el repo: git clone https://github.com/tuusuario/alke-wallet.git

Abre index.html en cualquier navegador moderno.

Inicia sesión con credenciales demo.

Prueba todas las secciones: depósitos aumentan saldo, envíos lo reducen.

Vista en vivo: Activa GitHub Pages en Settings > Pages > Source: Deploy from branch main > Save.

Responsive Design
Mobile-first con CSS Grid/Flexbox.

Sidebar colapsa en móviles.

Tabs y listas scrollables.

Notas del Desarrollo
Basado en consigna fintech: seguridad simulada, UX intuitiva.
​

Buenas prácticas: código legible, eventos jQuery, validaciones cliente.

Posibles mejoras: Backend real (Node.js/API), autenticación JWT, base de datos.