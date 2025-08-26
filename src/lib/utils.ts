import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind CSS classes efficiently
// Combines clsx for conditional classes and twMerge for deduplication
// Used throughout the app for dynamic styling
export function mergeClassNames(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Alias for backward compatibility - TODO: migrate to mergeClassNames
export const cn = mergeClassNames
