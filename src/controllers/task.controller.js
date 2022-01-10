const Task = require('../models/Task')
const { connection, Types } = require('../db')

const addTask = async (task) => {
    await Task.create(task)
    console.log('New task created')
    await connection.close()
}

const listTasks = async () => {
    // con find obtenemos un objeto de mongodb, tenemos que convertirlo en un objeto de javascript
    const tasks = await Task.find().lean()
    console.table(
        /**
         * A las tasks le aplicaremos un map y este map nos va a devolver un nuevo arreglo
         * Y le decimos que por cada task que esta recorriendo que nos devuelva un nuevo objeto
         */
        tasks.map(task => ({
            _id: task._id.toString(),
            title: task.title,
            description: task.description
        }))
    )
    await connection.close()
    // Salir del hilo de node, acabar el proceso
    process.exit(0)
}

const removeTask = async (_id) => {
    await Task.findByIdAndDelete(_id)
    console.log('Task deleted')
    await connection.close()
    process.exit(0)
}

const findTask = async (text) => {
    // Expresión regular /text/i
    const search = new RegExp(text, 'i');
    const tasks = await Task.find().or([
        // {_id: parseID(text)},
        {title: search},
        {description: search}
    ]).lean()
    
    // ({
    //     $or: [
    //         // { _id: parseID(search) },
    //         { title: search },
    //         { description: search }
    //     ],
    //     // $and: [{
    //     //     age: ageParam
    //     // }]
    // }).lean()

    if(tasks.length === 0){
        console.log('Tasks not found')
        await connection.close()
        process.exit(0)
    }

    console.table(
        tasks.map(task => ({
            _id: task._id.toString(),
            title: task.title,
            description: task.description
        }))
    )
    await connection.close()
    process.exit(0)
}

const updateTask = async (_id, newTask) => {
    await Task.updateOne({ _id: _id }, newTask)
    console.log('Task updated')
    await connection.close()
    process.exit(0)
}

// Transformar un parametro en object id
const parseID = (id) => {
    return Types.ObjectId.isValid(id)
}

module.exports = {
    addTask,
    listTasks,
    removeTask,
    findTask,
    updateTask
}