import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { User } from '@/types';

interface ExportButtonProps {
  customers: User[];
  filteredCustomers: User[];
}

export default function ExportButton({ customers, filteredCustomers }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToExcel = () => {
    setIsExporting(true);
    try {
      // Prepare data for export
      const data = filteredCustomers.map(customer => ({
        'Name': customer.name,
        'Email': customer.email,
        'Plan': customer.plan,
        'Status': customer.status,
        'Profile Setup': customer.onboarding.profileSetup ? 'Completed' : 'Not Completed',
        'Company Info': customer.onboarding.companyInfo ? 'Completed' : 'Not Completed',
        'Payment Method': customer.onboarding.paymentMethod ? 'Completed' : 'Not Completed',
        'Team Members': customer.onboarding.teamMembers ? 'Completed' : 'Not Completed'
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data);

      // Set column widths
      const wscols = [
        { wch: 20 }, // Name
        { wch: 30 }, // Email
        { wch: 15 }, // Plan
        { wch: 15 }, // Status
        { wch: 20 }, // Profile Setup
        { wch: 20 }, // Company Info
        { wch: 20 }, // Payment Method
        { wch: 20 }  // Team Members
      ];
      ws['!cols'] = wscols;

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Customers');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `customers_export_${date}.xlsx`;

      // Save file
      XLSX.writeFile(wb, filename);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={exportToExcel}
      disabled={isExporting || filteredCustomers.length === 0}
      className={`inline-flex items-center px-3 py-1.5 border-2 text-sm font-medium rounded-md shadow-sm transition-all duration-200
        ${isExporting || filteredCustomers.length === 0
          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-emerald-500'
        }`}
    >
      <ArrowDownTrayIcon className={`h-4 w-4 mr-1.5 ${isExporting ? 'animate-bounce' : ''}`} />
      {isExporting ? 'Exporting...' : 'Export to Excel'}
    </button>
  );
} 