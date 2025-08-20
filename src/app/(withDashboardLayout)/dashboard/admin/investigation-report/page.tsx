'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Layout } from 'lucide-react';
import Link from 'next/link';
import { useGetLocalReportsQuery, useUnlockLocalReportMutation } from '@/redux/api/reportApis';
import useUserInfo from '@/hooks/useUserInfo';
import { useGetUserInfoQuery } from '@/redux/api/getApis';

export default function InvestigationReportsPage() {
  const { data: reports = [], isLoading, isError } = useGetLocalReportsQuery();
  const [unlockReport] = useUnlockLocalReportMutation();
  const userInfo = useUserInfo();
  const rawUser = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
  let storedUsername = '' as string;
  try {
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      storedUsername = (parsed?.user?.username || parsed?.user?.userName || parsed?.user?.name || '').toString();
    }
  } catch {}
  const isAdminName = (userInfo?.username?.toLowerCase?.() === 'admin') || (storedUsername.toLowerCase?.() === 'admin');
  const { data: currentUserInfo } = useGetUserInfoQuery(Number((userInfo as any)?.userId || 0), { skip: !((userInfo as any)?.userId) });
  const isSuperUser = Boolean((currentUserInfo as any)?.isSuperUser || (currentUserInfo as any)?.IsSuperUser || (JSON.parse(rawUser || '{}')?.user?.isSuperUser) || (JSON.parse(rawUser || '{}')?.user?.IsSuperUser));

  const handleUnlock = async (id: string) => {
    if (!(isAdminName || isSuperUser)) return;
    try {
      await unlockReport({ id }).unwrap();
      alert('Editing unlocked for this report.');
    } catch (e: any) {
      alert(e?.data?.error || 'Unlock failed');
    }
  };
  return (
    <div className="p-6 overflow-x-hidden">
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
      
      <div className="bg-white rounded-xl shadow-sm border p-6">
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
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">PM No</th>
                  <th className="text-left px-4 py-3">Person</th>
                  <th className="text-left px-4 py-3">Case Type</th>
                  <th className="text-left px-4 py-3">Updated</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.slice(0).reverse().map((r: any) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{r.id}</td>
                    <td className="px-4 py-3">{r?.header?.pm_no ?? '-'}</td>
                    <td className="px-4 py-3">{r?.general?.person_name ?? '-'}</td>
                    <td className="px-4 py-3">{r?.header?.case_type ?? '-'}</td>
                    <td className="px-4 py-3">{r.updatedAt ?? '-'}</td>
                    <td className="px-4 py-3">
                      {r.locked ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-xs font-medium">Locked</span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 text-green-800 px-2.5 py-0.5 text-xs font-medium">Draft</span>
                      )}
                    </td>
                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <Link className="text-blue-600 hover:underline" href={`/dashboard/admin/investigation-report/${r.id}`}>
                        View
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link className="text-purple-600 hover:underline" href={`/dashboard/admin/investigation-report/create-design2?id=${r.id}`}>
                        Edit D2
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link className="text-sky-600 hover:underline" href={`/dashboard/admin/investigation-report/create?id=${r.id}`}>
                        Edit D1
                      </Link>
                      <span className="text-gray-300">|</span>
                      <Link className="text-amber-700 hover:underline" href={`/dashboard/admin/investigation-report/${r.id}/logs`}>
                        Logs
                      </Link>
                      {(isAdminName || isSuperUser) && r.locked && (
                        <Button onClick={() => handleUnlock(r.id)} variant="outline" className="ml-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 h-7 px-2 text-xs">
                          Allow Edit
                        </Button>
                      )}
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
