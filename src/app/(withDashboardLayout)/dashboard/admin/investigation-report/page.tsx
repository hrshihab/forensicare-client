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
                  <th className="text-left px-3 py-2">Status</th>
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
                    <td className="px-3 py-2">
                      {r.locked ? (
                        <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md text-xs">Locked</span>
                      ) : (
                        <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-md text-xs">Draft</span>
                      )}
                    </td>
                    <td className="px-3 py-2 space-x-3">
                      <Link className="text-blue-600 hover:underline" href={`/dashboard/admin/investigation-report/create?id=${r.id}`}>
                        Edit (Design 1)
                      </Link>
                      <Link className="text-purple-600 hover:underline" href={`/dashboard/admin/investigation-report/create-design2?id=${r.id}`}>
                        Edit (Design 2)
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
