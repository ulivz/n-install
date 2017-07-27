const fs = require('fs')
const neutralInstall = require('../')

const { exec, isYarnInstalled } = neutralInstall

test('main', () => {
  expect(typeof neutralInstall).toBe('function')
})

test('exec', () => {
  expect(typeof exec).toBe('function')
})

test('isYarnInstalled', () => {
  expect(typeof isYarnInstalled).toBe('function')
})

test('yarn', () => {
  fs.writeFileSync(process.cwd() + '/yarn.lock', '')
  expect(typeof neutralInstall()).toBe('undefined')
  fs.unlinkSync(process.cwd() + '/yarn.lock')
})

test('npm', () => {
  fs.writeFileSync(process.cwd() + '/package-lock.json', '')
  expect(typeof neutralInstall()).toBe('object')
  fs.unlinkSync(process.cwd() + '/package-lock.json')
})

test('null', () => {
  expect(typeof neutralInstall()).toBe('undefined')
})
