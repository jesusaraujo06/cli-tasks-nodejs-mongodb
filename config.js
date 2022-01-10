require('dotenv').config({path: __dirname + '/.env'})

// console.log(__dirname)

/**
 * process.cwd()
 * devuelve el directorio de trabajo actual
 */

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI
}