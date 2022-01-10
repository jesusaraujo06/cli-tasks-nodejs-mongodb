const { program } = require('commander')
const  inquirer  = require('inquirer')
const { addTask, listTasks, removeTask, updateTask, findTask} = require('./controllers/task.controller.js')

program.version('0.0.1').description('App de cli xd')

// Array de preguntas para el comando save
const taskQuestions = [
    {
        type: 'input',
        message: 'Task title',
        name: 'title'
    },
    {
        type: 'input',
        message: 'Task description',
        name: 'description'
    }
]

/**
 * COMMAND save
 * @param title
 * @param description
 */
program.command('save')
.alias('s')
.action(async () => {
    const answers = await inquirer.prompt(taskQuestions)
    addTask(answers)
})

program.command('list')
.alias('l')
.action(async () => {
    listTasks()
})

program.command('delete <id>')
.alias('d')
.action((_id) => {
    removeTask(_id)
})

program.command('update <id>')
.alias('u')
.action(async (_id) => {
    // const task = await findTask(_id)
    // if(task){
    //     console.log('Edit task...')
    //     const answers = await inquirer.prompt(taskQuestions)
    //     updateTask(_id, answers)
    // }else{
    //     console.log('error')
    // }

    const answers = await inquirer.prompt(taskQuestions)
    updateTask(_id, answers)
})

program.command('find <task>')
.alias('f')
.action((text) => {
    findTask(text)
})

program.parse(process.argv)