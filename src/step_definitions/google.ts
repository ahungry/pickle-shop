import { expect } from 'chai'

import { Given, When, Then } from 'cucumber'
var Selector = require('testcafe').Selector
const testControllerHolder = require('../support/testControllerHolder')

var testController: any = null

Given('I am open Google\'s search page', function () {
  console.log(`My world is: ${this.worldName}`)

  return this.waitForTestController()
    .then(function (tc: any) {
      testController = tc

      return testController.navigateTo('http://google.com')
    })
})

When('I am typing my search request {string} on Google', function (text) {
  var input = Selector('#lst-ib').with({ boundTestRun: testController })

  return testController.typeText(input, text)
})

Then('I am pressing {string} key on Google', function (text) {
  return testController.pressKey(text)
})

Then('I should see that the first Google\'s result is {string}', async (text) => {
  const firstLink = await Selector('#rso').find('a').with({ boundTestRun: testController })
  const found = await firstLink.innerText

  expect(found).to.match(new RegExp(text))
})
