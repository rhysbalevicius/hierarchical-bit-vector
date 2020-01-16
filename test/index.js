const expect = require('chai').expect;
const hbv = require('../index.js');
const HierarchicalBitVector = require('../browser/hbv.js');

const getBitSet = hbv => Array.apply(null, Array(8)).map((i,j) => hbv.contains(j));
const getSuccSet = hbv => Array.apply(null, Array(8)).map((i,j) => hbv.succ(j));

describe('HBV :: C++ implementation', function(){
  // const getBitSet = hbv => Array.apply(null, Array(8)).map((i,j) => hbv.contains(j));
  // const getSuccSet = hbv => Array.apply(null, Array(8)).map((i,j) => hbv.succ(j));

  it('contains(): empty set', function() {
    const set = new hbv.create(4);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal(Array(8).fill(0));
  });

  it('insert(): non-extant member inserts', function() {
    const set = new hbv.create(4);
    set.insert(2);
    set.insert(3);
    set.insert(6);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 1, 0, 0, 1, 0 ] );
  });

  it('insert(): extant member inserts', function() {
    const set = new hbv.create(4);
    set.insert(2);
    set.insert(2);
    set.insert(2);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 0, 0, 0, 0, 0 ] );
  });

  it('delete(): non-extant member deletions', function() {
    const set = new hbv.create(4);
    set.delete(2);
    set.delete(3);
    set.delete(6);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('delete(): extant member deletions', function() {
    const set = new hbv.create(4);
    set.insert(2);
    set.delete(2);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('min(): empty set', function() {
    const set = new hbv.create(4);
    expect(set.min(0)).to.equal( -1 );
  });

  it('min(): non-empty set', function() {
    const set = new hbv.create(4);
    set.insert(1);
    set.insert(6);
    expect(set.min(0)).to.equal( 1 );
    expect(set.min(2)).to.equal( 6 );
  });

  it('succ(): empty set', function() {
    const set = new hbv.create(4);
    const bitSucc = getSuccSet(set);
    expect(bitSucc).to.deep.equal([ -1, -1, -1, -1, -1, -1, -1, -1 ]);
  });

  it('succ(): non-empty set', function() {
    const set = new hbv.create(4);
    set.insert(2);
    set.insert(6);
    const bitSucc = getSuccSet(set)
    expect(bitSucc).to.deep.equal([ 2, 2, 6, 6, 6, 6, -1, -1 ]);
  });

});


describe('HBV :: JavaScript implementation', function(){

  it('contains(): empty set', function() {
    const set = new HierarchicalBitVector(4);
    const bitset = getBitSet(set);
    expect(bitset).to.deep.equal(Array(8).fill(false));
  });

  it('insert(): non-extant member inserts', function() {
    const set = new HierarchicalBitVector(4);
    set.insert(2);
    set.insert(3);
    set.insert(6);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 1, 0, 0, 1, 0 ] );
  });

  it('insert(): extant member inserts', function() {
    const set = new HierarchicalBitVector(4);
    set.insert(2);
    set.insert(2);
    set.insert(2);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 0, 0, 0, 0, 0 ] );
  });

  it('inserts(): insert array of non-extant values', function() {
    const set = new HierarchicalBitVector(4);
    set.inserts([2,3,6]);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 1, 0, 0, 1, 0 ] );
  });

  it('inserts(): insert array of extant values', function() {
    const set = new HierarchicalBitVector(4);
    set.inserts([2,2,2]);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 1, 0, 0, 0, 0, 0 ] );
  });

  it('delete(): non-extant member deletions', function() {
    const set = new HierarchicalBitVector(4);
    set.delete(2);
    set.delete(3);
    set.delete(6);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('delete(): extant member deletions', function() {
    const set = new HierarchicalBitVector(4);
    set.insert(2);
    set.delete(2);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('deletes(): delete array of non-extant values', function() {
    const set = new HierarchicalBitVector(4);
    set.deletes([2,3,4]);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('deletes(): delete array of extant values', function() {
    const set = new HierarchicalBitVector(4);
    set.inserts([2,3,4]);
    set.deletes([2,3,4]);
    const bitset = getBitSet(set).map(bool => bool ? 1 : 0);
    expect(bitset).to.deep.equal( [ 0, 0, 0, 0, 0, 0, 0, 0 ] );
  });

  it('min(): empty set', function() {
    const set = new HierarchicalBitVector(4);
    expect(set.min(0)).to.equal( -1 );
  });

  it('min(): non-empty set', function() {
    const set = new HierarchicalBitVector(4);
    set.insert(1);
    set.insert(6);
    expect(set.min(0)).to.equal( 1 );
    expect(set.min(2)).to.equal( 6 );
  });

  it('succ(): empty set', function() {
    const set = new HierarchicalBitVector(4);
    const bitSucc = getSuccSet(set);
    expect(bitSucc).to.deep.equal([ -1, -1, -1, -1, -1, -1, -1, -1 ]);
  });

  it('succ(): non-empty set', function() {
    const set = new HierarchicalBitVector(4);
    set.insert(2);
    set.insert(6);
    const bitSucc = getSuccSet(set)
    expect(bitSucc).to.deep.equal([ 2, 2, 6, 6, 6, 6, -1, -1 ]);
  });

});
