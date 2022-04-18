const { expect } = require('chai')
const { Given, When, Then } = require('cucumber')
const Selector = require('testcafe').Selector
const testControllerHolder = require('../support/testControllerHolder')

Given('I go to example.com', async function () {
  console.log('do some testing')
  await this.testcafe.navigateTo('http://example.com')
})

When('I am sitting there doing nothing', async function () {
  return
})

Then('I should see the header {string}', async function (header) {
  const text = await Selector('div > h1').with({ boundTestRun: this.testcafe }).innerText

  expect(text).to.equal(header)
})
