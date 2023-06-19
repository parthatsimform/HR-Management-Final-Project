export const useFormattedDate = () => {
function formattedDate(date: string): string {
    const today: Date = new Date(date);
    const year: number = today.getFullYear();
    const month: string = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return { formattedDate };
}