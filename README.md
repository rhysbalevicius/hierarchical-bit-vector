# hierarchical-bit-vector

[![master branch tests](https://img.shields.io/travis/r-ba/hierarchical-bit-vector/master.svg?label=master%20branch)](https://travis-ci.com/r-ba/hierarchical-bit-vector)
[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg)](https://raw.githubusercontent.com/r-ba/hierarchical-bit-vector/master/LICENSE)

A hierarchical bit vector (HBV) C++ addon for node.js.

An HBV is a data structure for storing sets of integers where the largest possible element is known a priori. For sparse sets, eumerating the elements of an HBV is more performant than that of a standard bit vector.

For a more detailed look at HBVs, see the paper written by [Glenn & Blinkley](https://pdfs.semanticscholar.org/1137/5bc624d5b2a8cd5444e01dac8a836ed2ebde.pdf).

## Build instructions

Install dependencies and build the project with `npm run install`.

## Example usage

```js
const hierarchicalBitVector = require('./index.js');

// create a new HBV representing integers in the range [0 ... (2^30 - 1)]
const set = new hierarchicalBitVector.create();

// adding elements to the set
set.insert(561);
set.insert(1105);
set.insert(1729);

// removing an element from the set
set.delete(561);

// check if an element exists within the set
console.log( set.contains(42) );   // -> 0
console.log( set.contains(561) );  // -> 0
console.log( set.contains(1105) ); // -> 1

// find the minimal element in the set, if it exists
console.log( set.min() ); // -> 1105

// given n, find the minimal x > n in the set, if it exists
console.log( set.succ(0) );     // -> 1105
console.log( set.succ(1105) );  // -> 1729
console.log( set.succ(1729) );  // -> -1
```
