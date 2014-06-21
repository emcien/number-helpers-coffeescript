// Unsignificant zeros after the decimal separator are stripped out by default (set :strip_insignificant_zeros to false to change that):
// number_to_human(12345012345, :significant_digits => 6)       # => "12.345 Billion"

describe("Number To Human", function() {
  it('Hundreds', function() {
    var out = NumberHelpers.number_to_human(123);
    expect(out).toBe('123');
  });
  it('Thousands', function() {
    var out = NumberHelpers.number_to_human(1234);
    expect(out).toBe('1.23 Thousand');
  });
  it('Thousands', function() {
    var out = NumberHelpers.number_to_human(1234);
    expect(out).toBe('1.23 Thousand');
  });
  it('Ten Thousands', function() {
    var out = NumberHelpers.number_to_human(12345);
    expect(out).toBe('12.3 Thousand');
  });
  it('Million', function() {
    var out = NumberHelpers.number_to_human(1234567);
    expect(out).toBe('1.23 Million');
  });
  it('Billion', function() {
    var out = NumberHelpers.number_to_human(1234567890);
    expect(out).toBe('1.23 Billion');
  });
  it('Tillion', function() {
    var out = NumberHelpers.number_to_human(1234567890123);
    expect(out).toBe('1.23 Trillion');
  });
  it('Quadrillion', function() {
    var out = NumberHelpers.number_to_human(1234567890123456);
    expect(out).toBe('1.23 Quadrillion');
  });
  it('1230 Quadrillion', function() {
    var out = NumberHelpers.number_to_human(1234567890123456789);
    expect(out).toBe('1230 Quadrillion');
  }); 
  it('Precision 2', function() {
    var out = NumberHelpers.number_to_human(489939, {precision: 2});
    expect(out).toBe('490 Thousand');
  });
  it('Precision 4', function() {
    var out = NumberHelpers.number_to_human(489939, {precision: 4});
    expect(out).toBe('489.9 Thousand');
  });
  it('Precision 4, Significant false', function() {
    var out = NumberHelpers.number_to_human(1234567, {precision: 4, significant: false});
    expect(out).toBe('1.2346 Million');
  }); 
  it('Precision 1, Significant false, Seperator ,', function() {
    var out = NumberHelpers.number_to_human(1234567, {precision: 1, significant: false, separator: ','});
    expect(out).toBe('1,2 Million');
  }); 
  it('500 Million', function() {
    var out = NumberHelpers.number_to_human(500000000, {precision: 5, strip_insignificant_zeros: true});
    expect(out).toBe('500 Million');
  }); 
  it('500 Million', function() {
    var out = NumberHelpers.number_to_human(500000000, {precision: 5, strip_insignificant_zeros: true});
    expect(out).toBe('500 Million');
  });
  it('Custom labels: K', function() {
    var out = NumberHelpers.number_to_human(1234, {space_label: false, labels:{thousand: 'K'}});
    expect(out).toBe('1.23K')
  });
  it('Custom labels: M', function() {
    var out = NumberHelpers.number_to_human(1234567, {labels:{million: 'M'}});
    expect(out).toBe('1.23 M')
  });
  it('Custom labels: B', function() {
    var out = NumberHelpers.number_to_human(1234567890, {space_label: false, labels:{billion: 'B'}});
    expect(out).toBe('1.23B')
  });
  it('Custom labels: T', function() {
    var out = NumberHelpers.number_to_human(1234567890123, {labels:{trillion: 'T'}});
    expect(out).toBe('1.23 T')
  });
  it('Custom labels: P', function() {
    var out = NumberHelpers.number_to_human(1234567890123456, {labels:{quadrillion: 'P'}});
    expect(out).toBe('1.23 P')
  });
  it('No label space', function() {
    var out = NumberHelpers.number_to_human(1234, {space_label: false});
    expect(out).toBe('1.23Thousand');
  });
});
