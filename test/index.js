const chai = require('chai');
const expect = chai.expect;
const Cycle = require('../lib/cycle.js')

describe('my test suite', function () {
  it('should work', function () {
    expect(true);
  });
});

describe('Cycle', function () {

  it('has a color property', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("color");
    expect(cycle.color).to.eql("yellow");
  });

  it('has an x coordinate', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("x");
    expect(cycle.x).to.eql(50);
  });

  it('has a y coordinate', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("y");
    expect(cycle.y).to.eql(220);
  });

  it('has a width property', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("width");
    expect(cycle.width).to.eql(10);
  });

  it('has a height property', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("height");
    expect(cycle.height).to.eql(10);
  });

  it('has a speed property', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle).to.have.property("speed");
    expect(cycle.speed).to.eql(3);
  });

  it('has a prototype called move', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle.move).to.exist
  });

  it('has a prototype called draw', function () {
    var cycle = new Cycle(50, 220, 10, 10, "yellow", 3);
    expect(cycle.draw).to.exist
  });

});

