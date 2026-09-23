import './style.css'
import { productos } from './datos.js'

const catalogo = document.querySelector('#catalogo')
// Nuevas variables para el Ejercicio 3
const listaPedido = document.querySelector('#lista-pedido')
const total = document.querySelector('#total')
const btnVaciar = document.querySelector('#btn-vaciar')

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

// --- CÓDIGO DEL EJERCICIO 3 ---

function mostrarPedido() {
  // Dibuja los productos en la lista del aside
  listaPedido.innerHTML = pedido.map(p => `
    <li class="flex justify-between border-b pb-1">
      <span>${p.nombre}</span>
      <span class="font-bold">$${p.precio}</span>
    </li>
  `).join('')
  
  // Calcula la suma total de los precios
  const suma = pedido.reduce((acumulador, p) => acumulador + p.precio, 0)
  total.textContent = suma
}

// Escucha los clics en todo el catálogo
catalogo.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-id]')
  if (!boton) return // Si no hizo clic en un botón, no hace nada
  
  const id = Number(boton.dataset.id)
  const productoEncontrado = productos.find(p => p.id === id)
  
  pedido.push(productoEncontrado)
  mostrarPedido()
})

// Botón para vaciar el arreglo
btnVaciar.addEventListener('click', () => {
  pedido.length = 0
  mostrarPedido()
})

// ------------------------------

mostrarProductos(productos)