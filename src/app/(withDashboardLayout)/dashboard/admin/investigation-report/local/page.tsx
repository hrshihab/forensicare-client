"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function LocalReportsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/reports/local', { cache: 'no-store' });
        const json = await res.json();
        if (json?.ok) setReports(Array.isArray(json.data) ? json.data : []);
        else toast({ title: 'Failed to load', description: json?.error || 'Unknown error' });
      } catch (e: any) {
        toast({ title: 'Error', description: e?.message || String(e) });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [toast]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Local JSON Reports</h1>
      {loading ? (
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


