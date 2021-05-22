const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')

// Cors cliente se conecta a otro servidor
const cors = require('cors')

//Conectar con MngoDB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/restapis', {
    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}) 
    .then(() => console.log('MongoDB Conectado...'))
    .catch((err) => console.log(err))

//Crear servidor
const app = express()

//Habilitar body parser
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
})) //Parse URL-encoded bodies

//Habilita CORS
app.use(cors())

//Rutas de la app
app.use('/', routes())




//puerto
app.listen(5001)