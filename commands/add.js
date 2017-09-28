const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`) 
const { resolve } = require('path')
const chalk = require('chalk')

let tplList = require(`${__dirname}/../templates`)
console.log(tplList)
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Set the custom name if the template:',
        validate(val){
            if(tplList[val]){
                return 'The template is existed!'
            } else if(val === ''){
                return 'Name is required'
            } else {
                return true
            }
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'The owner/link of the project',
        validate(val){
            if(val === ''){
                return  'Link is required'  
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'branch',
        message: 'Branch of the project',
        default: 'master'
    }
]

module.exports = prompt(questions).then(({name, place, branch}) => {
    tplList[name] = {}
    tplList[name]['owner/link'] = place
    tplList[name]['branch'] = branch
    writeFile(`${__dirname}/../templates.json`,JSON.stringify(tplList), 'utf-8', (err) => {
        if(err){
            console.log(chalk.red(err))
        }
        listTable(tplList, 'New template has been added successfully!')
    })
})