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
  it('Rounding Up', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506);
    expect(out).toBe('$1,234,567,890.51');
  });
  it('Precision 0', function() {
    var out = NumberHelpers.number_to_currency(1234567890.506, {precision: 0});
    expect(out).toBe('$1,234,567,890');
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
  
});
