class @NumberHelpers
  @number_to_currency = (float, opts={}) ->
    # _precision - Sets the level of precision (defaults to 2).
    # _unit - Sets the denomination of the currency (defaults to "$").
    # _separator - Sets the separator between the units (defaults to ".").
    # _delimiter - Sets the thousands delimiter (defaults to ",").
    _precision  = opts.precision ? 2
    _unit       = opts.unit ? '$'
    _separator  = opts.separator ? '.'
    _delimiter  = opts.delimiter ? ','  
    
    number  = float.toString().split('.')
    integer = number[0] 
    decimal = number[1]
    
    # Pad to _precision
    decimal = parseFloat("0.#{decimal}").toFixed(_precision)
    decimal = decimal.toString().split('.')
    decimal = decimal[1] ? ''
        
    # Remove separator if no decimal
    _separator = '' unless decimal
    
    # Non-number values return zero precision
    _separator = decimal = '' if isNaN(integer)    
    
    integer = NumberHelpers.number_with_delimiter(integer, {delimiter: _delimiter})
          
    return "#{_unit}#{integer}#{_separator}#{decimal}"
  
  @number_with_delimiter = (float, opts={}) ->
    # _separator - Sets the separator between the units (defaults to ".").
    # _delimiter - Sets the thousands delimiter (defaults to ",").
    _separator  = opts.separator ? '.'
    _delimiter  = opts.delimiter ? ','
    
    number  = float.toString().split(".")
    integer = number[0]
    decimal = number[1] ? ''
    
    # Remove separator if no decimal
    _separator = '' unless decimal
    
    rgx = /(\d+)(\d{3})/
    integer = integer .replace(rgx, "$1" + _delimiter + "$2") while rgx.test(integer ) if _delimiter
    
    return "#{integer}#{_separator}#{decimal}"
  
  @number_with_precision = (float, opts={}) ->
    # _precision - Sets the precision of the number (defaults to 3).
    # _separator - Sets the separator between the fractional and integer digits (defaults ".")
    # _significant - If true, precision will be the # of significant_digits. If false, the # of fractional digits (defaults to +false+).
    # _delimiter - Sets the thousands delimiter (defaults to "").
    # _strip_insignificant_zeros - If true removes insignificant zeros after the decimal separator
    _precision    = opts.precision ? 3
    _delimiter    = opts.delimiter ? ','
    _separator    = opts.separator ? '.'
    _significant  = opts.significant ? false
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false
    
    multiple  = Math.pow(10, _precision)
    rounded   = Math.round(float * multiple) / multiple
    
    number    = rounded.toString().split('.')
    integer   = number[0] 
    decimal   = number[1] ? ''
    
    # Pad to _precision
    decimal = parseFloat("0.#{decimal}").toFixed(_precision) 
    decimal = decimal.toString().split('.')
    decimal = decimal[1] ? ''
        
    if _significant and rounded.toString().length > _precision
      rounded = "#{integer}.#{decimal}" * 1
      
      # To Precision rounds the number, we do not want that when using _significant
      if _precision is 1 or integer.length > _precision
        rounded = rounded.toPrecision(_precision) * 1
      else
        rounded = rounded.toString().substr(0, _precision + 1)
      
      number  = rounded.toString().split('.')
      integer = number[0] 
      decimal = number[1] ? ''
    
    # Delimiter Integer
    integer = NumberHelpers.number_with_delimiter(integer, {delimiter: _delimiter})
    
    if _strip_insignificant_zeros
      decimal = ''
      
    # Remove separator if no decimal
    _separator = '' unless decimal
            
    return "#{integer}#{_separator}#{decimal}"
  
  @number_to_human = (float, opts={}) ->
    # _precision - Sets the precision of the number (defaults to 3).
    # _separator - Sets the separator between the fractional and integer digits (defaults ".")
    # _significant - If true, precision will be the # of significant_digits. If false, the # of fractional digits (defaults to +false+).
    # _delimiter - Sets the thousands delimiter (defaults to "").
    # _strip_insignificant_zeros - If true removes insignificant zeros after the decimal separator (defaults to true)
    _precision    = opts.precision ? 3
    _separator    = opts.separator ? '.'
    _significant  = opts.significant ? true
    _delimiter  = opts.delimiter ? ','
    
    abs_float = Math.abs(float)
    
    if abs_float < Math.pow(10, 3)
      precise = NumberHelpers.number_with_precision(float, {precision: _precision, strip_insignificant_zeros: true, delimiter: _delimiter, separator: _separator})
      return "#{precise}"
    else if abs_float >= Math.pow(10, 3) and abs_float < Math.pow(10, 6)
      number  = float / Math.pow(10, 3)
      precise = NumberHelpers.number_with_precision(number, {precision: _precision, significant: _significant, delimiter: _delimiter, separator: _separator})
      return "#{precise} Thousand"
    else if abs_float >= Math.pow(10, 6) and abs_float < Math.pow(10, 8)
      number  = float / Math.pow(10, 6)
      precise = NumberHelpers.number_with_precision(number, {precision: _precision, significant: _significant, delimiter: _delimiter, separator: _separator})
      return "#{precise} Million"
    else if abs_float >= Math.pow(10, 9) and abs_float < Math.pow(10, 11)
      number  = float / Math.pow(10, 9)
      precise = NumberHelpers.number_with_precision(number, {precision: _precision, significant: _significant, delimiter: _delimiter, separator: _separator})
      return "#{precise} Billion"
    else if abs_float >= Math.pow(10, 12) and abs_float < Math.pow(10, 14)
      number  = float / Math.pow(10, 12)
      precise = NumberHelpers.number_with_precision(number, {precision: _precision, significant: _significant, delimiter: _delimiter, separator: _separator})
      return "#{precise} Trillion"
    else if abs_float >= Math.pow(10, 15)
      number  = float / Math.pow(10, 15)
      precise = NumberHelpers.number_with_precision(number, {precision: _precision, significant: _significant, delimiter: '', separator: _separator})
      return "#{precise} Quadrillion"
    else
      return 'Error'
    