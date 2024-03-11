---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "interface-starts-with-i | Solhint"
---

# interface-starts-with-i
![Category Badge](https://img.shields.io/badge/-Style%20Guide%20Rules-informational)
![Default Severity Badge warning](https://img.shields.io/badge/Default%20Severity-warning-undefined)

## Description
Solidity Interfaces names should start with an `I`

## Options
This rule accepts a string option of rule severity. Must be one of "error", "warn", "off". Default to warning.

### Example Config
```json
{
  "rules": {
    "interface-starts-with-i": "warning"
  }
}
```


## Examples
### 👍 Examples of **correct** code for this rule

#### Interface name starts with I

```solidity
interface IFoo { function foo () external; }
```

### 👎 Examples of **incorrect** code for this rule

#### Interface name doesnt start with I

```solidity
interface Foo { function foo () external; }
```

## Version
This rule is introduced in the latest version.

## Resources
- [Rule source](https://github.com/protofire/solhint/tree/master/lib/rules/best-practises/interface-starts-with-i.js)
- [Document source](https://github.com/protofire/solhint/tree/master/docs/rules/best-practises/interface-starts-with-i.md)
- [Test cases](https://github.com/protofire/solhint/tree/master/test/rules/best-practises/interface-starts-with-i.js)
