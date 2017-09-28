const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
    head: ['Template name', 'Owner/name', 'Branch'],
    style: {
        head: ['green']
    }
})

 const listTable = (tplList, lyric) => {
    // 获取模版数据
    const list = Object.keys(tplList)
    if(list.length){
        list.forEach((key) => {
            table.push([key, tplList[key]['owner/link'], tplList[key]['branch']])
            if(table.length === list.length){
                console.log(table.toString())
                if(lyric){
                    console.log(chalk.green(`\u2714 ${lyric}`))
                }
            }
        })
    } else {
        console.log(table.toString())
        if(lyric){
            console.log(chalk.green(`\u2714 ${lyric}`))
        }
    }
    process.exit()
 }
 exports.listTable = listTable