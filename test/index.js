const expect = require('chai').expect;
const hbv = require('../index.js');

describe('HBitVector', function(){
  const vector = new hbv.create(4);
  const getBitset = hbv => Array.apply(null, Array(8)).map((i,j) => hbv.contains(j));

  it('contains()', function() {
    const set = getBitset(vector);
    expect(set).to.deep.equal(Array(8).fill(0));
  });

  it('insert()', function() {
    vector.insert(2);
    vector.insert(3);
    vector.insert(6);
    const set = getBitset(vector);
    expect(set).to.deep.equal( [ 0, 0, 1, 1, 0, 0, 1, 0 ] );
  });

  it('delete()', function() {
    vector.delete(3);
    const set = getBitset(vector);
    expect(set).to.deep.equal( [ 0, 0, 1, 0, 0, 0, 1, 0 ] );
  });

  it('min()', function() {
    expect(vector.min(0)).to.equal( 2 );
    expect(vector.min(2)).to.equal( 6 );
  });

  it('succ()', function() {
    const bitSucc = Array.apply(null, Array(8)).map((i,j) => vector.succ(j))
    expect(bitSucc).to.deep.equal([ 2, 2, 6, 6, 6, 6, -1, -1 ]);
  });

});
