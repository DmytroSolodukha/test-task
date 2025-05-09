export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'active' | 'inactive';
  onboarding: {
    profileSetup: boolean;
    companyInfo: boolean;
    paymentMethod: boolean;
    teamMembers: boolean;
  };
}

export type SortField = 'name' | 'email' | 'plan' | 'status';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  plan: string;
  status: string;
  searchQuery: string;
  onboardingStatus: string;
}

export interface TablePreferences {
  sortConfig: SortConfig;
  filterConfig: FilterConfig;
  itemsPerPage: number;
  visibleColumns: string[];
} 