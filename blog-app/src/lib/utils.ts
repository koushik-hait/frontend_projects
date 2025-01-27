import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class LocalStore {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export const extractUsernameOrEmail = (
  inputValue: string
): { username?: string; email?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const delimiter = "@";

  let result: { username?: string; email?: string } = {};

  if (emailRegex.test(inputValue)) {
    // Extract email from input value
    const email = inputValue.match(emailRegex);
    result.email = email![0];
  } else if (inputValue.includes(delimiter)) {
    // Extract username from input value
    const [username] = inputValue.split(delimiter);
    result.username = username;
  }

  return result;
};

// Example usage
// const inputValue = "username@example.com";
// const extracted = extractUsernameOrEmail(inputValue);
// console.log(extracted); // Output: { email: 'username@example.com' }

export const notifySearchEngines = async () => {
  try {
    await axios.get(
      `https://www.google.com/ping?sitemap=https://blog.koushikhait.site/sitemap.xml`
    );
    console.log("Notified search engines about sitemap update.");
  } catch (error) {
    console.error("Error notifying search engines:", error);
  }
};
