# CMA

## Name

  cma -- send a mail

## Install

  ```
  npm install -g cma
  ```

## Synopsis

  ```
  cma [-MHIRFma] [-s subject] [-c cc-addr] [-b bcc-addr] to-addr ... [file]
  cma config -- interactive configuration helper
  cma check -- verify configuration
  ```

## Examples

  ```
  cma -I
  cma -Ms Hello to@example.org < message.md
  cma me@example.org you@example.org message.html
  cma -s "hello" -m "world" me@example.org
  cma -Ha filename.jpg
  cma -H -a cover.pdf -a photos.zip someone@example.org < holidays.html
  keybase pgp encrypt -s -m 'Hello crypted world!' someone | cma someone@example.org
  ```

## Options

  ```
  --subject -s
  --cc -c 
  --bcc -b
  --attachment -a 
  --message -m 
  --markdown --md -M
  --html -H
  --interactive -I
  --config filepath
  --reply-to -R
  --from -F -- defaults to user
  --verbose -v
  --help -h
  --version 
  ```

## Advanced configuration

Check out `~/.config/cma/nodemailer.js`, it's a javascript function that exports a `nodemailer` transport:

```javascript
'use strict'
const smtpConfig = '';

module.exports = function(nodemailer) {
  return nodemailer.createTransport(smtpConfig)
}
```

Lot of options are available to configure SMTP, best is to checkout the [nodemailer docs](https://github.com/nodemailer/nodemailer#set-up-smtp)!
