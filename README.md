(A better formatted version of this documentation can
be viewed [here](http://emcien.github.com/number-helpers-coffeescript))

## Background

At Emcien, we found more of our application View Code migrating into a
BackBone (or JS) rendered context. The useful Rails NumberHelpers
we have grown accustomed to are not available. Out of necessity, we created a
CoffeeScript implementation of the Rails NumberHelpers to help display
numeric data in a fomatted fashion.

## Details

This library uses the
[Rails NumberHelpers Documentation](http://api.rubyonrails.org/classes/ActionView/Helpers/NumberHelper.html)
as the recipe for all method names, parameters, and test cases. For testing,
the Jasmine Test Framework implements the same test specs as the Rails code.

## Testing

  * jasmine
   - Just open the index.html file in your browser
  * jasmine-node
   - Install jasmine-node `npm install -g jasmine-node`
   - Run: `$ jasmine-node specs`

### Methods:

#### `number_to_currency`

Formats a number into a currency string (e.g., $13.65).
You can customize the format in the options hash.

`NumberHelpers.number_to_currency(123, {option: value})`

- `{ precision: 2   }` - Sets the level of precision (defaults to 2).
- `{ unit: '$'      }` - Sets the denomination of the currency (defaults to "$").
- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: ',' }` - Sets the thousands delimiter (defaults to ",").

*Examples:*
- `NumberHelpers.number_to_currency(1234567890.50)`: `$1,234,567,890.50`
- `NumberHelpers.number_to_currency('1234567890.50')`: `$1,234,567,890.50`
- `NumberHelpers.number_to_currency(1234567890.506)`: `$1,234,567,890.51`
- `NumberHelpers.number_to_currency(1234567890.506, {precision: 0})`: `$1,234,567,890`
- `NumberHelpers.number_to_currency(1234567890.506, {precision: 1})`: `$1,234,567,890.5`
- `NumberHelpers.number_to_currency(1234567890.506, {precision: 3})`: `$1,234,567,890.506`
- `NumberHelpers.number_to_currency(1234567890.506, {precision: 4})`: `$1,234,567,890.5060`
- `NumberHelpers.number_to_currency('123a456')`: `$123a456`
- `NumberHelpers.number_to_currency(1234567890.50, {unit:"&pound;", separator:",", delimiter:""})`: `£1234567890,50`

---------

#### `number_to_human`

Pretty prints (formats and approximates) a number in a way it is more
readable by humans (eg.: 1200000000 becomes “1.2 Billion”). This is useful
for numbers that can get very large (and too hard to read).

`NumberHelpers.number_to_human(123, {option: value})`

- `{ precision: 3 }` - Sets the level of precision (defaults to 3).
- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: ',' }` - Sets the thousands delimiter (defaults to ",").
- `{ space_label: false }` - Omit the space between the value and the label.
  - If false, then 1234 would be output as 1.23Thousand
- `{ strip_insignificant_zeros: true}` - If true removes insignificant zeros
  after the decimal separator (defaults to true)
- `{ significant: true }`
  - If true, precision will be the # of significant_digits.
  - If false, the # of fractional digits (defaults to true)
- `{ labels: { thousand: 'K', million: 'M' } }`
  - Customize the label used for the output value.
  - Possible keys are:
    - `thousand`
    - `million`
    - `billion`
    - `trillion`
    - `quadrillion`

*Examples:*
- `NumberHelpers.number_to_human(123)`: `123`
- `NumberHelpers.number_to_human(1234)`: `1.23 Thousand`
- `NumberHelpers.number_to_human(12345)`: `12.3 Thousand`
- `NumberHelpers.number_to_human(1234567)`: `1.23 Million`
- `NumberHelpers.number_to_human(1234567890)`: `1.23 Billion`
- `NumberHelpers.number_to_human(1234567890123)`: `1.23 Trillion`
- `NumberHelpers.number_to_human(1234567890123456)`: `1.23 Quadrillion`
- `NumberHelpers.number_to_human(1234567890123456789)`: `1230 Quadrillion`
- `NumberHelpers.number_to_human(489939, {precision: 2})`: `490 Thousand`
- `NumberHelpers.number_to_human(489939, {precision: 4})`: `489.9 Thousand`
- `NumberHelpers.number_to_human(1234567, {precision: 4, significant: false})`: `1.2346 Million`
- `NumberHelpers.number_to_human(1234567, {precision: 1, significant: false, separator: ','})`: `1,2 Million`
- `NumberHelpers.number_to_human(500000000, {precision: 5, strip_insignificant_zeros: true})`: `500 Million`

----------

## `number_to_human_size`

Formats the bytes in number into a more understandable representation
(e.g., giving it 1500 yields 1.5 KB). This method is useful for reporting
file sizes to users. You can customize the format in the options hash.

`NumberHelpers.number_to_human_size(123, {option: value})`

- `{ precision: 3 }` - Sets the level of precision (defaults to 3).
- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: ',' }` - Sets the thousands delimiter (defaults to ",").
- `{ strip_insignificant_zeros: true}` - If true removes insignificant zeros
  after the decimal separator (defaults to true)
- `{ significant: true }` (defaults to true)
  - If true, precision will be the # of significant_digits.
  - If false, the # of fractional digits

*Examples:*
- `NumberHelpers.number_to_human_size(123)`: `123 Bytes`
- `NumberHelpers.number_to_human_size(1234)`: `1.21 KB`
- `NumberHelpers.number_to_human_size(12345)`: `12.1 KB`
- `NumberHelpers.number_to_human_size(1234567)`: `1.18 MB`
- `NumberHelpers.number_to_human_size(1234567890)`: `1.15 GB`
- `NumberHelpers.number_to_human_size(1234567890123)`: `1.12 TB`
- `NumberHelpers.number_to_human_size(1234567, {precision: 2})`: `1.2 MB`
- `NumberHelpers.number_to_human_size(483989, {precision: 2})`: `470 KB`
- `NumberHelpers.number_to_human_size(1234567, {precision: 2, separator: ','})`: `1,2 MB`
- `NumberHelpers.number_to_human_size(1234567890123, {precision: 5})`: `1.1228 TB`
- `NumberHelpers.number_to_human_size(524288000, {precision: 5, strip_insignificant_zeros: true})`: `500 MB`

-------------

## `number_to_percentage`

Formats a number as a percentage string (e.g., 65%). You can
customize the format in the options hash.

`NumberHelpers.number_to_percentage(123, {option: value})`

- `{ precision: 3 }` - Sets the level of precision (defaults to 3).
- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: '' }` - Sets the thousands delimiter (defaults to "").
- `{ strip_insignificant_zeros: false}` - If true removes insignificant zeros
  after the decimal separator (defaults to false)
- `{ significant: false }` - If true, precision will be the # of significant_digits
  If false, the # of fractional digits (defaults to false)

*Examples:*
-  `NumberHelpers.number_to_percentage(100)`: `100.000%`
-  `NumberHelpers.number_to_percentage(98)`: `98.000%`
-  `NumberHelpers.number_to_percentage(100, {precision: 0})`: `100%`
-  `NumberHelpers.number_to_percentage(1000, {delimiter: '.', separator: ','})`: `1.000,000%`
-  `NumberHelpers.number_to_percentage(302.24398923423, {precision: 5})`: `302.24399%`
-  `NumberHelpers.number_to_percentage('98a')`: `98a%`

----------

## `number_to_phone`

Formats a number into a US phone number (e.g., (555) 123-9876).
You can customize the format in the options hash.

`NumberHelpers.number_to_phone(5551234, {option: value})`

- `{ area_code: false }` - Adds parentheses around the area code.
- `{ delimiter: '-' }` - Sets the thousands delimiter (defaults to "-").
- `{ extension: false }` - Specifies an extension to add to the end of the generated number.
- `{ country_code: false }` - Sets the country code for the phone number.

*Examples:*
-  `NumberHelpers.number_to_phone(5551234)`: `555-1234`
-  `NumberHelpers.number_to_phone(1235551234)`: `123-555-1234`
-  `NumberHelpers.number_to_phone(1235551234, {area_code: true})`: `(123) 555-1234`
-  `NumberHelpers.number_to_phone(1235551234, {delimiter: ' '})`: `123 555 1234`
-  `NumberHelpers.number_to_phone(1235551234, {area_code: true, extension: 555})`: `(123) 555-1234 x 555`
-  `NumberHelpers.number_to_phone(1235551234, {country_code: 1})`: `+1-123-555-1234`
-  `NumberHelpers.number_to_phone(123a456)`: `123a456`
-  `NumberHelpers.number_to_phone(1235551234, {country_code: 1, extension: 1343, delimiter: '.'})`: `+1.123.555.1234 x 1343`

----------

## `number_with_delimiter`

Formats a number with grouped thousands using delimiter (e.g., 12,324).
You can customize the format in the options hash.

`NumberHelpers.number_with_delimiter(12345678, {option: value})`

- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: ',' }` - Sets the thousands delimiter (defaults to ",").

*Examples:*
- `NumberHelpers.number_with_delimiter(12345678)`: `12,345,678`
- `NumberHelpers.number_with_delimiter('123456')`: `123,456`
- `NumberHelpers.number_with_delimiter(12345678.05)`: `12,345,678.05`
- `NumberHelpers.number_with_delimiter(12345678, {delimiter:'.'})`: `12.345.678`
- `NumberHelpers.number_with_delimiter(12345678, {delimiter:','})`: `12,345,678`
- `NumberHelpers.number_with_delimiter(12345678.05, {separator:' '})`: `12,345,678 05`
- `NumberHelpers.number_with_delimiter('112a')`: `112a`
- `NumberHelpers.number_with_delimiter(98765432.98, {delimiter:' ',separator:','})`: `98 765 432,98`

------

## `number_with_precision`

Formats a number with the specified level of :precision (e.g., 112.32 has a
precision of 2 if :significant is false, and 5 if :significant is true).
You can customize the format in the options hash.

`NumberHelpers.number_with_precision(111.2345, {option: value})`

- `{ precision: 3 }` - Sets the level of precision (defaults to 3).
- `{ separator: '.' }` - Sets the separator between the units (defaults to ".").
- `{ delimiter: ',' }` - Sets the thousands delimiter (defaults to ",").
- `{ strip_insignificant_zeros: false}` - If true removes insignificant zeros after
   the decimal separator (defaults to false)
- `{ significant: false }`
  - If true, precision will be the # of significant_digits.
  - If false, the # of fractional digits (defaults to false)

*Examples:*
- `NumberHelpers.number_with_precision(111.2345)`: `111.235`
- `NumberHelpers.number_with_precision(111.2345, {precision: 2})`: `111.23`
- `NumberHelpers.number_with_precision(13, {precision: 5})`: `13.00000`
- `NumberHelpers.number_with_precision(389.32314, {precision: 0})`: `389`
- `NumberHelpers.number_with_precision(111.2345, {significant: true})`: `111`
- `NumberHelpers.number_with_precision(111.2345, {significant: true, precision: 1})`: `100`
- `NumberHelpers.number_with_precision(389.32314, {significant: true, precision: 4})`: `389.3`
- `NumberHelpers.number_with_precision(13, {significant: true, precision: 5})`: `13.00000`
- `NumberHelpers.number_with_precision(13.00000004, {significant: true, precision: 6})`: `13.000000`
- `NumberHelpers.number_with_precision(1111.2345, {separator: ',', precision: 2, delimiter: '.'})`: `1.111,23`
- `NumberHelpers.number_with_precision(13, {significant: true, precision: 5, strip_insignificant_zeros: true})`: `13`


This project is maintained by [Emcien](https://github.com/emcien).

We are always looking for good engineers -
[send](mailto:devjobs@emcien.com) us your github profile and resume!

