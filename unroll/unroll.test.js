const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("unrolls a square array in spiral order", function () {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];
    const expected = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10];
    expect(unroll(square)).toEqual(expected);
  });

});
