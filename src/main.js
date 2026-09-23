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
// --- CÓDIGO DEL EJERCICIO 4 (Filtros) ---
const contenedorFiltros = document.querySelector('#filtros')

contenedorFiltros.addEventListener('click', (evento) => {
  // Verificamos que se haya hecho clic en un botón de filtro
  const boton = evento.target.closest('.btn-filtro')
  if (!boton) return
  
  const categoria = boton.dataset.categoria
  
  // 1. Quitar el color azul a todos los botones y ponerlos blancos
  document.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.className = 'btn-filtro bg-white text-gray-800 border px-4 py-2 rounded font-bold hover:bg-gray-100 transition'
  })
  
  // 2. Ponerle el color azul solo al botón que recibió el clic
  boton.className = 'btn-filtro bg-blue-600 text-white px-4 py-2 rounded font-bold transition'
  
  // 3. Filtrar los productos
  if (categoria === 'Todos') {
    mostrarProductos(productos)
  } else {
    // Si eligió una categoría, crea una lista solo con los que coincidan
    const productosFiltrados = productos.filter(p => p.categoria === categoria)
    mostrarProductos(productosFiltrados)
  }
})