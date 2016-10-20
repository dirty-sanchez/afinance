"use strict";
var assert = require('assert');

describe('FitlerService', () => {

  describe('#makeFilter', () => {
    it('should return filter with defaults if no input presented', () => {
      var actual = FilterService.makeFilter({});
      var now = new Date();
      var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      assert.equal('day', actual.groupBy);
      assert.equal(new Date(now.getFullYear(), now.getMonth()).getTime(), actual.dateFrom.getTime(), 'dateFrom is on the beginig of the current month');
      assert.equal(tomorrow.getTime(), actual.dateTo.getTime(), 'dateTo is on the tomorrow');
    });
  });

});