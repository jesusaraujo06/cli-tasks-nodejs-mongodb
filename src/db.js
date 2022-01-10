const {MONGODB_URI} = require('../config')
// Requerir la funcion connect del modulo mongoose
const {connect, connection, Types} = require('mongoose')



const connectDB = async () => {
    await connect(
        MONGODB_URI,
        {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    // console.log('MongoDB connect')
}

connection.on('error', err => console.log(err))

// Exportar funciones y objetos
module.exports = {
    connectDB,
    connection,
    Types
}