const Clientes = require('../models/Clientes')

//Agrrag un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    //console.log(req.body)
    const cliente = new Clientes(req.body)

    try{
        //Alamcenar registro
        await cliente.save()
        res.json({
            mesnsaje: 'Se agrego un nuevo cliente'
        })
    }catch(error){
        //Si hay error console.log y next
        console.log(error)
        next()
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    console.log('mostrarClientes  --')
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch (error) {
        console.log(error)
        next()
    }
}


// Muestra un cliente por su id
exports.mostrarCliente = async (req, res, next) => {
    console.log('mostrarCliente')
    try {
        const cliente = await Clientes.findById(req.params.idCliente)
        
        if(!cliente){
            res.json({
                mesnaje: 'El cliente no existe.'
            })
            next()
        }
        
        //Mostrar el cliente
        res.json(cliente)

    } catch (error) {
        console.log(error)
        next()
    }
}

// Actuliza un cliente por su Id
exports.actulizarCliente = async (req, res, next) => {
    console.log('actulizarCliente')
    try {
        const cliente = await Clientes.findOneAndUpdate({
            _id: req.params.idCliente
        }, req.body,{
            new: true //trae a el cliente con los valores actulizados
        })
        
        if(!cliente){
            res.json({
                mesnaje: 'El cliente no existe.'
            })
            next()
        }
        
        //Mostrar el cliente
        res.json(cliente)

    } catch (error) {
        console.log(error)
        next()
    }
}

// Eliminar cliente
exports.eliminarCliente = async (req, res, next) => {
    console.log('eliminarCliente')
    try {
        const cliente = await Clientes.findByIdAndDelete({
            _id: req.params.idCliente
        })
        
        if(!cliente){
            res.json({
                mesnaje: 'El cliente no existe.'
            })
            next()
        }
        
        //Mostrar el cliente
        res.json({
            mensajes: 'El cliente fue eliminado',
            cliente
        })

    } catch (error) {
        console.log(error)
        next()
    }
}