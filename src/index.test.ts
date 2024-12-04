import { extractPostalCode } from '../src/index'; // Adjust path based on your file structure
import { Country } from '../src/index';  // Adjust the path if needed

describe('extractPostalCode function', () => {

  test('should extract postal code for a specific country (Germany)', () => {
    const result = extractPostalCode('12345 Berlin, Germany', 'Germany');
    expect(result).toBe('12345');
  });

  test('should return null if no postal code is found for a specific country (Germany)', () => {
    const result = extractPostalCode('Hello Berlin, Germany', 'Germany');
    expect(result).toBeNull();
  });

  test('should extract postal codes for multiple countries', () => {
    const result = extractPostalCode('12345 Berlin, Germany and 75001 Paris, France');
    expect(result).toBe('12345');
  });

  test('should extract postal codes for multiple countries with the array option', () => {
    const result = extractPostalCode('12345 Berlin, Germany and 75001 Paris, France', undefined, { type: 'array' });
    console.log(result)
    expect(result).toEqual(['12345', '75001']);
  });

  test('should extract postal code for a country when no country is specified', () => {
    const result = extractPostalCode('12345 Berlin, Germany');
    expect(result).toBe('12345');
  });

  test('should return null when no postal code is found in the string', () => {
    const result = extractPostalCode('Hello from Berlin, Germany');
    expect(result).toBeNull();
  });

  test('should return only the first postal code when type is "single"', () => {
    const result = extractPostalCode('12345 Berlin, Germany and 75001 Paris, France', undefined, { type: 'single' });
    expect(result).toBe('12345');
  });

  test('should throw an error for invalid country', () => {
    const invalidCountry: Country = 'InvalidCountry' as Country;
    expect(() => extractPostalCode('12345 Berlin, Germany', invalidCountry)).toThrowError('No postal code regex defined for country: InvalidCountry');
  });

  test('should return null if no postal codes match when no country is specified', () => {
    const result = extractPostalCode('No postal code here');
    expect(result).toBeNull();
  });

  test('should handle a country with a complex postal code format (Netherlands)', () => {
    const result = extractPostalCode('1012AB Amsterdam, Netherlands', 'Netherlands');
    expect(result).toBe('1012AB');
  });

  test('should handle countries with no spaces in postal codes (Monaco)', () => {
    const result = extractPostalCode('98000 Monaco', 'Monaco');
    expect(result).toBe('98000');
  });

  test('should match a single postal code when country is given as lowercase', () => {
    const result = extractPostalCode('12345 Berlin, germany', 'Germany');
    expect(result).toBe('12345');
  });

  test('should match Andorra postal codes', () => {
    const result = extractPostalCode('Andorra postal code example: AD100 not 00122.');
    expect(result).toBe('AD100');
  });

  test('should match San Marino postal codes', () => {
    const result = extractPostalCode('San Marino postal code example: 47890.');
    expect(result).toBe('47890');
  });

  test('should match UK postal codes', () => {
    const result = extractPostalCode('UK postal code: SW1A 1AA.');
    expect(result).toBe('SW1A 1AA');
  });

  test('should match Netherlands postal codes', () => {
    const result = extractPostalCode('Netherlands postal code: 1234 AB.');
    expect(result).toBe('1234 AB');
  });

  test('should match two-part postal codes with a space', () => {
    const result = extractPostalCode('Example postal code: 123 45.');
    expect(result).toBe('123 45');
  });

  test('should match six-digit postal codes', () => {
    const result = extractPostalCode('Example six-digit postal code: 123456.');
    expect(result).toBe('123456');
  });

  test('should match five-digit postal codes', () => {
    const result = extractPostalCode('Example five-digit postal code: 12345.');
    expect(result).toBe('12345');
  });

  test('should match four-digit postal codes', () => {
    const result = extractPostalCode('Example four-digit postal code: 1234.');
    expect(result).toBe('1234');
  });
});
