const fs = require('fs')
const path = require('path')
const spawn = require('cross-spawn')
const neutralInstall = require('../')

const { exec, isYarnInstalled, yarn, npm, inquirerList } = neutralInstall
const cwd = process.cwd()
const fixtureDir = path.resolve(cwd, 'test/fixture')
const testOpts = {
  pwd: fixtureDir
}

beforeAll(() => {
  process.chdir(fixtureDir)
})

afterAll(() => {
  spawn.sync('rm', ['-rf', 'node_modules', 'yarn*', 'package-lock.json'])
  process.chdir(cwd)
})

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
  expect(typeof yarn()).toBe('object')
})

test('exec-yarn-2', () => {
  expect(typeof yarn({ test: true })).toBe('object')
})

test('exec-npm', () => {
  expect(typeof npm()).toBe('object')
})

test('exec-main-1', () => {
  fs.writeFileSync('yarn.lock', '{}')
  expect(typeof neutralInstall(testOpts)).toBe('object')
  fs.unlinkSync('yarn.lock')
})

test('exec-main-2', () => {
  fs.writeFileSync('package-lock.json', '{}')
  expect(typeof neutralInstall(testOpts)).toBe('object')
  fs.unlinkSync('package-lock.json')
})

test('exec-main-3', () => {
  expect(typeof neutralInstall({ test: true, pwd: fixtureDir })).toBe('object')
})

