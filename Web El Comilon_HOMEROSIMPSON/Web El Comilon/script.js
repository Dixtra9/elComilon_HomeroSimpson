// Función para mostrar la vista seleccionada
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(viewId).style.display = 'block';
}

// Función para mostrar el formulario de cliente
function showForm() {
    document.getElementById('clienteForm').style.display = 'block';
}

// Función para agregar items al menú (puedes modificar los productos según tus necesidades)
const menuItems = [
    { id: 1, nombre: 'Empanada de Pino', precio: 2000 },
    { id: 2, nombre: 'Cazuela de Vacuno', precio: 5000 },
    { id: 3, nombre: 'Pastel de Choclo', precio: 4000 },
    { id: 4, nombre: 'Humita', precio: 3000 }
];

function loadMenu() {
    const menuContainer = document.getElementById('menuItems');
    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'col-md-4 mb-4';
        itemDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">$${item.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito(${item.id})">Agregar al Carrito</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(itemDiv);
    });
}

// Función para agregar items al carrito
let carrito = [];

function agregarAlCarrito(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    carrito.push(item);
    alert(`${item.nombre} ha sido agregado al carrito.`);
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carritoItems');
    carritoContainer.innerHTML = '';
    carrito.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'card mb-2';
        itemDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${item.nombre}</h5>
                <p class="card-text">$${item.precio}</p>
            </div>
        `;
        carritoContainer.appendChild(itemDiv);
    });
}

// Función para realizar el pedido
function realizarPedido() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Datos del cliente estático
    const cliente = {
        nombre: 'Homero Simpson',
        email: 'homero@simpson.cl',
        telefono: '987654321',
        direccion: 'Calle Falsa 123, Springfield',
        entrega: 'Entrega a domicilio',
        fechaEntrega: '28 de julio del 2024',
        horaEntrega: '12:45'
    };

    // Generar HTML para los datos del cliente
    let clienteHTML = `
        <div class="card mb-2">
            <div class="card-body">
                <h5 class="card-title">${cliente.nombre}</h5>
                <p class="card-text">Email: ${cliente.email}</p>
                <p class="card-text">Teléfono: ${cliente.telefono}</p>
                <p class="card-text">Dirección: ${cliente.direccion}</p>
                <p class="card-text">Entrega: ${cliente.entrega}</p>
                <p class="card-text">Fecha de Entrega: ${cliente.fechaEntrega}</p>
                <p class="card-text">Hora de Entrega: ${cliente.horaEntrega}</p>
            </div>
        </div>
    `;

    const resumenClienteContainer = document.getElementById('resumenCliente');
    resumenClienteContainer.innerHTML = clienteHTML;

    // Generar HTML para el resumen del pedido
    let resumenHTML = '<ul class="list-group">';
    let total = 0;
    carrito.forEach(item => {
        resumenHTML += `<li class="list-group-item">${item.nombre}: $${item.precio}</li>`;
        total += item.precio;
    });
    resumenHTML += `<li class="list-group-item list-group-item-success">Total: $${total}</li>`;
    resumenHTML += '</ul>';

    const resumenContainer = document.getElementById('resumenPedido');
    resumenContainer.innerHTML = resumenHTML;

    carrito = [];
    mostrarCarrito();
    showView('resumen');
}

// Función para agregar un cliente a la lista
let clientes = [];

document.getElementById('formCliente').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefono = document.getElementById('telefonoCliente').value;
    const entrega = document.getElementById('entregaCliente').value;
    const fechaEntrega = document.getElementById('fechaEntregaCliente').value;
    const horaEntrega = document.getElementById('horaEntregaCliente').value;

    const cliente = {
        nombre,
        email,
        telefono,
        entrega,
        fechaEntrega,
        horaEntrega
    };

    clientes.push(cliente);
    mostrarClientes();

    document.getElementById('formCliente').reset();
    document.getElementById('clienteForm').style.display = 'none';
});

function mostrarClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    clientes.forEach(cliente => {
        const clienteDiv = document.createElement('div');
        clienteDiv.className = 'card mb-2';
        clienteDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${cliente.nombre}</h5>
                <p class="card-text">Email: ${cliente.email}</p>
                <p class="card-text">Teléfono: ${cliente.telefono}</p>
                <p class="card-text">Entrega: ${cliente.entrega === 'retiro' ? 'Retiro en Local' : 'Entrega a Domicilio'}</p>
                <p class="card-text">Fecha de Entrega: ${cliente.fechaEntrega}</p>
                <p class="card-text">Hora de Entrega: ${cliente.horaEntrega}</p>
            </div>
        `;
        listaClientes.appendChild(clienteDiv);
    });
}

// Inicializar el menú al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    showView('inicio');
});
