describe("Precision Parameter", function() {
  it("Default Precision", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:0});
    expect(out).toBe('$23');
  });
  it("Precision: 0", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:0});
    expect(out).toBe('$23');
  });
  it("Precision: 1", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:1});
    expect(out).toBe('$23.2');
  });
  it("Precision: 2", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:2});
    expect(out).toBe('$23.24');
  });
  it("Precision: 3", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:3});
    expect(out).toBe('$23.242');
  });
  it("Precision: 4", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{precision:4});
    expect(out).toBe('$23.2423');
  });
});
describe("Unit Parameter", function() {
  it("Default Unit", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234);
    expect(out).toBe('$23.24');
  });
  it("Unit £", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{unit:'£'});
    expect(out).toBe('£23.24');
  });
  it("Unit ¥", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{unit:'¥'});
    expect(out).toBe('¥23.24');
  });
  it("Unit €", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{unit:'€'});
    expect(out).toBe('€23.24');
  });
  it("Unit 2", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{unit:'2'});
    expect(out).toBe('223.24');
  });
});
describe("Separator Parameter", function() {
  it("Default", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234);
    expect(out).toBe('$23.24');
  });
  it("Separator ,", function() {
    var out = NumberHelpers.number_to_currency(23.24234234234234,{separator:','});
    expect(out).toBe('$23,24');
  });
});
