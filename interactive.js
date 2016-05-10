'use strict'
const inquirer = require('inquirer')
const util = require('util')
const fs = require('fs')
const os = require('os')
const existsSync = require('@soyuka/exists-sync')
const sendmail = require('./sendmail.js')

const questionMap = {
  to: {
    type: 'input',
    name: 'to',
    message: 'To:',
    validate: (a) => !!a
  },

  cc: {
    type: 'input',
    name: 'cc',
    message: 'Cc:'
  },

  bcc: {
    type: 'input',
    name: 'bcc',
    message: 'Bcc:'
  },

  replyTo: {
    type: 'input',
    name: 'reply-to',
    message: 'Reply to:'
  },

  attachments: {
    type: 'input',
    name: 'attachment',
    message: 'Attachments:'
  },

  subject: {
    type: 'input',
    name: 'subject',
    message: 'Subject:'
  },

  interactive: {
    type: 'expand',
    name: 'next',
    message: 'Send or add field?',
    choices: [
      { key: 'y', name: 'Send', value: 'send' },
      { key: 'a', name: 'Attachment', value: 'attachment' },
      { key: 'r', name: 'Reply To', value: 'reply-to' },
      { key: 'c', name: 'Cc', value: 'cc' },
      { key: 'b', name: 'Bcc', value: 'bcc' },
      { key: 's', name: 'Subject', value: 'subject' },
      { key: 't', name: 'To', value: 'to' },
      { key: 'e', name: 'Edit', value: 'edit' }
    ],
    default: 'y'
  }
}

function message(answers) {
  let tmp = `${os.tmpdir()}/cma-message-${Date.now()}`

  if(answers.message) {
    fs.writeFileSync(tmp, answers.message) 
  }

  return new Promise((resolve, reject) => {
    require('editor')(tmp, function(code, sig) {
      if (!existsSync(tmp)) {
        return resolve(answers)
      }

      if (code === 0) {
        answers.message = fs.readFileSync(tmp)
        fs.unlinkSync(tmp)
        return resolve(answers)
      }

      return reject(code)
    })
  })
}

function run(options, tasks) {
  return inquirer.prompt(tasks)
  .then((answers) => {
    options = util._extend(options, answers)

    if(!options.message || options.next === 'edit') {
      return message(options) 
      .then((answers) => {
        options.message = answers.message
        return run(options, [questionMap.interactive]) 
      })
    }

    if(answers.next === 'send') {
      return Promise.resolve(options)
    }

    return run(options, [questionMap[answers.next] || questionMap.interactive])
  })
}

module.exports = transport => {
  let options = {}
  return run(options, [questionMap.to, questionMap.subject])
  .then(options => {
    for(let i in options) {
      options[i] = i == 'message' ? options[i] : options[i].split(', ')
    }

    return sendmail(transport, options.message, options) 
  })
}
