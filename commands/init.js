const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`) 
const { resolve } = require('path')
const chalk = require('chalk')
const ora = require('ora')
const exec = require('child_process').exec

let tplList = require(`${__dirname}/../templates`)
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
        message: 'The project name',
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
    const gitSite = tplList[name]['owner/link']
    const gitBranch = tplList[name]['branch']
    // git命令，远程拉取项目并自定义项目名
    let cmdStr = `git clone ${gitSite} ${project} && cd ${project} && git checkout ${gitBranch}`
    const spinner = ora('Downloading template.....')

    spinner.start()
    exec(cmdStr, (error, stdout, stderr) => {
        if (error) {
          console.log(chalk.red(error))
          process.exit()
        }
        console.log(chalk.green('\n √ Generation completed!'))
        console.log(`\n cd ${project} && npm install \n`)
        process.exit()
      })
})