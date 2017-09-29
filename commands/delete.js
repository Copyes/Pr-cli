const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Whitch template you want to delete:',
        validate(val){
            if(tplList[val]){
                return true
            }else if(val === ''){
                return 'Name is required'
            }else if(!tplList[val]){
                return 'The template does\'t existed'
            }
        }
    }
]

module.exports = prompt(questions).then(({ name }) => {
    delete tplList[name]

    writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
        if(err){
            console.log(err)
        }
        listTable(tplList, 'Template has been deleted successfully')
    })
})