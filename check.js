const chalk = require('chalk')
const url = require('url')

module.exports = (transport, path) => {
  return new Promise((resolve, reject) => {
    transport.verify((error, success) => {
      if (error) {
        console.error(chalk.red('✗ Configuration %sis not valid'), path ? path + ', ' : '')
        return reject(error)
      }

      console.error(chalk.green('✓ Configuration %sis valid'), path ? path + ' ' : '') 
      return resolve(null, true)
    })

    setTimeout(() => { 
      reject(new Error(`Verification timeout, please check "${path || 'input'}"`)) 
    }, 1000)
  })
}
