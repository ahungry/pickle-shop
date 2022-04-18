const p = require('process')

const { BeforeAll, AfterAll, setWorldConstructor } = require('cucumber')
const fs = require('fs')
const createTestCafe = require('testcafe')
const testControllerHolder = require('../support/testControllerHolder')

console.log(testControllerHolder.get)
console.log('HERE is the tch')

console.log('Loading the hooks wrapper...')

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

function CustomWorld () {
  this.worldName = 'My World'
  this.waitForTestController = testControllerHolder.get
}

setWorldConstructor(CustomWorld)

BeforeAll(function (callback) {
  createTestFile()
  runTest()
  setTimeout(callback, DELAY)
})

AfterAll(function (callback) {
  testControllerHolder.free()
  fs.unlinkSync('test.js')
  setTimeout(callback, DELAY)
  setTimeout(() => p.exit(), DELAY * 2)
})
