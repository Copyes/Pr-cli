const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`) 
const { resolve } = require('path')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')

let tplList = require(`${__dirname}/../templates`)
console.log(tplList)
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'template name:',
        validate(val){
            if(tplList[val]){
                return true
            } else if(val === ''){
                return 'name is required'
            } else if(!tplList[val]){
                return 'the template doesn\'t exists!'
            }
        }
    },
    {
        type: 'input',
        name: 'project',
        message: 'the project name',
        validate(val){
            if(val === ''){
                return  'the project name is required'  
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'where to init the project',
        default: './'
    }
]

module.exports = prompt(questions).then(({name, project, place}) => {
    const gitSite = tplList[name]['owner/name']
    const gitBranch = tplList[name]['branch']
    const spinner = ora('Downloading template.....')

    spinner.start()
    download(`${gitSite}#${gitBranch}`, `${place}/${project}`, (err) => {
        if(err){
            consol.log(chalk.red(err))
            process.exit()
        }
        spinner.stop()
        console.log(chalk.green('New project has been initialized successfully!'))
    })
})