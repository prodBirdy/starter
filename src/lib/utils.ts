import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses a CSV file and returns a 2D array of strings
 * @param file The CSV file to parse
 * @returns A promise that resolves to a 2D array of strings
 */
export const parseCSV = async (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          return reject(new Error('Failed to read file'));
        }

        // Split the CSV data into rows and columns
        const rows = text.split('\n');
        const data = rows
          .filter(row => row.trim()) // Remove empty rows
          .map(row => row.split(',').map(cell => cell.trim()));

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};
