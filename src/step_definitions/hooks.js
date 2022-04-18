const p = require('process')

const { BeforeAll, AfterAll, setWorldConstructor, setDefaultTimeout } = require('cucumber')
const fs = require('fs')
const createTestCafe = require('testcafe')
const testControllerHolder = require('../support/testControllerHolder')

setDefaultTimeout(1000 * 20)

var testcafe = null
var DELAY = 5000
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
  this.waitForTestController = testControllerHolder.get
  this.testcafe = engine
}

setWorldConstructor(CustomWorld)

BeforeAll(function (callback) {
  createTestFile()
  runTest()
  console.log('here I am in the beforeAll')
  testControllerHolder.get()
    .then(tch => {
      console.log('got the engine...')
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
