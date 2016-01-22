class NumberHelpers
  @ZEROS = new Array(200).join('0');
  @number_to_currency = (float, opts={}) ->
    _precision  = opts.precision ? 2
    _unit       = opts.unit ? '$'
    _separator  = opts.separator ? '.'
    _delimiter  = opts.delimiter ? ','
    _unit_pos   = opts.unit_position ? 'start'

    sign = ''

    # Non-number values return zero precision
    if isNaN(float)
      result = float
    else
      float = parseFloat(float) # Arg might be a string, integer
      sign = '-' if float < 0
      fixedWidth = Math.abs(float).toFixed(_precision)
      delimited = NumberHelpers.number_with_delimiter(fixedWidth, {delimiter: _delimiter})
      result = delimited.split('.').join(_separator)

    if _unit_pos == 'end'
      return "#{sign}#{result}#{_unit}"
    else
      return "#{sign}#{_unit}#{result}"

  @number_with_delimiter = (float, opts={}) ->
    _separator  = opts.separator ? '.'
    _delimiter  = opts.delimiter ? ','

    number  = float.toString().split(".")
    integer = number[0]
    decimal = number[1] ? ''

    # Remove separator if no decimal
    _separator = '' unless decimal

    rgx = /(\d+)(\d{3})/
    integer = integer.replace(rgx, "$1" + _delimiter + "$2") while rgx.test(integer) if _delimiter

    return "#{integer}#{_separator}#{decimal}"

  @safe_round = (float, _significant, _precision) ->
    # Rounding based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round 
    #Shift
    return float unless float
    value = (+float).toExponential().toString().split('e');
    _round = if _significant then (-1 - value[1] + _precision)  else  _precision

    value = Math.round(+(value[0] + 'e' + (+value[1] + _round)));
    # Shift back
    value = value.toExponential().toString().split('e');
    value = +(value[0] + 'e' + ( +value[1] - _round) );
    

  @number_with_precision = (float, opts={}) ->
    _precision    = opts.precision ? 3
    _delimiter    = opts.delimiter ? ','
    _separator    = opts.separator ? '.'
    _significant  = opts.significant ? false
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false
    _skip_empty_fractionals = opts.strip_empty_fractional_parts
    
    # Break number into inspectable pieces
    number    = float.toString().split('.')
    integer   = number[0]
    decimal   = number[1] ? ''

    # Significant Digits need rounding to match number of sig digits
    if _significant
      rnd = _precision - integer.length
    else
      rnd = _precision

    # Make sure rounding is not to a negative place
    rnd = 0 if rnd < 1

    # Round
    multiple  = Math.pow(10, rnd)
    if multiple > 1
      rounded   = @safe_round(float, _significant, _precision)
    else
      rounded = float

    # Break number into inspectable pieces
    number    = rounded.toString().split('.')
    integer   = number[0]
    decimal   = number[1] ? ''

    decimal = parseFloat("0.#{decimal}").toFixed(_precision)
    decimal = decimal.toString().split('.')
    decimal = decimal[1] ? ''

    # Reconstitute the number with correct decimal
    number    = "#{integer}.#{decimal}" * 1
    num_array = number.toString().split('')
    num_lngth = num_array.length

    # Count Non-zero Digits
    i = 0; sigs = 0
    while i < num_lngth
      sigs++ unless num_array[i] is '.' or num_array[i] is '0'
      i++

    # Significant Digits
    if _significant and sigs >= _precision and _precision > 0
      significant = number.toPrecision(_precision) * 1
      significant = significant.toString().split('.')
      integer     = significant[0]
      decimal     = significant[1] ? ''


    
    
    # Delimiter Integer
    integer = NumberHelpers.number_with_delimiter(integer, {delimiter: _delimiter})

    # Strip Insignificant Digits
    if _strip_insignificant_zeros
      dlen = decimal.length
      newlen = dlen

      while newlen > 0 and decimal[newlen - 1] == '0'
        newlen = newlen - 1

      if newlen == 0
        decimal = ''
      else if newlen != dlen
        decimal = decimal.slice(0, newlen)

    if _skip_empty_fractionals
      i = 0; zcount = 0
      num_array = decimal.split('')
      dlen = decimal.length
      while i < dlen
        zcount++ if num_array[i] is '0'
        i++
      if zcount == dlen
        decimal = ''

    # Remove separator if no decimal
    _separator = '' unless decimal

    return "#{integer}#{_separator}#{decimal}"

  @number_to_human = (float, opts={}) ->
    _precision    = opts.precision    ? 3
    _separator    = opts.separator    ? '.'
    _significant  = opts.significant  ? true
    _delimiter    = opts.delimiter    ? ','
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false
    _space_label  = if opts.space_label is false then '' else ' '
    _labels       =
        thousand: opts.labels?.thousand ? 'Thousand'
        million: opts.labels?.million ? 'Million'
        billion: opts.labels?.billion ? 'Billion'
        trillion: opts.labels?.trillion ? 'Trillion'
        quadrillion: opts.labels?.quadrillion ? 'Quadrillion'

    # Remove the sign of the number for easier comparision
    abs_float = Math.abs(float)

    # Less than Thousand does not need text or a insignifiant digits
    if abs_float < Math.pow(10, 3)
      denom = 1
      label = false
    else if abs_float >= Math.pow(10, 3) and abs_float < Math.pow(10, 6)
      denom = Math.pow(10, 3)
      label = _labels.thousand
    else if abs_float >= Math.pow(10, 6) and abs_float < Math.pow(10, 9)
      denom = Math.pow(10, 6)
      label = _labels.million
    else if abs_float >= Math.pow(10, 9) and abs_float < Math.pow(10, 12)
      denom = Math.pow(10, 9)
      label = _labels.billion
    else if abs_float >= Math.pow(10, 12) and abs_float < Math.pow(10, 15)
      denom = Math.pow(10, 12)
      label = _labels.trillion
    else if abs_float >= Math.pow(10, 15)
      denom = Math.pow(10, 15)
      label = _labels.quadrillion

    # Process the number into a presentable format
    number  = float / denom
    precise = NumberHelpers.number_with_precision(number,
      precision:                  _precision
      significant:                _significant
      delimiter:                  if label is 'Quadrillion' then '' else _delimiter
      separator:                  _separator
      strip_insignificant_zeros:  unless label then true else _strip_insignificant_zeros
    )

    #No label needed for less than thousand
    if label
      return "#{precise}#{_space_label}#{label}"
    else
      return precise

  @number_to_human_size = (float, opts={}) ->
    _precision    = opts.precision    ? 3
    _separator    = opts.separator    ? '.'
    _significant  = opts.significant  ? true
    _delimiter    = opts.delimiter    ? ','
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false

    # Power of 10 to Bytes Converter
    float = float / 1.024 if float > 1000
    float = float / 1.024 if float > 1000000
    float = float / 1.024 if float > 1000000000
    float = float / 1.024 if float > 1000000000000

    # Remove the sign of the number for easier comparision
    abs_float = Math.abs(float)

    # Less than Thousand does not need text or a insignifiant digits
    if abs_float < Math.pow(10, 3)
      denom = 1
      label = 'Bytes'
    else if abs_float >= Math.pow(10, 3) and abs_float < Math.pow(10, 6)
      denom = Math.pow(10, 3)
      label = 'KB'
    else if abs_float >= Math.pow(10, 6) and abs_float < Math.pow(10, 9)
      denom = Math.pow(10, 6)
      label = 'MB'
    else if abs_float >= Math.pow(10, 9) and abs_float < Math.pow(10, 12)
      denom = Math.pow(10, 9)
      label = 'GB'
    else if abs_float >= Math.pow(10, 12) and abs_float < Math.pow(10, 15)
      denom = Math.pow(10, 12)
      label = 'TB'

    # Process the number into a presentable format
    number  = float / denom

    precise = NumberHelpers.number_with_precision(number,
      precision:                  _precision
      significant:                _significant
      delimiter:                  _delimiter
      separator:                  _separator
      strip_insignificant_zeros:  if label is 'Bytes' then true else _strip_insignificant_zeros
    )

    return "#{precise} #{label}"

  @number_to_phone = (number, opts={}) ->
    _area_code    = opts.area_code ? false
    _delimiter    = opts.delimiter ? '-'
    _country_code = opts.country_code ? false
    _extension    = opts.extension ? false

    # Not a numerical value
    return number if isNaN(number)

    str = number.toString()
    lng = str.length

    # Last Four Digits
    last = str.substr(lng - 4, lng)

    if lng < 8
      first = str.substr(0, 3)
    else
      first   = str.substr(0, 3)
      second  = str.substr(3,3)

      # Area Code
      if _area_code
        first = "(#{first}) #{second}"
      else
        first = "#{first}#{_delimiter}#{second}"

    # Extension Code
    _extension = if _extension then " x #{opts.extension}" else ''

    # Country Code
    _country_code = if _country_code then "+#{_country_code}#{_delimiter}" else ''

    return "#{_country_code}#{first}#{_delimiter}#{last}#{_extension}"

  @number_to_percentage = (float, opts={}) ->
    _precision    = opts.precision    ? 3
    _separator    = opts.separator    ? '.'
    _significant  = opts.significant  ? false
    _delimiter    = opts.delimiter    ? ''
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false

    unless isNaN(float)
      float = NumberHelpers.number_with_precision(float,
        precision:                  _precision
        significant:                _significant
        delimiter:                  _delimiter
        separator:                  _separator
        strip_insignificant_zeros:  _strip_insignificant_zeros
      )

    return "#{float}%"

  @reconstitute_exponential = (num, exp) ->
    if num.indexOf('e') != -1
      vals = num.split('e')
      num = vals[0]
      exp = vals[1]  
    exp = +exp
    num +=''
    return num if exp == 0
    # format is n.nnnnn or n; decimal implied after first digit
    num = num.replace(/\./,'')
    numlength = num.length
    if exp > 0
      if (exp + 1) < numlength
        num = num.substr(0,exp+1)+'.'+num.substr(exp+1)
      else 
        # no decimal, but we need added zeros
        num = (num + @ZEROS).substr(0,exp+1)
    else
      #smaller, just move the decimal over
      num = "0."+(@ZEROS + num).substr(@ZEROS.length+1+exp)
    return num

    
    
  # Number to rounded handles singificant digits differently than number_with_precision
  @number_to_rounded = (float, opts={}) ->
    _precision    = opts.precision    ? 3
    _significant = opts.significant  ? false
    # Be consistent with Ruby implementation
    _delimiter = opts.delimiter ? ''
    _separator    = opts.separator ? '.'
    _strip_insignificant_zeros = opts.strip_insignificant_zeros ? false
    _skip_empty_fractionals = opts.strip_empty_fractional_parts
    # Zero precision with significant is a mistake (would always return zero),
    # so we treat it as if significant was false (increases backwards compatibility for number_to_human_size)

    if _significant && !_precision
      _significant = false

    rounded = @safe_round(float, _significant, _precision) 

    if _significant && _precision
      value = rounded.toExponential().split('e');
      significant_val = (+value[0]).toFixed(_precision-1)
      rounded = @reconstitute_exponential(significant_val,value[1])

    else if _precision
      # Break number into inspectable pieces
      rounded    = rounded.toFixed(_precision)
   
    rounded +='' 
    number    = rounded.split('.')
    integer   = number[0]
    decimal   = number[1] ? ''

    # Delimiter Integer
    integer = NumberHelpers.number_with_delimiter(integer, {delimiter: _delimiter})

    # Strip Insignificant Digits
    if _strip_insignificant_zeros
      dlen = decimal.length
      newlen = dlen

      while newlen > 0 and decimal[newlen - 1] == '0'
        newlen = newlen - 1

      if newlen == 0
        decimal = ''
      else if newlen != dlen
        decimal = decimal.slice(0, newlen)

    if _skip_empty_fractionals
      i = 0; zcount = 0
      num_array = decimal.split('')
      dlen = decimal.length
      while i < dlen
        zcount++ if num_array[i] is '0'
        i++
      if zcount == dlen
        decimal = ''

    # Remove separator if no decimal
    _separator = '' unless decimal

    return "#{integer}#{_separator}#{decimal}"

  


if typeof module isnt 'undefined' and typeof module.exports isnt 'undefined'
  module.exports = NumberHelpers
else
  window.NumberHelpers = NumberHelpers
