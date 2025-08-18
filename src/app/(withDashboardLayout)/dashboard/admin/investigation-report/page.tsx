'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout } from 'lucide-react';
import Link from 'next/link';
import { useGetLocalReportsQuery } from '@/redux/api/reportApis';

export default function InvestigationReportsPage() {
  const { data: reports = [], isLoading, isError } = useGetLocalReportsQuery();
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
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        {isLoading && <p className="text-gray-500 text-center">Loading...</p>}
        {isError && <p className="text-red-500 text-center">Failed to load reports</p>}
        {!isLoading && Array.isArray(reports) && reports.length === 0 && (
          <p className="text-gray-500 text-center">No reports found</p>
        )}
        {!isLoading && Array.isArray(reports) && reports.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2">ID</th>
                  <th className="text-left px-3 py-2">PM No</th>
                  <th className="text-left px-3 py-2">Person</th>
                  <th className="text-left px-3 py-2">Case Type</th>
                  <th className="text-left px-3 py-2">Updated</th>
                  <th className="text-left px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0).reverse().map((r: any) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">{r.id}</td>
                    <td className="px-3 py-2">{r?.header?.pm_no ?? '-'}</td>
                    <td className="px-3 py-2">{r?.general?.person_name ?? '-'}</td>
                    <td className="px-3 py-2">{r?.header?.case_type ?? '-'}</td>
                    <td className="px-3 py-2">{r.updatedAt ?? '-'}</td>
                    <td className="px-3 py-2 space-x-3">
                      <Link className="text-blue-600 hover:underline" href={`/dashboard/admin/investigation-report/create?id=${r.id}`}>
                        Edit (Design 1)
                      </Link>
                      <Link className="text-purple-600 hover:underline" href={`/dashboard/admin/investigation-report/create-design2?id=${r.id}`}>
                        Edit (Design 2)
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
