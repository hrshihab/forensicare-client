import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout } from 'lucide-react';
import Link from 'next/link';

export default function InvestigationReportsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investigation Reports</h1>
          <p className="text-gray-600 mt-2">Manage and view forensic investigation reports</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard/admin/investigation-report/create">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Report
            </Button>
          </Link>
          <Link href="/dashboard/admin/investigation-report/create-design2">
            <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
              <Layout className="w-4 h-4 mr-2" />
              Create Report (Design 2)
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Add your investigation reports list/table here */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <p className="text-gray-500 text-center">Investigation reports list will be implemented here</p>
      </div>
    </div>
  );
}
