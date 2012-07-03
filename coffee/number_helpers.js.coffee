class @NumberHelpers
  # :locale - Sets the locale to be used for formatting (defaults to current locale).
  # :precision - Sets the level of precision (defaults to 2).
  # :unit - Sets the denomination of the currency (defaults to "$").
  # :separator - Sets the separator between the units (defaults to ".").
  # :delimiter - Sets the thousands delimiter (defaults to ",").
  @number_to_currency = (float, opts={}) ->
    _locale     = opts.locale ? 'en'
    _precision  = opts.precision ? 2
    _unit       = opts.unit ? '$'
    _separator  = opts.separator ? '.'
    _delimiter  = opts.delimiter ? ','
    
    #Convert to Number is passed in as string
    float = parseFloat(float, 10) if typeof float is 'string'
    
    #Not passing in a number
    return Number.NaN unless typeof float is 'number'
    
    #Capture the integer value
    integer  = parseInt(float)
    
    #Remove separator if percision is zero
    _separator = '' if _precision is 0
    
    #Pad Percision since using .substring
    _precision = _precision + 2
    
    decimal  = (float - integer).toString()
    decimal    = decimal.substring(2,_precision)
    
    return "#{_unit}#{integer}#{_separator}#{decimal}"