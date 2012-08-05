describe("Number To Human Size", function() {
  it('Bytes', function() {
    var out = NumberHelpers.number_to_human_size(123);
    expect(out).toBe('123 Bytes');
  });
  it('1.21 KB', function() {
    var out = NumberHelpers.number_to_human_size(1234);
    expect(out).toBe('1.21 KB');
  });
  it('12.1 KB', function() {
    var out = NumberHelpers.number_to_human_size(12345);
    expect(out).toBe('12.1 KB');
  });
  it('1.18 MB', function() {
    var out = NumberHelpers.number_to_human_size(1234567);
    expect(out).toBe('1.18 MB');
  });
  it('1.15 GB', function() {
    var out = NumberHelpers.number_to_human_size(1234567890);
    expect(out).toBe('1.15 GB');
  });
  it('1.12 TB', function() {
    var out = NumberHelpers.number_to_human_size(1234567890123);
    expect(out).toBe('1.12 TB');
  });
  it('1.2 MB, Precision 2', function() {
    var out = NumberHelpers.number_to_human_size(1234567, {precision: 2});
    expect(out).toBe('1.2 MB');
  });
  it('470 KB, Precision 2', function() {
    var out = NumberHelpers.number_to_human_size(483989, {precision: 2});
    expect(out).toBe('470 KB');
  });
  it('1,2 MB, Precision 2, Separator ,', function() {
    var out = NumberHelpers.number_to_human_size(1234567, {precision: 2, separator: ','});
    expect(out).toBe('1,2 MB');
  });
  it('Precision 5', function() {
    var out = NumberHelpers.number_to_human_size(1234567890123, {precision: 5});
    expect(out).toBe('1.1228 TB');
  });
  it('500 MB, Precision 5', function() {
    var out = NumberHelpers.number_to_human_size(524288000, {precision: 5, strip_insignificant_zeros: true});
    expect(out).toBe('500 MB');
  });
});
