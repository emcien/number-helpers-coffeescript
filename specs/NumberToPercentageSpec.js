describe("Number To Percentage", function() {
  it('Defaults', function() {
    var out = NumberHelpers.number_to_percentage(100);
    expect(out).toBe('100.000%');
  });
  
  it('Two Digit Default', function() {
    var out = NumberHelpers.number_to_percentage(98);
    expect(out).toBe('98.000%');
  });
  
  it('With Percision', function() {
    var out = NumberHelpers.number_to_percentage(100, {precision: 0});
    expect(out).toBe('100%');
  });
  
  it('Separator and Delimiter', function() {
    var out = NumberHelpers.number_to_percentage(1000, {delimiter: '.', separator: ','});
    expect(out).toBe('1.000,000%');
  });
  
  it('Precision', function() {
    var out = NumberHelpers.number_to_percentage(302.24398923423, {precision: 5});
    expect(out).toBe('302.24399%');
  });
  
  it('Non Digit', function() {
    var out = NumberHelpers.number_to_percentage('98a');
    expect(out).toBe('98a%');
  });
});
