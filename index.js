'use strict'

const fs = require('fs')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const YARN_LOCK = 'yarn.lock'
const NPM_LOCK = 'package-lock.json'
const PWD = process.cwd()

/**
 * Spawn synchronously
 * @param args
 * @returns {*}
 */
function exec(...args) {
  return spawn.sync(...args, { stdio: 'inherit' })
}

/**
 * Check yarn's install state
 * @returns {*}
 */
let yarnInstalled
function isYarnInstalled() {
  return yarnInstalled || (() => {
    const command = spawn.sync('yarn', ['--version'])
    const installed = command.stdout && command.stdout.toString().trim()
    yarnInstalled = installed
    return installed
  })()
}

const npm = ()=> exec('npm', ['install'])
const yarn = ()=> exec('yarn')

/**
 * Main
 * @returns {*}
 */
module.exports = () => {
  if (fs.existsSync(PWD + '/' + YARN_LOCK)) {
    console.log(`\n  Find ${chalk.cyan(YARN_LOCK)}`)

    if (!isYarnInstalled()) {
      console.log(`\n  This project recommends to install dependencies with ${chalk.redBright('yarn')}, please install it first.\n`)
      return
    }
    console.log(`\n  Run ${chalk.redBright('yarn')}`)
    return yarn()
  }

  if (fs.existsSync(PWD + '/' + NPM_LOCK)) {
    console.log(`\n Find ${chalk.cyan(NPM_LOCK)}, run ${chalk.redBright('<npm install>')}\n`)
    return npm()
  }

  console.log()
  inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: `Please choose an package manager:`,
    choices: ['yarn', 'npm']
  }])
    .then(({ choice }) => {
      if (choice === 'yarn') {
        if (!isYarnInstalled()) {
          console.log(`\n  Please visit ${chalk.underline(chalk.yellow('https://yarnpkg.com'))} to install ${chalk.redBright('yarn')} first. \n`)
          return
        }
        return yarn()
      }
      return npm()
    })
    .then(msg => {
      if (msg) {
        console.log(`  ${chalk.green('[OK]')} \n`)
      }
    })
}

module.exports.exec = exec
module.exports.isYarnInstalled = isYarnInstalled
