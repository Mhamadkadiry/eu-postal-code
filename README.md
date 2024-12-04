# eu-postal-code

A lightweight utility to extract postal codes from raw strings for supported European countries.

## Installation

\`\`\`bash
npm install eu-postal-code
\`\`\`

## Usage

\`\`\`typescript
import { extractPostalCode } from 'eu-postal-code';

const address = "12345 Berlin, Germany";
const postalCode = extractPostalCode(address, "Germany");

console.log(postalCode); // Outputs: 12345
\`\`\`

## Supported Countries

This utility supports the following European countries:

- Albania
- Andorra
- Armenia
- Austria
- Azerbaijan
- Belarus
- Belgium
- Bosnia and Herzegovina
- Bulgaria
- Croatia
- Cyprus
- Czech Republic
- Denmark
- Estonia
- Finland
- France
- Georgia
- Germany
- Greece
- Hungary
- Iceland
- Ireland
- Italy
- Kazakhstan
- Kosovo
- Latvia
- Liechtenstein
- Lithuania
- Luxembourg
- Malta
- Moldova
- Monaco
- Montenegro
- Netherlands
- North Macedonia
- Norway
- Poland
- Portugal
- Romania
- Russia
- San Marino
- Serbia
- Slovakia
- Slovenia
- Spain
- Sweden
- Switzerland
- Turkey
- Ukraine
- United Kingdom
- Vatican City

## Postal Code Patterns

The utility supports the following postal code patterns for each country:

\`\`\`typescript
const postalCodePatterns: { [key: string]: RegExp } = {
  vaticanCity: /\\b00120\\b/,
  sanMarino: /\\b4789\\d{2}\\b/,
  monaco: /\\b980\\d{2}\\b/,
  adThreeDigits: /\\bAD\\d{3}\\b/,
  portugal: /\\b\\d{4}-\\d{3}\\b/,
  poland: /\\b\\d{2}-\\d{3}\\b/,
  uk: /\\b[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}\\b/i,
  netherlands: /\\b\\d{4} ?[A-Z]{2}\\b/,
  twoPartWithSpace: /\\b\\d{3} \\d{2}\\b/,
  sixDigits: /\\b\\d{6}\\b/,
  fiveDigits: /\\b\\d{5}\\b/,
  fourDigits: /\\b\\d{4}\\b/,
};
\`\`\`

## Example Usage

You can use the \`extractPostalCode\` function to extract postal codes from raw address strings.

### Example 1: Extract postal code for a specific country (Germany)

\`\`\`typescript
const result = extractPostalCode('12345 Berlin, Germany', 'Germany');
console.log(result); // Outputs: '12345'
\`\`\`

### Example 2: Extract postal code for a country when no country is specified

\`\`\`typescript
const result = extractPostalCode('12345 Berlin, Germany');
console.log(result); // Outputs: '12345'
\`\`\`

### Example 3: Extract multiple postal codes from a string

\`\`\`typescript
const result = extractPostalCode('12345 Berlin, Germany and 75001 Paris, France', undefined, { type: 'array' });
console.log(result); // Outputs: ['12345', '75001']
\`\`\`

### Example 4: Invalid country

\`\`\`typescript
const invalidCountry: Country = 'InvalidCountry' as Country;
try {
  const result = extractPostalCode('12345 Berlin, Germany', invalidCountry);
} catch (error) {
  console.error(error.message); // Outputs: 'No postal code regex defined for country: InvalidCountry'
}
\`\`\`
