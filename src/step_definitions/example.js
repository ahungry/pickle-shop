const { expect } = require('chai')
const { Given, When, Then } = require('@cucumber/cucumber')
const Selector = require('testcafe').Selector

Given('I go to example.com', async function () {
  const page = this.getPage('ExampleHome')

  await page.visit()
})

When('I am sitting there doing nothing', async function () {
  return
})

Then('I should see the header {string}', async function (header) {
  const page = this.getPage('ExampleHome')
  const text = await page.getHeader()

  expect(text).to.equal(header)
})
