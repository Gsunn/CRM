const Productos = require('../models/Productos')
const multer = require('multer') //gestiona la subida de archivos
const shortID = require('shortid')
const fs = require('fs').promises  //Gestion de archivos

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortID.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

const upload = multer(configuracionMulter).single('imagen') //nombre del campo imagen

exports.subirArchivo = (req, res, next) => {
    console.log('Subir Archivo');
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })

        }

        return next()
    })
}

//agrega nuevo producto

exports.nuevoProducto = async (req, res, next) => {
    console.log('Nuevo Producto')
    console.log(req.body);
    const producto = new Productos(req.body)

    try {

        if (req.file.filename) {
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        })
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarProductos = async (req, res, next) => {
    console.log('Mostrar productos');
    try {
        const productos = await (Productos.find())
        res.json(productos)
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.mostrarProducto = async (req, res, next) => {
    console.log('Mostar producto ' + req.params.idProducto);
    try {
        const producto = await (Productos.findById(req.params.idProducto))
        if (!producto) {
            res.json({ mensaje: 'El producto no exite' })
            return next()
        }
        res.json(producto)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.actualizarProducto = async (req, res, next) => {
    console.log('actualizarProducto')
    try {

        // Construir nuevo producto
        let nuevoProducto = req.body

        //Verificar si se ha cargado nueva imagen
        if (req.file) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let producto = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = producto.imagen
        }

        const producto = await Productos.findOneAndUpdate({
            _id: req.params.idProducto
        }, nuevoProducto, {
            new: true //trae a el producto con los valores actulizados
        })

        if (!producto) {
            res.json({
                mesnaje: 'El producto no existe.'
            })
            next()
        }

        //Mostrar el producto
        res.json(producto)

    } catch (error) {
        console.log(error)
        next()
    }
}

exports.eliminarProducto = async (req, res, next) => {
    console.log('eliminarProducto');
    try {

        //ToDo eliminar imagen 

        let producto = await Productos.findById(req.params.idProducto)
        console.log(producto);

        fs.unlink('./uploads/' + producto.imagen)
            .then(() => {
                console.log('Archivo eliminado')
            }).catch(err => {
                console.error('Error eliminando archivo', err)
            })

        await Productos.findOneAndDelete({ __id: req.params.idProducto })
        
        res.json({
            mensaje: 'El producto se ha eliminado'
        })
    } catch (error) {
        console.log(error)
        next()
    }
}