const Selector = require('testcafe').Selector
const { engine } = require('../step_definitions/hooks')

class ExampleHome {
  selectors = {
    mainHeader: 'div > h1',
  }

  constructor (engine) {
    this.engine = engine
  }

  async visit () {
    return this.engine.navigateTo('http://example.com')
  }

  async getHeader () {
    return Selector(this.selectors.mainHeader).with({ boundTestRun: this.engine }).innerText
  }
}

module.exports = ExampleHome
