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
