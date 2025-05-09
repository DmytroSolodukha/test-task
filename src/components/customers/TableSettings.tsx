'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Cog6ToothIcon, ArrowsUpDownIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useTablePreferences } from '@/context/TablePreferencesContext';
import { SortField } from '@/types';

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'plan', label: 'Plan' },
  { id: 'status', label: 'Status' }
];

export default function TableSettings() {
  const { preferences, updatePreferences } = useTablePreferences();

  const handleSortChange = (field: SortField) => {
    const newDirection = preferences.sortConfig.field === field && preferences.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    updatePreferences({
      sortConfig: { field, direction: newDirection }
    });
  };

  const toggleColumn = (columnId: string) => {
    const newVisibleColumns = preferences.visibleColumns.includes(columnId)
      ? preferences.visibleColumns.filter(id => id !== columnId)
      : [...preferences.visibleColumns, columnId];
    updatePreferences({ visibleColumns: newVisibleColumns });
  };

  const handleItemsPerPageChange = (value: number) => {
    updatePreferences({ itemsPerPage: value });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-3 py-1.5 border-2 border-gray-200 bg-gray-50 text-gray-700 rounded-md font-medium shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-500">
        <Cog6ToothIcon className="h-4 w-4 mr-1.5" />
        Settings
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
              Sort by
            </div>
            {columns.map((column) => (
              <Menu.Item key={column.id}>
                {({ active }) => (
                  <button
                    onClick={() => handleSortChange(column.id as SortField)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } ${
                      preferences.sortConfig.field === column.id ? 'text-blue-600' : 'text-gray-700'
                    } flex w-full items-center px-3 py-2 text-sm`}
                  >
                    <ArrowsUpDownIcon className="h-4 w-4 mr-2" />
                    {column.label}
                    {preferences.sortConfig.field === column.id && (
                      <span className="ml-2 text-xs">
                        ({preferences.sortConfig.direction === 'asc' ? '↑' : '↓'})
                      </span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}

            <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
              Visible Columns
            </div>
            {columns.map((column) => (
              <Menu.Item key={column.id}>
                {({ active }) => (
                  <button
                    onClick={() => toggleColumn(column.id)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } ${
                      preferences.visibleColumns.includes(column.id) ? 'text-blue-600' : 'text-gray-700'
                    } flex w-full items-center px-3 py-2 text-sm`}
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    {column.label}
                  </button>
                )}
              </Menu.Item>
            ))}

            <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-200">
              Items per page
            </div>
            <div className="px-3 py-2">
              <select
                value={preferences.itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="block w-full pl-2.5 pr-10 py-1.5 text-sm border-2 rounded-md font-medium shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-gray-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
} 