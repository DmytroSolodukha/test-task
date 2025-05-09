import { Suspense } from 'react';
import CustomersTable from '@/components/customers/CustomersTable';

export default function CustomersPage() {
  return (
    <div className="space-y-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all customers in your account including their name, email, plan, and status.
          </p>
        </div>
      </div>
      
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomersTable />
      </Suspense>
    </div>
  );
} 