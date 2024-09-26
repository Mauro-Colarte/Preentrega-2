let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productos = [
    {
        id: "Pizza N°1",
        titulo: "Pizza 01",
        precio: 20,
        img: "../img/pizza-1.jpg",
    },
    {
        id: "Pizza N°2",
        titulo: "Pizza 02",
        precio: 15,
        img: "../img/Pizza-2.jpg",
    },
    {
        class: "numero-3",
        id: "Pizza N°3",
        titulo: "Pizza 03",
        precio: 10,
        img: "../img/pizza-3.jpg",
    },
    {
        class: "numero-4",
        id: "Pizza N°4",
        titulo: "Pizza 04",
        precio: 30,
        img: "../img/pizza-4.jpg",
    },
    {
        class: "numero-5",
        id:"Empanada N°5",
        titulo: "Empanada 05",
        precio:"5",
        img: "../img/Empanadas-Horno.jpg",
    }
];

// Elementos del DOM
const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

// Mostrar productos en el contenedor
productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src=${producto.img}>
        <h3>${producto.titulo}</h3>
        <p>$${producto.precio}</p>
    `;
    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })
    div.append(button);
    contenedorProductos.append(div);
});

//! Actualizar el carrito en el DOM y LocalStorage
function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>$${producto.precio}</p>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;
            let buttonAumentar = document.createElement("button");
            buttonAumentar.classList.add("carrito-producto-btn");
            buttonAumentar.innerText = "⬆️";
            buttonAumentar.addEventListener("click", () => {
                aumentarCantidad(producto);
            });
            div.append(buttonAumentar);
            let buttonReducir = document.createElement("button");
            buttonReducir.classList.add("carrito-producto-btn");
            buttonReducir.innerText = "⬇️";
            buttonReducir.addEventListener("click", () => {
                reducirCantidad(producto);
            });
            div.append(buttonReducir);
            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "✖️";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });
            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));  // Guardar el carrito actualizado en LocalStorage
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
}

// Función para borrar un producto del carrito
function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

// Función para aumentar la cantidad de un producto en el carrito
function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    itemEncontrado.cantidad++;
    actualizarCarrito();
}

// Función para reducir la cantidad de un producto en el carrito
function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        actualizarCarrito();
    } else {
        borrarDelCarrito(itemEncontrado);
    }
}

// Función para actualizar el total del carrito
function actualizarTotal() {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

// Función para finalizar la compra y vaciar el carrito
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío.');
        return;
    }

    // Mostrar mensaje de compra completada
    alert('Gracias por tu compra!');

    // Vaciar el carrito
    carrito = [];

    // Actualizar la interfaz y LocalStorage
    actualizarCarrito();
}
