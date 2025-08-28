'use client';

import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useGetReportByIdQuery } from '@/redux/api/getApis';

export default function ReportViewPage() {
  const params = useParams();
  const id = (params as any)?.id as string;
  const { data: report } = useGetReportByIdQuery(id as any, { skip: !id });

  const rows = useMemo(() => {
    if (!report) return [] as Array<{ label: string; value: any }>
    const r: any = report;
    const items: Array<{ label: string; value: any }> = [];
    const push = (label: string, value: any) => items.push({ label, value });
    push('ID', r.id);
    push('Status', r.status);
    push('Locked', String(r.locked));
    push('PM No', r?.header?.pm_no);
    push('Case Type', r?.header?.case_type);
    push('Station', r?.header?.station);
    push('Person', r?.general?.person_name);
    push('Gender', r?.general?.gender);
    push('Age (years)', r?.general?.age_years);
    push('Updated At', r?.updatedAt);
    return items;
  }, [report]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Report Overview</h1>
        <div className="space-x-3">
          <Link href={`/dashboard/admin/investigation-report/create?id=${id}`} className="text-sky-600 hover:underline">Edit D1</Link>
          <Link href={`/dashboard/admin/investigation-report/create-design2?id=${id}`} className="text-purple-600 hover:underline">Edit D2</Link>
          <Link href={`/dashboard/admin/investigation-report/${id}/logs`} className="text-amber-700 hover:underline">Logs</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map((row) => (
          <div key={row.label} className="rounded-lg border p-4 bg-white">
            <div className="text-xs uppercase text-gray-500">{row.label}</div>
            <div className="text-gray-900">{String(row.value ?? '-')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


