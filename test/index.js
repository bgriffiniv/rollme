'use strict';

module.exports = {
  service: require('./service'),
};

const assert = require('assert').strict;

describe('tests', () => {
  it('should be possible', () => {
    console.log('Hello world!');
    assert.equal(true, true);
  });
});
