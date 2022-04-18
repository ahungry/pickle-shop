// NOTE: Do not touch this file as part of general automation - it's a set up
// once type file, for glueing together testcafe/cucumber.
const p = require('process')

const { BeforeAll, AfterAll, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber')
const fs = require('fs')
const createTestCafe = require('testcafe')
const testControllerHolder = require('../support/testControllerHolder')

setDefaultTimeout(1000 * 20)

var testcafe = null
var DELAY = 1000
function createTestFile () {
  fs.writeFileSync('test.js',
    'import testControllerHolder from "./src/support/testControllerHolder"\n\n' +

    'fixture("fixture")\n' +

    'test("test", testControllerHolder.capture)')
}

function runTest () {
  var runner = null

  createTestCafe('localhost', 1337, 1338)
    .then(function (tc) {
      testcafe = tc
      runner = tc.createRunner()

      return runner
        .src('./test.js')
        .browsers('firefox')
        .run()
        .catch(function (error) {
          console.log('Runner error count was: ', error)
        })
    })
    .then(function (report) {
      console.log('Report data was: ', report)
    })
}

let engine

function CustomWorld () {
  this.worldName = 'My World'
  this.testcafe = engine
  this.getPage = name => {
    return new (require('../models/' + name))(this.testcafe)
  }
}

setWorldConstructor(CustomWorld)

BeforeAll(function (callback) {
  createTestFile()
  runTest()
  console.log('Initializing test runner "testcafe"')
  testControllerHolder.get()
    .then(tch => {
      console.log('Beginning tests...')
      engine = tch
      setTimeout(callback, DELAY)
    })
})

AfterAll(function (callback) {
  testControllerHolder.free()
  fs.unlinkSync('test.js')
  setTimeout(callback, DELAY)
  setTimeout(() => p.exit(), DELAY * 2)
})

module.exports = { engine }
