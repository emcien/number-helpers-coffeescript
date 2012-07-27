// number_to_human_size(12345)                                        # => 12.1 KB
// number_to_human_size(1234567)                                      # => 1.18 MB
// number_to_human_size(1234567890)                                   # => 1.15 GB
// number_to_human_size(1234567890123)                                # => 1.12 TB
// number_to_human_size(1234567, :precision => 2)                     # => 1.2 MB
// number_to_human_size(483989, :precision => 2)                      # => 470 KB
// number_to_human_size(1234567, :precision => 2, :separator => ',')  # => 1,2 MB
// number_to_human_size(1234567890123, :precision => 5)        # => "1.1229 TB"
// number_to_human_size(524288000, :precision => 5)            # => "500 MB"

describe("Number To Human Size", function() {
  it('Bytes', function() {
    var out = NumberHelpers.number_to_human_size(123);
    expect(out).toBe('123 Bytes');
  });
  it('1.21 KB', function() {
    var out = NumberHelpers.number_to_human_size(1234);
    expect(out).toBe('1.21 KB');
  });
  
});
