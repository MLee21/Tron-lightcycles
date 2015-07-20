const chai = require('chai');
const expect = chai.expect;
const Canvas = require('../lib/light_cycles.js')

describe('my test suite', function () {
  it('should work', function () {
    expect(true);
  });
});

describe('Canvas object exists', function () {
  it('exists', function () {
    expect(new Canvas());
  });

});