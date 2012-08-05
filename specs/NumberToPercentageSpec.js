// number_to_percentage("98")                                       # => 98.000%
// number_to_percentage(100, :precision => 0)                       # => 100%
// number_to_percentage(1000, :delimiter => '.', :separator => ',') # => 1.000,000%
// number_to_percentage(302.24398923423, :precision => 5)           # => 302.24399%
// number_to_percentage(1000, :locale => :fr)                       # => 1 000,000%
// number_to_percentage("98a")                                      # => 98a%

describe("Number To Percentage", function() {
  it('Defaults', function() {
    var out = NumberHelpers.number_to_percentage(100);
    expect(out).toBe('100.000%');
  });
});
