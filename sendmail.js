'use strict'
const fs = require('fs')
const chalk = require('chalk')
const p = require('path')
const schema = {
  from: ['from', 'f'],
  to: ['_'],
  cc: ['cc', 'c'],
  bcc: ['bcc', 'b'],
  subject: ['subject', 's'],
  attachments: ['attachment', 'a'],
  replyTo: ['reply-to', 'r'],
  html: ['html', 'H'],
  markdown: ['markdown', 'md', 'M'],
} 

module.exports = (transport, stream, options) => {

  const m = {}

  for(let i in schema) {
    if(!m[i])
      m[i] = []

    schema[i].forEach((e) => {
      if (options[e]) {
        m[i] = m[i].concat(
          ...Array.isArray(options[e]) ? options[e] : [options[e]]
        )
      } 
    })
  }

  m.attachments = m.attachments.map(e => {
    return {path: e}
  })

  let type

  ;['html', 'markdown'].forEach(e => (m[e][0] ? type = e : true) && delete m[e])

  if (type) {
    m[type] = stream
  } else if (stream.path) {
    let ext = p.extname(stream.path).slice(1)
    switch (ext) {
      case 'md':
        m.markdown = stream      
        break;
      case 'html':
        m.html = stream      
        break;
      default:
        m.text = stream
    }
  } else {
    m.text = stream
  }

  if (!m.from.length) {
    m.from = transport.transporter.options.auth.user
  }

  m.subject = m.subject.join('')

  return new Promise((resolve, reject) => {
    transport.sendMail(m, (err, infos) => {
      if(err) {
        return reject(err)
      }

      resolve(infos) 
    })
  })
}
