const express = require('express')
const router = express.Router()

// Controladores

const clienteController = require('../controllers/clienteController')
const produtoController = require('../controllers/productoController')
const pedidoController = require('../controllers/pedidoController')

module.exports = function(){

    //functiones de test
    // router.get('/', (req, res) => {
    //     res.send('inicio test')
    // })

    // router.get('/nosotros',(req,res) => {
    //     res.send('nosotros test')
    // })

    // CLIENTES

    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtiene todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    //Obtine un cliente
    router.get('/clientes/:idCliente', clienteController.mostrarCliente) 

    //Actulizar cliente
    router.put('/clientes/:idCliente', clienteController.actulizarCliente) 

    //Eliminar un ciente por id
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)



    // Productos
    // nuevo producto
    router.post('/productos', 
        produtoController.subirArchivo,
        produtoController.nuevoProducto)

    router.get('/productos', produtoController.mostrarProductos)

    router.get('/productos/:idProducto', produtoController.mostrarProducto)

    router.put('/productos/:idProducto', 
        produtoController.subirArchivo,
        produtoController.actualizarProducto)

    router.delete('/productos/:idProducto', produtoController.eliminarProducto)


    //Pedidos
    router.post('/pedidos', pedidoController.nuevoPedido)

    router.get('/pedidos', pedidoController.mostrarPedidos)

    router.get('/pedidos/:idPedido', pedidoController.mostrarPedido)

    router.put('/pedidos/:idPedido', pedidoController.actualizarPedido)

    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido)

    return router
}