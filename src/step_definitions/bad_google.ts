import { Given, When, Then } from 'cucumber'
var Selector = require('testcafe').Selector
const testControllerHolder = require('../support/testControllerHolder')

var testController = null

When('I am poorly typing my search request {string} on Google', function (text) {
  var input = Selector('#some-fake-div').with({ boundTestRun: testController })

  return testController.typeText(input, text)
})
