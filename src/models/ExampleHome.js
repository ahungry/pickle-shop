const Selector = require('testcafe').Selector
const { engine } = require('../step_definitions/hooks')

class ExampleHome {
  // The various page selectors, mapped as CSS selectors, or XPath (both valid)
  selectors = {
    mainHeader: 'div > h1',
  }

  constructor (engine) {
    this.engine = engine
  }

  // In general, 'return await' is an anti-pattern, but this is to show how it can be async/await.
  async visit () {
    return await this.engine.navigateTo('http://example.com')
  }

  async getHeader () {
    // The bound test segment on the Selector is a requirement for using it with testcafe like this.
    // it makes it look more complex than it actually is.
    const element = await Selector(this.selectors.mainHeader).with({ boundTestRun: this.engine })

    // Just like an HTML DOM Element, we can access the text property.
    return element.innerText
  }
}

module.exports = ExampleHome
