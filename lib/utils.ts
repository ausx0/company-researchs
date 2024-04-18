import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatPrice(price: number | undefined): string {
  if (price === undefined || price === null) return ""; // Return empty string if price is undefined or null
  // Format the price with commas as thousands separators
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD", // Use USD temporarily to get the correct number formatting
    maximumFractionDigits: 2, // Adjust as needed
  });
  // Replace the currency symbol with "IQD" and move it to the right
  const iqdBilled =
    formattedPrice.replace("USD", "IQD").replace("$", "") + " IQD";
  // Remove the decimal part if the price is an integer
  return price % 1 === 0 ? iqdBilled.replace(".00", "") : iqdBilled;
}
