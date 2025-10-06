import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string, autoClearMs: number = 30000): Promise<void> {
  return new Promise((resolve, reject) => {
    navigator.clipboard.writeText(text).then(() => {
      // Auto-clear clipboard after specified time
      setTimeout(() => {
        navigator.clipboard.writeText('');
      }, autoClearMs);
      resolve();
    }).catch(reject);
  });
}
