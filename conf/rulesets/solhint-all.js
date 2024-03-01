/*
 * WARNING: This file is autogenerated using the scripts/generate-rulesets.js
 * script. Do not edit manually.
 */

module.exports = Object.freeze({
  rules: {
    'code-complexity': ['warn', 7],
    'custom-errors': 'warn',
    'explicit-types': ['warn', 'explicit'],
    'function-max-lines': ['warn', 50],
    'max-line-length': ['error', 120],
    'max-states-count': ['warn', 15],
    'no-console': 'error',
    'no-empty-blocks': 'warn',
    'no-global-import': 'warn',
    'no-unused-import': 'warn',
    'no-unused-vars': 'warn',
    'one-contract-per-file': 'warn',
    'payable-fallback': 'warn',
    'reason-string': [
      'warn',
      {
        maxLength: 32,
      },
    ],
    'constructor-syntax': 'warn',
    'gas-calldata-parameters': 'warn',
    'gas-increment-by-one': 'warn',
    'gas-indexed-events': 'warn',
    'gas-multitoken1155': 'warn',
    'gas-small-strings': 'warn',
    'gas-strict-inequalities': 'warn',
    'gas-struct-packing': 'warn',
    'comprehensive-interface': 'warn',
    quotes: ['error', 'double'],
    'const-name-snakecase': 'warn',
    'contract-name-camelcase': 'warn',
    'event-name-camelcase': 'warn',
    'foundry-test-functions': ['off', ['setUp']],
    'func-name-mixedcase': 'warn',
    'func-named-parameters': ['warn', 4],
    'func-param-name-mixedcase': 'warn',
    'immutable-vars-naming': [
      'warn',
      {
        immutablesAsConstants: true,
      },
    ],
    'modifier-name-mixedcase': 'warn',
    'named-parameters-mapping': 'off',
    'named-return-values': 'warn',
    'private-vars-leading-underscore': [
      'warn',
      {
        strict: false,
      },
    ],
    'use-forbidden-name': 'warn',
    'var-name-mixedcase': 'warn',
    'imports-on-top': 'warn',
    ordering: 'warn',
    'visibility-modifier-order': 'warn',
    'avoid-call-value': 'warn',
    'avoid-low-level-calls': 'warn',
    'avoid-sha3': 'warn',
    'avoid-suicide': 'warn',
    'avoid-throw': 'warn',
    'avoid-tx-origin': 'warn',
    'check-send-result': 'warn',
    'compiler-version': ['error', '^0.8.0'],
    'func-visibility': [
      'warn',
      {
        ignoreConstructors: false,
      },
    ],
    'multiple-sends': 'warn',
    'no-complex-fallback': 'warn',
    'no-inline-assembly': 'warn',
    'not-rely-on-block-hash': 'warn',
    'not-rely-on-time': 'warn',
    reentrancy: 'warn',
    'state-visibility': 'warn',
  },
})
