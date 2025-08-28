"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGetReportsQuery } from '@/redux/api/getApis';

export default function LocalReportsPage() {
  const { data, isLoading } = useGetReportsQuery();
  const reports = Array.isArray(data) ? data : [];

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Local JSON Reports</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-2">
          {reports.length === 0 && <div className="text-sm text-gray-500">No local reports found.</div>}
          {reports.map((r) => (
            <div key={r?.id} className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium">ID: {r?.id}</div>
                <div>Status: {r?.status || 'draft'}</div>
                <div>Updated: {r?.updatedAt || '-'}</div>
              </div>
              <div className="flex gap-2">
                <Link href={`./local/preview?id=${encodeURIComponent(r?.id || '')}`}>
                  <Button variant="secondary">Preview/Print</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


