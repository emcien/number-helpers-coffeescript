describe("Number To Phone", function() {
  it('7 digits', function() {
    var out = NumberHelpers.number_to_phone(5551234);
    expect(out).toBe('555-1234');
  });
  it('10 digits', function() {
    var out = NumberHelpers.number_to_phone(1235551234);
    expect(out).toBe('123-555-1234');
  });
  it('Area Code', function() {
    var out = NumberHelpers.number_to_phone(1235551234, {area_code: true});
    expect(out).toBe('(123) 555-1234');
  });
  it('Delimiter', function() {
    var out = NumberHelpers.number_to_phone(1235551234, {delimiter: ' '});
    expect(out).toBe('123 555 1234');
  });
  it('Extension', function() {
    var out = NumberHelpers.number_to_phone(1235551234, {area_code: true, extension: 555});
    expect(out).toBe('(123) 555-1234 x 555');
  });
  it('Country Code', function() {
    var out = NumberHelpers.number_to_phone(1235551234, {country_code: 1});
    expect(out).toBe('+1-123-555-1234');
  });
  it('NaN', function() {
    var out = NumberHelpers.number_to_phone('123a456');
    expect(out).toBe('123a456');
  });
  it('Complex: +1.123.555.1234 x 1343', function() {
    var out = NumberHelpers.number_to_phone(1235551234, {country_code: 1, extension: 1343, delimiter: '.'});
    expect(out).toBe('+1.123.555.1234 x 1343');
  });
});
