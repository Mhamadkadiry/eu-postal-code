export type Country = 
  | 'Albania' | 'Andorra' | 'Armenia' | 'Austria' | 'Azerbaijan' 
  | 'Belarus' | 'Belgium' | 'BosniaAndHerzegovina' | 'Bulgaria' | 'Croatia'
  | 'Cyprus' | 'CzechRepublic' | 'Denmark' | 'Estonia' | 'Finland'
  | 'France' | 'Georgia' | 'Germany' | 'Greece' | 'Hungary'
  | 'Iceland' | 'Ireland' | 'Italy' | 'Kazakhstan' | 'Kosovo'
  | 'Latvia' | 'Liechtenstein' | 'Lithuania' | 'Luxembourg' | 'Malta'
  | 'Moldova' | 'Monaco' | 'Montenegro' | 'Netherlands' | 'NorthMacedonia'
  | 'Norway' | 'Poland' | 'Portugal' | 'Romania' | 'Russia'
  | 'SanMarino' | 'Serbia' | 'Slovakia' | 'Slovenia' | 'Spain'
  | 'Sweden' | 'Switzerland' | 'Turkey' | 'Ukraine' | 'UnitedKingdom'
  | 'VaticanCity'; 

  const postalCodePatterns: { [key: string]: RegExp } = {
    vaticanCity: /\b00120\b/,              
    sanMarino: /\b4789\d{2}\b/,            
    monaco: /\b980\d{2}\b/,                
    adThreeDigits: /\bAD\d{3}\b/,          
    portugal: /\b\d{4}-\d{3}\b/,           
    poland: /\b\d{2}-\d{3}\b/,             
    uk: /\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b/i, 
    netherlands: /\b\d{4} ?[A-Z]{2}\b/,    
    twoPartWithSpace: /\b\d{3} \d{2}\b/,   
    sixDigits: /\b\d{6}\b/,                
    fiveDigits: /\b\d{5}\b/,              
    fourDigits: /\b\d{4}\b/,               
  };

const countryPostalCodeMap: Record<Country, string[]> = {
  Albania: ['fourDigits'],
  Andorra: ['adThreeDigits'],
  Armenia: ['fourDigits'],
  Austria: ['fourDigits'],
  Azerbaijan: ['fourDigits'],
  Belarus: ['sixDigits'],
  Belgium: ['fourDigits'],
  BosniaAndHerzegovina: ['fiveDigits'],
  Bulgaria: ['fourDigits'],
  Croatia: ['fiveDigits'],
  Cyprus: ['fourDigits'],
  CzechRepublic: ['fiveDigits'],
  Denmark: ['fourDigits'],
  Estonia: ['fiveDigits'],
  Finland: ['fiveDigits'],
  France: ['fiveDigits'],
  Georgia: ['fourDigits'],
  Germany: ['fiveDigits'],
  Greece: ['fiveDigits'],
  Hungary: ['fourDigits'],
  Iceland: ['fourDigits'],
  Ireland: ['fourDigits'],
  Italy: ['fiveDigits'],
  Kazakhstan: ['sixDigits'],
  Kosovo: ['fiveDigits'],
  Latvia: ['fourDigits'],
  Liechtenstein: ['fourDigits'],
  Lithuania: ['fiveDigits'],
  Luxembourg: ['fourDigits'],
  Malta: ['fourDigits'],
  Moldova: ['fourDigits'],
  Monaco: ['monaco'],
  Montenegro: ['fiveDigits'],
  Netherlands: ['netherlands'],
  NorthMacedonia: ['fourDigits'],
  Norway: ['fourDigits'],
  Poland: ['poland'],
  Portugal: ['portugal'],
  Romania: ['sixDigits'],
  Russia: ['sixDigits'],
  SanMarino: ['sanMarino'],
  Serbia: ['fiveDigits'],
  Slovakia: ['fiveDigits'],
  Slovenia: ['fourDigits'],
  Spain: ['fiveDigits'],
  Sweden: ['twoPartWithSpace'],
  Switzerland: ['fourDigits'],
  Turkey: ['fiveDigits'],
  Ukraine: ['fiveDigits'],
  UnitedKingdom: ['uk'],
  VaticanCity: ['vaticanCity'],
};

interface MatchOption {
  type: 'single' | 'array';
}

export function extractPostalCode(
  rawString: string,
  country?: Country,  
  options: MatchOption = { type: 'single' }
): string | string[] | null {

  const matches: string[] = [];

  if (country) {
    if(!countryPostalCodeMap[country]){
        throw new Error(`No postal code regex defined for country: ${country}`)
    }
    const patternsToCheck = countryPostalCodeMap[country];

    patternsToCheck.forEach(patternKey => {
      const regex = postalCodePatterns[patternKey];
      const match = rawString.match(regex);
      if (match) {
        matches.push(...match);
      }
    });

    return options.type === 'single' ? (matches.length > 0 ? matches[0] : null) : (matches.length > 0 ? matches : null);
  }

  Object.values(postalCodePatterns).forEach((regexPattern) => {
    const globalRegex = new RegExp(regexPattern, 'g');
    const match = rawString.match(globalRegex);  
    if (match) {
      match.forEach((m) => {
        if (!matches.includes(m)) {
          matches.push(m);
        }
      });
    }
  });

  return options.type === 'single' ? (matches.length > 0 ? matches[0] : null) : (matches.length > 0 ? matches : null);
}
