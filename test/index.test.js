const fs = require('fs')
const neutralInstall = require('../')

const { exec, isYarnInstalled, yarn, npm, inquirerList } = neutralInstall

// ***************************************************
// TYPE
// ***************************************************
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
  expect(typeof yarn).toBe('function')
})

test('npm', () => {
  expect(typeof npm).toBe('function')
})

test('inquirerList', () => {
  expect(typeof inquirerList).toBe('object')
})

// ***************************************************
// EXECUTE
// ***************************************************
test('exec-exec', () => {
  expect(typeof exec('echo')).toBe('object')
})

test('exec-yarn-1', () => {
  expect(typeof yarn()).toBe('undefined')
})

test('exec-yarn-2', () => {
  expect(typeof yarn({ test: true })).toBe('object')
})

test('exec-npm', () => {
  expect(typeof npm()).toBe('object')
})

test('exec-main-1', () => {
  fs.writeFileSync(process.cwd() + '/yarn.lock', '')
  expect(typeof neutralInstall()).toBe('undefined')
  fs.unlinkSync(process.cwd() + '/yarn.lock')
})

test('exec-main-2', () => {
  fs.writeFileSync(process.cwd() + '/package-lock.json', '')
  expect(typeof neutralInstall()).toBe('object')
  fs.unlinkSync(process.cwd() + '/package-lock.json')
})

test('exec-main-3', () => {
  expect(typeof neutralInstall({ test: true })).toBe('object')
})

