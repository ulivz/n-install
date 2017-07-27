#!/usr/bin/env node
'use strict'
const cac = require('cac')
const main = require('./')

const cli = cac()

cli.command('*', {
  desc: 'Install your node packages by NPM or yarn'
}, (input, flags) => {
  main(input, flags)
})

cli.parse()
