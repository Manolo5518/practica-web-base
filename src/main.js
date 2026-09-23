import './style.css'
import { productos } from './datos.js'

const catalogo = document.querySelector('#catalogo')
const pedido = []

function mostrarProductos(lista) {
  catalogo.innerHTML = lista.map(p => `
    <div class="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <h2 class="text-xl font-bold text-gray-800">${p.nombre}</h2>
      <p class="text-gray-600 text-lg my-3">$${p.precio}.00</p>
      <button data-id="${p.id}" class="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-800">Agregar</button>
    </div>
  `).join('')
}

// Llama a la función para que se dibujen las tarjetas al cargar la página
mostrarProductos(productos)