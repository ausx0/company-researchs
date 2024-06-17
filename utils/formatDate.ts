// utils/formatDate.ts
export function formatDate(
  dateString: string,
  format: string = "yyyy/mm/dd"
): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return format.replace("yyyy", year).replace("mm", month).replace("dd", day);
}
