// number_to_currency(-1234567890.50, :negative_format => "(%u%n)") # => ($1,234,567,890.50)
// number_to_currency(1234567890.50, :unit => "&pound;", :separator => ",", :delimiter => "", :format => "%n %u") # => 1234567890,50 &pound;

describe("Number To Currency", function() {
  it('Defaults', function() {
    var out = NumberHelpers.number_to_currency(1234567890.50);
    expect(out).toBe('$1,234,567,890.50');
  });
  it('String', function() {
    var out = NumberHelpers.number_to_currency('1234567890.50');
    expect(out).toBe('$1,234,567,890.50');
  });
  it('Negative number', function() {
    var out = NumberHelpers.number_to_currency(-2.99, {precision: 0});
    expect(out).toBe('-$3');
  });
  it('Negative number with precision rounding', function() {
    var out = NumberHelpers.number_to_currency(-2.999, {precision: 2});
    expect(out).toBe('-$3.00');
  });
  it('Negative number with precision', function() {
    var out = NumberHelpers.number_to_currency(-2.503, {precision: 2});
    expect(out).toBe('-$2.50');
  });
  it('Rounding Up', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506);
    expect(out).toBe('$1,234,567,890.51');
  });
  it('Simple rounding Up With 9s Precision 0', function() {
    var out = NumberHelpers.number_to_currency(2.99, {precision: 0});
    expect(out).toBe('$3');
  });
  it('Simple Precision 2 with 9s', function() {
    var out = NumberHelpers.number_to_currency(2.99, {precision: 2});
    expect(out).toBe('$2.99');
  });
  it('Rounding Up With 9s Precision 0', function() {
    var out = NumberHelpers.number_to_currency(1234567890.99, {precision: 0});
    expect(out).toBe('$1,234,567,891');
  });
  it('Rounding Up With 9s Precision 2', function() {
    var out = NumberHelpers.number_to_currency(1234567890.99, {precision: 2});
    expect(out).toBe('$1,234,567,890.99');
  });
  it('Precision 0', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506, {precision: 0});
    expect(out).toBe('$1,234,567,891');
  });
  it('Precision 1', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506, {precision: 1});
    expect(out).toBe('$1,234,567,890.5');
  });
  it('Precision 3', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506, {precision: 3});
    expect(out).toBe('$1,234,567,890.506');
  });
  it('Precision 4', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506, {precision: 4});
    expect(out).toBe('$1,234,567,890.5060');
  });
  it('String', function() {
    var out = NumberHelpers.number_to_currency('123a456');
    expect(out).toBe('$123a456');
  });
  it('Unit, Separator, Delimiter Combo', function() {
    var out = NumberHelpers.number_to_currency(1234567890.50, {unit:"&pound;", separator:",", delimiter:""});
    expect(out).toBe('&pound;1234567890,50');
  });
  it('allows "after" unit positioning', function() {
    var out = NumberHelpers.number_to_currency(123.507, {unit: " CZK", unit_position: "end", precision: 2});
    expect(out).toBe('123.51 CZK');
  });
});
