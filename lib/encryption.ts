import CryptoJS from 'crypto-js';

export interface VaultItemData {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

/**
 * Derives an encryption key from the user's password
 * This happens client-side only
 */
export function deriveKey(userPassword: string, email: string): string {
  // Use PBKDF2 to derive a key from password + email as salt
  const key = CryptoJS.PBKDF2(userPassword, email, {
    keySize: 256 / 32,
    iterations: 10000,
  });
  return key.toString();
}

/**
 * Encrypts vault item data client-side
 */
export function encryptData(data: VaultItemData, encryptionKey: string): { encryptedData: string; iv: string } {
  const dataString = JSON.stringify(data);
  
  // Generate random IV
  const iv = CryptoJS.lib.WordArray.random(16);
  
  // Encrypt
  const encrypted = CryptoJS.AES.encrypt(dataString, encryptionKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  
  return {
    encryptedData: encrypted.toString(),
    iv: iv.toString(CryptoJS.enc.Base64),
  };
}

/**
 * Decrypts vault item data client-side
 */
export function decryptData(encryptedData: string, iv: string, encryptionKey: string): VaultItemData {
  const ivWordArray = CryptoJS.enc.Base64.parse(iv);
  
  const decrypted = CryptoJS.AES.decrypt(encryptedData, encryptionKey, {
    iv: ivWordArray,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  
  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
}

/**
 * Generates a secure random password
 */
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeSimilar: boolean;
}

export function generatePassword(options: PasswordOptions): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Characters that look similar
  const similar = 'il1Lo0O';
  
  let chars = '';
  let password = '';
  
  if (options.includeUppercase) chars += uppercase;
  if (options.includeLowercase) chars += lowercase;
  if (options.includeNumbers) chars += numbers;
  if (options.includeSymbols) chars += symbols;
  
  if (chars === '') {
    chars = lowercase; // Fallback
  }
  
  if (options.excludeSimilar) {
    chars = chars.split('').filter(char => !similar.includes(char)).join('');
  }
  
  // Ensure at least one character from each selected type
  const required: string[] = [];
  if (options.includeUppercase) required.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
  if (options.includeLowercase) required.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
  if (options.includeNumbers) required.push(numbers[Math.floor(Math.random() * numbers.length)]);
  if (options.includeSymbols) required.push(symbols[Math.floor(Math.random() * symbols.length)]);
  
  // Generate remaining characters
  for (let i = required.length; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Add required characters and shuffle
  password = (password + required.join('')).split('').sort(() => Math.random() - 0.5).join('');
  
  return password.slice(0, options.length);
}

/**
 * Calculates password strength (0-100)
 */
export function calculatePasswordStrength(password: string): number {
  let strength = 0;
  
  if (password.length >= 8) strength += 20;
  if (password.length >= 12) strength += 10;
  if (password.length >= 16) strength += 10;
  
  if (/[a-z]/.test(password)) strength += 15;
  if (/[A-Z]/.test(password)) strength += 15;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
  
  return Math.min(strength, 100);
}
