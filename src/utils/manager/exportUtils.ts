import { BookingWeek } from '@/components/manager/types/BookingTypes';

/**
 * Export booking data as CSV
 */
export const exportCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data.length) return;
  
  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        // Handle values with commas by quoting
        const value = row[header]?.toString() || '';
        return value.includes(',') ? `"${value}"` : value;
      }).join(',')
    )
  ];
  
  // Join rows with newlines
  const csvContent = csvRows.join('\n');
  
  // Create and download blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
};

/**
 * Export booking data as JSON
 */
export const exportJSON = (data: Record<string, unknown>[], filename: string) => {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    downloadBlob(blob, `${filename}.json`);
  } catch (error) {
    console.error("Error exporting JSON:", error);
    // Consider adding user-facing error feedback here, e.g., using a toast notification library
    alert("Failed to export data as JSON. Please check the console for details.");
  }
};

/**
 * Helper function to download a blob as a file
 */
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Format booking data for export
 */
export const formatBookingData = (bookings: BookingWeek[]) => {
  return bookings.map(week => ({
    ID: week.booking_id || '-',
    PERIOD: week.week_number,
    STATUS: week.status.toUpperCase(),
    DIRECTION: week.direction || '-',
    MEAL_PLAN: week.meal_plan || '-',
    AGENT: week.agent || '-'
  }));
};
