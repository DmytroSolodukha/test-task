'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TablePreferences, SortConfig, FilterConfig } from '@/types';

interface TablePreferencesContextType {
  preferences: TablePreferences;
  updatePreferences: (newPreferences: Partial<TablePreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: TablePreferences = {
  sortConfig: {
    field: 'name',
    direction: 'asc'
  },
  filterConfig: {
    plan: 'all',
    status: 'all',
    searchQuery: '',
    onboardingStatus: 'all'
  },
  itemsPerPage: 10,
  visibleColumns: ['name', 'email', 'plan', 'status']
};

const TablePreferencesContext = createContext<TablePreferencesContextType | undefined>(undefined);

export function TablePreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<TablePreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tablePreferences');
      return saved ? JSON.parse(saved) : defaultPreferences;
    }
    return defaultPreferences;
  });

  useEffect(() => {
    localStorage.setItem('tablePreferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<TablePreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <TablePreferencesContext.Provider value={{ preferences, updatePreferences, resetPreferences }}>
      {children}
    </TablePreferencesContext.Provider>
  );
}

export function useTablePreferences() {
  const context = useContext(TablePreferencesContext);
  if (context === undefined) {
    throw new Error('useTablePreferences must be used within a TablePreferencesProvider');
  }
  return context;
} 