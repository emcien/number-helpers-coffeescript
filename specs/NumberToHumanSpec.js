// number_to_human(123)                                          # => "123"
// number_to_human(1234)                                         # => "1.23 Thousand"
// number_to_human(12345)                                        # => "12.3 Thousand"
// number_to_human(1234567)                                      # => "1.23 Million"
// number_to_human(1234567890)                                   # => "1.23 Billion"
// number_to_human(1234567890123)                                # => "1.23 Trillion"
// number_to_human(1234567890123456)                             # => "1.23 Quadrillion"
// number_to_human(1234567890123456789)                          # => "1230 Quadrillion"
// number_to_human(489939, :precision => 2)                      # => "490 Thousand"
// number_to_human(489939, :precision => 4)                      # => "489.9 Thousand"
// number_to_human(1234567, :precision => 4,
//                          :significant => false)               # => "1.2346 Million"
// number_to_human(1234567, :precision => 1,
//                          :separator => ',',
//                          :significant => false)               # => "1,2 Million"
// Unsignificant zeros after the decimal separator are stripped out by default (set :strip_insignificant_zeros to false to change that):
// number_to_human(12345012345, :significant_digits => 6)       # => "12.345 Billion"
// number_to_human(500000000, :precision => 5)                  # => "500 Million"

describe("Number To Human", function() {
  // it('Defaults', function() {
  //   var out = NumberHelpers.number_to_human(123);
  //   expect(out).toBe('123');
  // });
});
