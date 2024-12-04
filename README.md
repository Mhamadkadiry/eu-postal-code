# eu-postal-code

A lightweight utility to extract postal codes from raw strings for supported European countries.

## Installation
npm install eu-postal-code


## Usage
```typescript
import { extractPostalCode } from 'eu-postal-code';

const address = "12345 Berlin, Germany";
const postalCode = extractPostalCode(address, "Germany");

console.log(postalCode); // Outputs: 12345
# eu-postal-code
