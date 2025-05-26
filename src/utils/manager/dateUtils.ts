
/**
 * Check if week is in the past based on the end date
 */
export const isPastWeek = (weekStr: string): boolean => {
  // Extract the end date from string like "27/9 - 4/10/2025"
  const parts = weekStr.split(' - ');
  if (parts.length !== 2) return false;
  
  const endDateStr = parts[1];
  const [day, month, year] = endDateStr.split('/');
  
  if (!day || !month || !year) return false;
  
  const endDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return endDate < new Date();
};
