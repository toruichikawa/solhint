const assert = require('assert')
const linter = require('../../../lib/index')
const contractWith = require('../../common/contract-builder').contractWith
const correctExamples = require('../../fixtures/order/ordering-correct')
const incorrectExamples = require('../../fixtures/order/ordering-incorrect')

describe('Linter - ordering', () => {
  describe('correct examples', () => {
    correctExamples.forEach(({ code, description }) => {
      it(description, () => {
        const report = linter.processStr(code, {
          rules: { ordering: 'error' },
        })

        assert.equal(report.errorCount, 0)
      })
    })
  })

  describe('incorrect examples', () => {
    incorrectExamples.forEach(({ code, description }) => {
      it(description, () => {
        const report = linter.processStr(code, {
          rules: { ordering: 'error' },
        })

        assert.equal(report.errorCount, 1)
      })
    })
  })

  it('should raise incorrect function order error I', () => {
    const code = contractWith(`
                function b() private {}
                function () public payable {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should raise incorrect function order error for external constant funcs', () => {
    const code = contractWith(`
                function b() external pure {}
                function c() external {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should raise incorrect function order error for public constant funcs', () => {
    const code = contractWith(`
              function b() public pure {}
              function c() public {}
          `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should raise incorrect function order error for internal function', () => {
    const code = contractWith(`
                function c() internal {}
                function b() external view {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should raise incorrect function order error for fallback before receive', () => {
    const code = contractWith(`
                fallback() external payable  {}
                receive() external payable {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should not raise incorrect function order error', () => {
    const code = contractWith(`
                receive() external payable {}
                fallback() external payable  {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should not raise incorrect function order error', () => {
    const code = contractWith(`
                function A() public {}
                function () public payable {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should not raise incorrect function order error I', () => {
    const code = require('../../fixtures/order/func-order-constructor-first')

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should raise incorrect function order error', () => {
    const code = require('../../fixtures/order/func-order-constructor-not-first')

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })
    assert.equal(report.errorCount, 1)
    assert.ok(report.messages[0].message.includes('Function order is incorrect'))
  })

  it('should not raise error when external function goes before public ', () => {
    const code = contractWith(`
                function a() external view {}
                function b() public {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should raise an error when custom error is after external function', () => {
    const code = contractWith(`
                function a() external view {}
                error Unauthorized();
                function b() public {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(
      report.messages[0].message.includes(
        'Function order is incorrect, custom error definition can not go after external view function'
      )
    )
  })

  it('should raise an error when custom error is after public function', () => {
    const code = contractWith(`
                function b() public {}
                error Unauthorized();
                function a() external view {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(
      report.messages[0].message.includes(
        'Function order is incorrect, custom error definition can not go after public  function'
      )
    )
  })

  it('should raise an error when custom error is after constructor', () => {
    const code = contractWith(`
                constructor() {}
                error Unauthorized();
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(
      report.messages[0].message.includes(
        'Function order is incorrect, custom error definition can not go after constructor'
      )
    )
  })

  it('should raise an error when custom error is before event definition', () => {
    const code = contractWith(`
                error Unauthorized();
                event WithdrawRegistered(uint256 receiver);
                constructor() {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
    assert.ok(
      report.messages[0].message.includes(
        'Function order is incorrect, event definition can not go after custom error'
      )
    )
  })

  it('should not raise an error when custom error is well placed after event and before modifier', () => {
    const code = contractWith(`
                event WithdrawRegistered(uint256 receiver);
                error Unauthorized();
                modifier onlyOwner() {}
                constructor() {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should not raise an error when custom error is well placed after state variables and before constructor', () => {
    const code = contractWith(`
                uint256 public stateVariable;
                error Unauthorized();
                constructor() {}
            `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 0)
  })

  it('should raise error for enum after contract', () => {
    const code = `
      contract Foo {}

      enum MyEnum { A, B }
    `

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
  })

  it('should raise error for enum after function', () => {
    const code = contractWith(`
      function foo() public {}

      enum MyEnum { A, B }
    `)

    const report = linter.processStr(code, {
      rules: { ordering: 'error' },
    })

    assert.equal(report.errorCount, 1)
  })
})
