const _ = require('lodash')
const BaseChecker = require('./../base-checker')

const DEFAULT_MAX_CHARACTERS_LONG = 32

const ruleId = 'reason-string'
const meta = {
  type: 'best-practises',

  docs: {
    description:
      'Require or revert statement must have a reason string and check that each reason string is at most N characters long.',
    category: 'Best Practise Rules'
  },

  isDefault: false,
  recommended: false,
  defaultSetup: ['warn', { maxLength: DEFAULT_MAX_CHARACTERS_LONG }],

  schema: [
    {
      type: 'array',
      items: [
        {
          properties: {
            maxLength: {
              type: 'integer'
            }
          },
          additionalProperties: false
        }
      ],
      uniqueItems: true,
      minItems: 2
    }
  ]
}

class ReasonStringChecker extends BaseChecker {
  constructor(reporter, config) {
    super(reporter, ruleId, meta)

    this.maxCharactersLong =
      (config &&
        config.getObjectPropertyNumber(ruleId, 'maxLength', DEFAULT_MAX_CHARACTERS_LONG)) ||
      DEFAULT_MAX_CHARACTERS_LONG
  }

  enterFunctionCallArguments(ctx) {
    if (this.isReasonStringStatement(ctx)) {
      const functionParameters = this.getFunctionParameters(ctx)
      const functionName = this.getFunctionName(ctx)

      // Throw an error if have no message
      if (functionParameters.length <= 1) {
        this._errorHaveNoMessage(ctx, functionName)
        return
      }

      const lastFunctionParameter = _.last(functionParameters)
      const hasReasonMessage = this.hasReasonMessage(lastFunctionParameter)

      // If has reason message and is too long, throw an error
      if (hasReasonMessage) {
        const lastParameterWithoutQuotes = lastFunctionParameter.replace(/['"]+/g, '')
        if (lastParameterWithoutQuotes.length > this.maxCharactersLong) {
          this._errorMessageIsTooLong(ctx, functionName)
        }
      }
    }
  }

  isReasonStringStatement(ctx) {
    const name = this.getFunctionName(ctx)
    return name === 'revert' || name === 'require'
  }

  getFunctionName(ctx) {
    const parent = ctx.parentCtx
    const name = parent.children[0]
    return name.getText()
  }

  getFunctionParameters(ctx) {
    const parent = ctx.parentCtx
    const nodes = parent.children[2]
    const children = nodes.children[0].children
    const parameters = children
      .filter(value => value.getText() !== ',')
      .map(value => value.getText())
    return parameters
  }

  hasReasonMessage(str) {
    return str.indexOf("'") >= 0 || str.indexOf('"') >= 0
  }

  _errorHaveNoMessage(ctx, key) {
    this.error(ctx, `Provide an error message for ${key}`)
  }

  _errorMessageIsTooLong(ctx, key) {
    this.error(ctx, `Error message for ${key} is too long`)
  }
}

module.exports = ReasonStringChecker
