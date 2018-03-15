import { expect } from 'chai'
import { Given, When, Then } from 'cucumber'
var Selector = require('testcafe').Selector
const testControllerHolder = require('../support/testControllerHolder')

var testController: any = null

Given('I am open Ahungry\'s search page', function () {
  console.log(`My world is: ${this.worldName}`)

  return this.waitForTestController()
    .then(function (tc: any) {
      testController = tc

      return testController.navigateTo('http://ahungry.com')
    })
})

When('I am sitting there doing nothing', async () => {
  return
})

Then('I should run an assertion that will surely fail.', async () => {
  expect(true).to.be.false
})
