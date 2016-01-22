// These tests were converted from Rails tests. Higher precision tests were ommitted as they are currently not supported in JavaScript

describe("NumberToRounded", function() {
  it("should reconstitute exponentials", function() {
    var num = 34534534;
    var exps = num.toExponential().split('e');
    expect(NumberHelpers.reconstitute_exponential(exps[0],exps[1])).toEqual(num+"");
    expect(NumberHelpers.reconstitute_exponential(num.toExponential())).toEqual(num+"");
    num = 0.000034544;
    expect(NumberHelpers.reconstitute_exponential(num.toExponential())).toEqual(num+"");
    num = 988.45
    expect(NumberHelpers.reconstitute_exponential(num.toExponential())).toEqual(num+"");
    num = 9080943000
    expect(NumberHelpers.reconstitute_exponential(num.toExponential())).toEqual(num+"");
  });
  it("to_rounded", function() {
      expect(NumberHelpers.number_to_rounded(-111.2346  )).toEqual("-111.235");
      expect(NumberHelpers.number_to_rounded(111.2346  )).toEqual("111.235");
      expect(NumberHelpers.number_to_rounded(31.825 , { precision : 2 } )).toEqual("31.83");
      expect(NumberHelpers.number_to_rounded(111.2346 , { precision : 2 } )).toEqual("111.23");
      expect(NumberHelpers.number_to_rounded(111 , { precision : 2 } )).toEqual("111.00");
      expect(NumberHelpers.number_to_rounded("111.2346"  )).toEqual("111.235");
      expect(NumberHelpers.number_to_rounded("31.825" , { precision : 2 } )).toEqual("31.83");
      expect(NumberHelpers.number_to_rounded(32.6751 * 100.00, {precision: 0}  )).toEqual("3268");
      expect(NumberHelpers.number_to_rounded(111.50 , { precision : 0 } )).toEqual("112");
      expect(NumberHelpers.number_to_rounded(1234567891.50 , { precision : 0 } )).toEqual("1234567892");
      expect(NumberHelpers.number_to_rounded(0 , { precision : 0 } )).toEqual("0");
      expect(NumberHelpers.number_to_rounded(0.001 , { precision : 5 } )).toEqual("0.00100");
      expect(NumberHelpers.number_to_rounded(0.00111 , { precision : 3 } )).toEqual("0.001");
      expect(NumberHelpers.number_to_rounded(9.995 , { precision : 2 } )).toEqual("10.00");
      expect(NumberHelpers.number_to_rounded(10.995 , { precision : 2 } )).toEqual("11.00");
      expect(NumberHelpers.number_to_rounded(-0.001 , { precision : 2 } )).toEqual("0.00");
      
  });
  it("to_rounded_with_custom_delimiter_and_separator", function() {
      expect(NumberHelpers.number_to_rounded(31.825 , { precision : 2, separator : ',' } )).toEqual( '31,83');
      expect(NumberHelpers.number_to_rounded(1231.825 , { precision : 2, separator : ',', delimiter : '.' } )).toEqual('1.231,83');
  });
  it("to_rounded_with_significant_digits", function() {
      expect(NumberHelpers.number_to_rounded(123987 , { precision : 3, significant : true } )).toEqual("124000");
      expect(NumberHelpers.number_to_rounded(123987876 , { precision : 2, significant : true  } )).toEqual("120000000");
      expect(NumberHelpers.number_to_rounded("43523" , { precision : 1, significant : true  } )).toEqual("40000");
      expect(NumberHelpers.number_to_rounded(9775 , { precision : 4, significant : true  } )).toEqual("9775");
      expect(NumberHelpers.number_to_rounded(5.3923 , { precision : 2, significant : true  } )).toEqual("5.4");
      expect(NumberHelpers.number_to_rounded(5.3923 , { precision : 1, significant : true  } )).toEqual("5");
      expect(NumberHelpers.number_to_rounded(1.232 , { precision : 1, significant : true  } )).toEqual("1");
      expect(NumberHelpers.number_to_rounded(7 , { precision : 1, significant : true  } )).toEqual("7");
      expect(NumberHelpers.number_to_rounded(1 , { precision : 1, significant : true  } )).toEqual("1");
      expect(NumberHelpers.number_to_rounded(52.7923 , { precision : 2, significant : true  } )).toEqual("53");
      expect(NumberHelpers.number_to_rounded(9775 , { precision : 6, significant : true  } )).toEqual("9775.00");
      expect(NumberHelpers.number_to_rounded(5.3929 , { precision : 7, significant : true  } )).toEqual("5.392900");
      expect(NumberHelpers.number_to_rounded(0 , { precision : 2, significant : true  } )).toEqual("0.0");
      expect(NumberHelpers.number_to_rounded(0 , { precision : 1, significant : true  } )).toEqual("0");
      expect(NumberHelpers.number_to_rounded(0.0001 , { precision : 1, significant : true  } )).toEqual("0.0001");
      expect(NumberHelpers.number_to_rounded(0.0001 , { precision : 3, significant : true  } )).toEqual("0.000100");
      expect(NumberHelpers.number_to_rounded(0.0001111 , { precision : 1, significant : true  } )).toEqual("0.0001");
      expect(NumberHelpers.number_to_rounded(9.995 , { precision : 3, significant : true } )).toEqual("10.0");
      expect(NumberHelpers.number_to_rounded(9.994 , { precision : 3, significant : true } )).toEqual("9.99");
      expect(NumberHelpers.number_to_rounded(10.995 , { precision : 3, significant : true } )).toEqual("11.0");
      
  });
  it("to_rounded_with_strip_insignificant_zeros", function() {
      expect(NumberHelpers.number_to_rounded(9775.43 , { precision : 4, strip_insignificant_zeros : true  } )).toEqual("9775.43");
      expect(NumberHelpers.number_to_rounded(9775.2 , { precision : 6, significant : true, strip_insignificant_zeros : true  } )).toEqual("9775.2");
      expect(NumberHelpers.number_to_rounded(0 , { precision : 6, significant : true, strip_insignificant_zeros : true  } )).toEqual("0");
  });
  // Zero precision with significant is a mistake (would always return zero),
  // so we treat it as if significant was false (increases backwards compatibility for number_to_human_size)

  it("to_rounded_with_significant_true_and_zero_precision", function() {
      expect(NumberHelpers.number_to_rounded(123.987 , { precision : 0, significant : true } )).toEqual("124");
      expect(NumberHelpers.number_to_rounded(12 , { precision : 0, significant : true  } )).toEqual("12");
      expect(NumberHelpers.number_to_rounded("12.3" , { precision : 0, significant : true  } )).toEqual("12");
  });
});
