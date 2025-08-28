"use client";
import React, { useCallback, useRef } from 'react';
import Head from 'next/head';
import { useHeaderFacility } from '@/hooks/useHeaderFacility';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import { Tiro_Bangla } from 'next/font/google';
const tiroBangla = Tiro_Bangla({
  weight: '400',
  subsets: ['bengali'],
  display: 'swap',
});

// Place the template image at public/templates/med-exam-header.png
// The page renders data on top of it and supports printing and PDF download

function A4Sheet({ children, ...rest }: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={`bg-white mx-auto shadow-sm print:shadow-none tiro-bn ${tiroBangla.className}`} style={{ width: '210mm', minHeight: '297mm', padding: '10mm', position: 'relative', fontFamily: `'TiroBanglaLocal', ${tiroBangla.style.fontFamily}` }}>
      {children}
    </div>
  );
}

export default function MedExamHeaderPreviewPage() {
  const { data } = useHeaderFacility();
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const onDownloadPdf = useCallback(async () => {
    if (!sheetRef.current) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    // Use html method to render; scale to fit width
    await pdf.html(sheetRef.current, {
      x: 0,
      y: 0,
      html2canvas: { scale: 0.8, useCORS: true },
      callback: (doc: { save: (arg0: string) => any; }) => doc.save('med-exam-header.pdf'),
    } as any);
  }, []);

  const header = data || {};

  // Convert English digits to Bengali digits
  const toBn = (value: any): string => {
    const str = String(value ?? '');
    const map: Record<string, string> = {
      '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
      '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    };
    return str.replace(/[0-9]/g, (d) => map[d] || d);
  };

  const toBnDate = (value: any): string => {
    if (!value) return '';
    const str = typeof value === 'string' ? value : new Date(value).toISOString().slice(0, 10);
    return toBn(str);
  };

  // Translate common enum-like English values to Bangla labels
  const toBnLabel = (value: any): string => {
    const v = String(value ?? '').toLowerCase();
    const map: Record<string, string> = {
      islam: 'ইসলাম',
      hinduism: 'হিন্দুধর্ম',
      hindu: 'হিন্দুধর্ম',
      christianity: 'খ্রিস্টধর্ম',
      christian: 'খ্রিস্টধর্ম',
      buddhism: 'বৌদ্ধধর্ম',
      buddhist: 'বৌদ্ধধর্ম',
      other: 'অন্যান্য',
      male: 'পুরুষ',
      female: 'মহিলা',
      other_gender: 'অন্যান্য',
    };
    return map[v] || value || '';
  };

  if (!mounted) return null;

  return (
    <div className="p-4 space-y-4">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla:ital@0;1&display=swap');
          .tiro-bn, .tiro-bn * { font-family: 'Tiro Bangla', serif; }
          @media print { .tiro-bn, .tiro-bn * { font-family: 'Tiro Bangla', serif !important; } }
        `}</style>
      </Head>
      <div className="flex items-center justify-between print:hidden">
        <h1 className="text-xl font-semibold">Medical Exam - Header/Facility Preview</h1>
        <div className="flex gap-2">
          <Button onClick={() => window.print()}>Print</Button>
          <Button onClick={onDownloadPdf} className="bg-emerald-600 hover:bg-emerald-700 text-white">Download PDF</Button>
        </div>
      </div>
      <A4Sheet suppressHydrationWarning>
        <div ref={sheetRef} className="relative" style={{ width: '190mm', minHeight: '277mm', fontSize: '12px', lineHeight: '1.4' }}>
          {/* Top: photo box and title inside the SAME container; other fields go below */}
          <div style={{ marginTop: '14mm', marginLeft: '18mm', marginRight: '18mm' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1mm' }}>
              <div className="border-2 border-black flex items-center justify-center" style={{ width: '15mm', height: '15mm' }}>
                <div className="text-center text-xs leading-tight">
                  <div>সত্যায়িত</div>
                  <div>ছবি</div>
                </div>
              </div>
              <div className="text-center leading-tight" style={{ flex: 1 }}>
                <div className="font-bold" style={{ fontSize: '16px' }}>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                <div style={{ fontSize: '14px' }}>স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়</div>
                <div className="font-semibold " style={{ fontSize: '14px' }}>ভিকটিমের আইনানুগ পরীক্ষার প্রতিবেদন।</div>
              </div>
            </div>
          
          </div>

          {/* Main content */}
          <div style={{ marginTop: '6mm', marginLeft: '18mm', marginRight: '18mm', position: 'relative', zIndex: 1 }}>
            {/* Case/memo left, date right with space between */}
            <div className="mb-2 flex items-center">
              <div className="flex items-center" style={{ gap: '3mm' }}>
                <span>স্বারক নং-ফমে/ঢামেক/এম.এল/</span>
                <span className="inline-block " style={{ width: '40mm' }}>
                  <span className="px-1">{mounted ? toBn(header.memo_no || '') : ''}</span>
                </span>
              </div>
              <div className="flex items-center ml-auto" style={{ gap: '3mm' }}>
                <span>তারিখঃ</span>
                <span className="inline-block " style={{ width: '32mm' }}>
                  <span className="px-1">{mounted ? toBnDate(header.date) : ''}</span>
                </span>
              </div>
            </div>

            {/* Source: thana + case no (left) and Date (right) */}
            <div className="mb-2 flex items-center">
              <div className="flex items-center" style={{ gap: '3mm' }}>
                <span>সূত্রঃ</span>
                <span className="inline-block " style={{ width: '80mm' }}>
                  <span className="px-1">{mounted ? `${header.source_thana || ''}${header.case_no ? ' + ' + toBn(header.case_no) : ''}` : ''}</span>
                </span>
              </div>
              <div className="flex items-center ml-auto" style={{ gap: '3mm' }}>
                <span>তারিখঃ</span>
                <span className="inline-block " style={{ width: '32mm' }}>
                  <span className="px-1">{mounted ? toBnDate(header.case_issue_date || header.date) : ''}</span>
                </span>
              </div>
            </div>

            {/* Institution info */}
            <div className="mb-2">
              <span>১) মেডিকেল পরীক্ষা/চিকিৎসা প্রদানকারী প্রতিষ্ঠানের নাম ও ঠিকানাঃ ফরেনসিক মেডিসিন বিভাগ, ঢাকা মেডিকেল কলেজ, ঢাকা।</span>
            </div>

            {/* Victim identity */}
            <div className="mb-2">
              <div className="mb-1">২) ভিকটিমের পরিচয়ঃ ক) নামঃ 
                <span className="border-b border-dotted border-gray-600 inline-block ml-2" style={{ minWidth: '80mm' }}>{mounted ? (header.victim_name || '') : ''}</span>
              </div>
              <div className="mb-1 ml-2 flex items-center">
                <span>খ) বয়স (ভাষ্য মতে) ঃ </span>
                <span className="border-b border-dotted border-gray-600 inline-block" style={{ minWidth: '25mm' }}>{mounted ? toBn(header.victim_age || '') : ''}</span>
                <span className="ml-4">গ) লিঙ্গঃ</span>
                <span className="border-b  border-dotted border-gray-600 inline-block" style={{ minWidth: '20mm' }}>{mounted ? (header.victim_gender === 'male' ? 'পুরুষ' : header.victim_gender === 'female' ? 'মহিলা' : header.victim_gender || '') : ''}</span>
                <span className="ml-4">ঘ) ধর্মঃ</span>
                <span className="border-b  border-dotted border-gray-600 inline-block" style={{ minWidth: '25mm' }}>{mounted ? toBnLabel(header.victim_religion) : ''}</span>
              </div>
              <div className="mb-1 ml-2">
                <span>ঙ) পেশাঃ</span>
                <span className="border-b border-dotted border-gray-600 inline-block ml-2" style={{ minWidth: '50mm' }}>{mounted ? (header.victim_occupation || '') : ''}</span>
              </div>
              <div className="mb-1 ml-2">
                <span>চ) </span>
                {(() => {
                  const gt = mounted ? String(header.guardian_type || '').toLowerCase() : '';
                  const isFather = gt === 'father';
                  const isMother = gt === 'mother';
                  const isHusband = gt === 'husband';
                  return (
                    <>
                      <span className={isFather ? 'font-bold' : undefined}>পিতা</span>
                      <span>/</span>
                      <span className={isMother ? 'font-bold' : undefined}>মাতা</span>
                      <span>/</span>
                      <span className={isHusband ? 'font-bold' : undefined}>স্বামীর</span>
                      <span> নামঃ</span>
                    </>
                  );
                })()}
                <span className="border-b border-dotted border-gray-600 inline-block ml-2" style={{ minWidth: '80mm' }}>{mounted ? (header.guardian_name || '') : ''}</span>
              </div>
              <div className="mb-1 ml-2">
                <span>ছ) ঠিকানাঃ</span>
                <span className="border-b border-dotted border-gray-600 inline-block ml-2" style={{ minWidth: '120mm' }}>{mounted ? (header.victim_address || '') : ''}</span>
              </div>
            </div>

            <div className=" mb-2"></div>

            {/* Identifier info */}
            <div className="mb-2">
              <span>৩) সনাক্তকারী/আনয়নকারীর নাম ও ঠিকানাঃ </span>
              <span className="border-b border-dotted border-gray-600 inline-block ml-2" style={{ minWidth: '80mm' }}>
                {mounted ? ((header.identifier_name || '') + (header.identifier_address ? `, ${header.identifier_address}` : '')) : ''}
              </span>
            </div>


            {/* Consent section */}
            <div className="mb-2">
              <div className="mb-2">
                <span>৪) সম্মতিঃ ও ডাক্তারী পরীক্ষার ফলাফল আমার পক্ষে বা বিপক্ষে যাইতে পারে জানিয়া আমি আমার গোপনাঙ্গ সহ সর্বাঙ্গ ডাক্তারী পরীক্ষা করাইতে রাজী আছি।</span>
              </div>
              
              {/* Witness signature area */}
              <div className="flex justify-between items-end" style={{ marginTop: '5mm' }}>
                <div className="text-sm" style={{ width: '100mm' }}>
                  <div className="mb-1">সাক্ষীঃ</div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>১।</span>
                    <span className="flex-1 ">
                      <span className="px-1">{Array.isArray(header.witnesses) ? (header.witnesses[0] || '') : ''}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>২।</span>
                    <span className="flex-1 ">
                      <span className="px-1">{Array.isArray(header.witnesses) ? (header.witnesses[1] || '') : ''}</span>
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="" style={{ width: '60mm', height: '1px', marginBottom: '2mm' }}></div>
                  <div className="text-xs">ভিকটিমের স্বাক্ষর ও টিপসই</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </A4Sheet>
    </div>
  );
}


