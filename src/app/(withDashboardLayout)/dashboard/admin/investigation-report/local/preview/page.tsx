"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useGetReportByIdQuery } from '@/redux/api/getApis';

function A4({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white mx-auto shadow-sm" style={{ width: '210mm', minHeight: '297mm', padding: '12mm' }}>
      {children}
    </div>
  );
}

export default function LocalReportPreviewPage() {
  const params = useSearchParams();
  const id = params.get('id');
  const { data: report, isLoading: loading } = useGetReportByIdQuery(id || '', { skip: !id });

  const header = report?.header || {};
  const general = report?.general || {};

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Local Report Preview</h1>
        <Button onClick={() => window.print()}>Print</Button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : !report ? (
        <div className="text-sm text-gray-500">Report not found.</div>
      ) : (
        <A4>
          <div className="text-center mb-4">
            <div className="font-bold">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
            <div>স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়</div>
            <div className="font-semibold">ভিকটিমের আইনানুগ পরীক্ষার প্রতিবেদন</div>
          </div>
          <div className="grid grid-cols-12 gap-2 text-sm">
            <div className="col-span-6">সূত্রঃ থানা: {header?.thana_id || '-'}, মামলা/জিডি/সিআইডিঃ {header?.case_type || '-'} {header?.gd_cid_case_no || '-'}</div>
            <div className="col-span-3">তারিখঃ {header?.report_date || header?.ref_date || '-'}</div>
            <div className="col-span-3">স্মারক নং: {header?.pm_no || '-'}</div>
          </div>
          <hr className="my-2" />
          <div className="text-sm space-y-2">
            <div>১) মেডিকেলের পরীক্ষা/চিকিৎসা প্রদানকারী প্রতিষ্ঠানের নাম ও ঠিকানা: ফরেনসিক মেডিসিন বিভাগ, ঢাকা মেডিকেল কলেজ, ঢাকা</div>
            <div>২) ভিকটিমের পরিচয়ঃ ক) নাম: {general?.person_name || '-'} খ) বয়স: {general?.age_years || '-'} গ) লিঙ্গ: {general?.gender || '-'} ঘ) ধর্ম: {general?.caste_tribe || '-'}</div>
            <div>ঙ) পিতা/মাতা/স্বামী নাম: {general?.relatives_names || '-'}</div>
            <div>চ) ঠিকানা: {general?.brought_from_village || '-'}, থানা: {general?.brought_from_thana || '-'}</div>
            <div>৩) সনাক্তকারী/আনয়নকারীর নাম ও ঠিকানা: {general?.identifier_name || '-'}</div>
          </div>
        </A4>
      )}
    </div>
  );
}


