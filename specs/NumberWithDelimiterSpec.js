describe('Number With Delimiter', function() {
  it('Numeric Type Value', function() {
    var out = NumberHelpers.number_with_delimiter(12345678);
    expect(out).toBe('12,345,678');
  });
  it('String Type Value', function() {
    var out = NumberHelpers.number_with_delimiter('123456');
    expect(out).toBe('123,456');
  });
  it('Decimal Value', function() {
    var out = NumberHelpers.number_with_delimiter(12345678.05);
    expect(out).toBe('12,345,678.05');
  });
  it('Delimiter As Period', function() {
    var out = NumberHelpers.number_with_delimiter(12345678, {delimiter:'.'});
    expect(out).toBe('12.345.678');
  });
  it('Delimiter As Comma', function() {
    var out = NumberHelpers.number_with_delimiter(12345678, {delimiter:','});
    expect(out).toBe('12,345,678');
  });
  it('Seperatar as Space', function() {
    var out = NumberHelpers.number_with_delimiter(12345678.05, {separator:' '});
    expect(out).toBe('12,345,678 05');
  });
  it('Non-numeric Value', function() {
    var out = NumberHelpers.number_with_delimiter('112a');
    expect(out).toBe('112a');
  });
  it('Delimiter and Separator Combination', function() {
    var out = NumberHelpers.number_with_delimiter(98765432.98, {delimiter:' ',separator:','});
    expect(out).toBe('98 765 432,98');
  });
});