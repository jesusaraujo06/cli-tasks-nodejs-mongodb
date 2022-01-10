const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

// Establecemos el modelo
module.exports = model('Task', taskSchema)