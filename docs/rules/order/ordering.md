---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "ordering | Solhint"
---

# ordering
![Category Badge](https://img.shields.io/badge/-Style%20Guide%20Rules-informational)
![Default Severity Badge warn](https://img.shields.io/badge/Default%20Severity-warn-yellow)

## Description
Check order of elements in file and inside each contract, according to the style guide

## Options
This rule accepts a string option of rule severity. Must be one of "error", "warn", "off". Default to warn.

### Example Config
```json
{
  "rules": {
    "ordering": "warn"
  }
}
```


## Examples
### 👍 Examples of **correct** code for this rule

#### All units are in order

```solidity

pragma solidity ^0.6.0;

import "./some/library.sol";
import "./some/other-library.sol";

enum MyEnum {
  Foo,
  Bar
}

struct MyStruct {
  uint x;
  uint y;
}

interface IBox {
  function getValue() public;
  function setValue(uint) public;
}

library MyLibrary {
  function add(uint a, uint b, uint c) public returns (uint) {
    return a + b + c;
  }
}

contract MyContract {
  struct InnerStruct {
    bool flag;
  }

  enum InnerEnum {
    A, B, C
  }

  uint public x;
  uint public y;

  event MyEvent(address a);

  constructor () public {}

  fallback () external {}

  function myExternalFunction() external {}
  function myExternalConstFunction() external const {}
  function myPublicFunction() public {}
  function myPublicConstFunction() public const {}
  function myInternalFunction() internal {}
  function myPrivateFunction() private {}
}

```

### 👎 Examples of **incorrect** code for this rule

#### State variable declaration after function

```solidity

  contract MyContract {
    function foo() public {}

    uint a;
  }

```

#### Library after contract

```solidity

  contract MyContract {}

  library MyLibrary {}

```

#### Interface after library

```solidity

  library MyLibrary {}

  interface MyInterface {}

```

## Version
This rule was introduced in [Solhint 3.2.0](https://github.com/protofire/solhint/tree/v3.2.0)

## Resources
- [Rule source](https://github.com/protofire/solhint/tree/master/lib/rules/order/ordering.js)
- [Document source](https://github.com/protofire/solhint/tree/master/docs/rules/order/ordering.md)
- [Test cases](https://github.com/protofire/solhint/tree/master/test/rules/order/ordering.js)
