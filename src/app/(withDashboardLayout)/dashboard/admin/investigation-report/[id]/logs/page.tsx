'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useGetLocalReportByIdQuery } from '@/redux/api/reportApis';

export default function ReportLogsPage() {
  const params = useParams();
  const id = (params as any)?.id as string;
  const { data: report } = useGetLocalReportByIdQuery(id as any, { skip: !id });

  const audit = (Array.isArray((report as any)?.audit) ? (report as any).audit : []) as any[];

  const fieldLabelBn: Record<string, string> = {
    // header
    'header.thana_id': 'থানা',
    'header.case_type': 'কেসের ধরন',
    'header.gd_cid_case_no': 'জিডি/সিআইডি/কেস নং',
    'header.ref_date': 'রেফারেন্স তারিখ',
    'header.pm_no': 'পিএম নং',
    'header.report_date': 'প্রতিবেদনের তারিখ',
    'header.station': 'স্টেশন',
    // general
    'general.person_name': 'নাম',
    'general.gender': 'লিঙ্গ',
    'general.age_years': 'বয়স (বছর)',
    'general.caste_tribe': 'গোত্র',
    'general.brought_from_village': 'গ্রাম (যেখান থেকে আনা হয়েছে)',
    'general.brought_from_thana': 'থানা (যেখান থেকে আনা হয়েছে)',
    'general.constable_name': 'কনস্টেবল নাম',
    'general.relatives_names': 'আত্মীয়দের নাম',
    'general.sent_datetime': 'প্রেরণের সময়',
    'general.brought_datetime': 'আনয়নের সময়',
    'general.exam_datetime': 'পরীক্ষার সময়',
    'general.police_info': 'পুলিশের তথ্য',
    'general.identifier_name': 'সনাক্তকারী ব্যক্তির নাম',
    // external signs
    'external_signs.physique_state': 'শারীরিক অবস্থা',
    'external_signs.wounds_desc': 'যখমের বিবরণ',
    'external_signs.injuries_desc': 'আঘাতের বিবরণ',
    'external_signs.neck_marks': 'গলার চিহ্ন',
    // head & spine
    'head_spine.scalp': 'স্কাল্প',
    'head_spine.skull': 'খুলি',
    'head_spine.vertebrae': 'মেরুদণ্ডের অস্থি (ভার্টিব্রা)',
    'head_spine.meninges': 'ঝিল্লী (মেনিনজেস)',
    'head_spine.brain': 'মস্তিষ্ক',
    'head_spine.spinal_cord': 'স্পাইনাল কর্ড',
    // chest & lungs
    'chest_lungs.ribs_cartilage': 'পাজর ও কোমলাস্থি',
    'chest_lungs.pleura': 'ফুসফুস আবরণী (প্লুরা)',
    'chest_lungs.larynx': 'বাকযন্ত্র (লারিংক্স)',
    'chest_lungs.trachea': 'শ্বাসনালী (ট্রেকিয়া)',
    'chest_lungs.right_lung': 'ডান ফুসফুস',
    'chest_lungs.left_lung': 'বাম ফুসফুস',
    'chest_lungs.pericardium': 'হৃদপিণ্ডের ঝিল্লী (পেরিকার্ডিয়াম)',
    'chest_lungs.heart': 'হৃদপিণ্ড',
    'chest_lungs.blood_vessels': 'রক্তনালী',
    // abdomen
    'abdomen.abdominal_general': 'উদর (সাধারণ)',
    'abdomen.peritoneum': 'উদরের উপরের ঝিল্লী',
    'abdomen.mouth_trachea_esophagus': 'মুখ/শ্বাসনালী/অন্ননালী',
    'abdomen.stomach_and_contents': 'পাকস্থলী ও বিষয়বস্তু',
    'abdomen.small_intestine_and_contents': 'ক্ষুদ্রান্ত্র ও বিষয়বস্তু',
    'abdomen.large_intestine_and_contents': 'বৃহদান্ত্র ও বিষয়বস্তু',
    'abdomen.liver': 'যকৃত',
    'abdomen.spleen': 'প্লীহা',
    'abdomen.kidneys': 'কিডনি',
    'abdomen.urinary_bladder': 'মূত্রাশয়',
    'abdomen.genital_organs': 'প্রজনন অঙ্গসমূহ',
    // musculoskeletal
    'musculoskeletal.ms_wounds': 'যখম (মাংসপেশী/হাড়)',
    'musculoskeletal.ms_disease_variations': 'রোগ/বিবর্ণতা (মাংসপেশী/হাড়)',
    'musculoskeletal.fractures': 'অস্থিভঙ্গ',
    'musculoskeletal.dislocations': 'স্থানচ্যুতি',
    // detailed pathology (root field used across)
    'pathology_description': 'রোগ/যখমের বিস্তারিত বিবরণ',
    // opinions
    'opinions.medical_officer_opinion': 'মেডিক্যাল অফিসারের মতামত',
    'opinions.civil_surgeon_remark': 'সিভিল সার্জনের মন্তব্য',
  };

  const translateField = (path: string) => fieldLabelBn[path] || path.replace(/_/g, ' ');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">অডিট লগ</h1>
        <Link href={`/dashboard/admin/investigation-report/${id}`} className="text-sky-600 hover:underline">রিপোর্টে ফিরে যান</Link>
      </div>

      {audit.length === 0 ? (
        <div className="text-gray-600">কোনো অডিট তথ্য পাওয়া যায়নি।</div>
      ) : (
        <div className="space-y-4">
          {audit.map((userItem: any) => (
            <div key={userItem.by} className="border rounded-lg bg-white">
              <div className="px-4 py-2 border-b bg-gray-50 text-gray-700 font-medium">ব্যবহারকারী: {userItem.by}</div>
              <ul className="divide-y">
                {(userItem.actions || []).map((a: any, idx: number) => (
                  <li key={idx} className="px-4 py-3">
                    <div className="text-sm text-gray-700">সময়: {new Date(a.at).toLocaleString('bn-BD')}</div>
                    {Array.isArray(a.fields) && a.fields.length > 0 ? (
                      <div className="text-sm text-gray-700 mt-2">
                        <div className="font-medium">পরিবর্তিত ক্ষেত্রসমূহ:</div>
                        <ul className="list-disc list-inside text-gray-700 mt-1">
                          {a.fields.map((f: string) => (
                            <li key={f}>{translateField(f)}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 mt-2">কোনো ক্ষেত্র পরিবর্তন হয়নি</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


