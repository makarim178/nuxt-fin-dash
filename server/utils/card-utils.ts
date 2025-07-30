export const generateCardNumber = (iin = '400000'): string => {
  const accountIdentifier = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 10)
  ).join('');

  const partialNumber = iin + accountIdentifier; // 15 digits so far

  const checkDigit = getLuhnCheckDigit(partialNumber);
  return partialNumber + checkDigit;
}

// Luhn Algorithm to calculate the last digit
export const getLuhnCheckDigit = (number: string): string => {
  const digits = number.split('').map(Number).reverse();
  const sum = digits.reduce((acc, digit, idx) => {
    if (idx % 2 === 0) return acc + digit;
    const doubled = digit * 2;
    return acc + (doubled > 9 ? doubled - 9 : doubled);
  }, 0);

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

export const generateCVV = (): string => {
  return String(Math.floor(100 + Math.random() * 900)); // 3-digit CVV
}

export const generateExpiryDate = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear() + 4, now.getMonth(), 1); // 4 years validity
}

export const generateRandomIIN = (network: 'visa' | 'mastercard' | 'amex' | 'discover' = 'visa'): string => {
  const prefixes = ['51', '52', '53', '54', '55'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const amexPrefix = ['34', '37'][Math.floor(Math.random() * 2)];
  switch (network) {
    case 'visa':
      return '4' + Math.floor(10000 + Math.random() * 89999).toString(); // 4xxxxx
    case 'mastercard':
      return prefix + Math.floor(10000 + Math.random() * 89999).toString(); // 51xxxx–55xxxx
    case 'amex':
      return amexPrefix + Math.floor(10000 + Math.random() * 89999).toString(); // 34xxxx / 37xxxx
    case 'discover':
      return '6011' + Math.floor(100 + Math.random() * 899).toString(); // 6011xx
    default:
      return '999999'; // fallback or for testing
  }
}

export const generateRandomCardNumber = () => {
  const network: ('visa' | 'mastercard' | 'amex' | 'discover')[] = ['visa', 'mastercard', 'amex', 'discover']
  const selectRandomNetworkIndex = Math.random() * network.length
  const iin = generateRandomIIN(network[selectRandomNetworkIndex])
  return generateCardNumber(iin)
}
