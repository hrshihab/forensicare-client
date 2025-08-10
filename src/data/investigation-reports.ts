export interface InvestigationReportSummary {
  id: string;
  pm_no: string;
  thana: string;
  person_name: string;
  created_at: string;
  status: 'draft' | 'completed' | 'pending' | 'review';
  created_by: string;
}

export const sampleReports: InvestigationReportSummary[] = [
  {
    id: '1',
    pm_no: 'PM-001/2025',
    thana: 'ধানমন্ডি',
    person_name: 'আহমেদ হোসেন',
    created_at: '2025-01-15T10:30:00Z',
    status: 'completed',
    created_by: 'ডাঃ রহমান'
  },
  {
    id: '2',
    pm_no: 'PM-002/2025',
    thana: 'গুলশান',
    person_name: 'সারা আহমেদ',
    created_at: '2025-01-14T14:20:00Z',
    status: 'pending',
    created_by: 'ডাঃ খান'
  },
  {
    id: '3',
    pm_no: 'PM-003/2025',
    thana: 'বনানী',
    person_name: 'মোহাম্মদ আলী',
    created_at: '2025-01-13T09:15:00Z',
    status: 'review',
    created_by: 'ডাঃ সুলতানা'
  },
  {
    id: '4',
    pm_no: 'PM-004/2025',
    thana: 'ধানমন্ডি',
    person_name: 'ফাতেমা বেগম',
    created_at: '2025-01-12T16:45:00Z',
    status: 'draft',
    created_by: 'ডাঃ রহমান'
  },
  {
    id: '5',
    pm_no: 'PM-005/2025',
    thana: 'গুলশান',
    person_name: 'ইব্রাহিম খান',
    created_at: '2025-01-11T11:30:00Z',
    status: 'completed',
    created_by: 'ডাঃ খান'
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'review':
      return 'bg-blue-100 text-blue-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'সম্পন্ন';
    case 'pending':
      return 'অপেক্ষমান';
    case 'review':
      return 'পর্যালোচনা';
    case 'draft':
      return 'খসড়া';
    default:
      return status;
  }
};
