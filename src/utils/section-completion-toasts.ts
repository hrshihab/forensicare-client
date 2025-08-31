import { toast } from '@/components/ui/use-toast';
import { SectionId, computeSectionProgress } from './section-progress';

// Emoji mapping for each section
const SECTION_EMOJIS: Record<SectionId, string> = {
  header: '📋',
  general: '👤',
  external_signs: '🔍',
  head_spine: '🧠',
  chest_lungs: '🫁',
  abdomen: '🫃',
  musculoskeletal: '💪',
  detailed_pathology: '🔬',
  opinions: '💭',
};

// Section titles for display
const SECTION_TITLES: Record<SectionId, string> = {
  header: 'Header Information',
  general: 'General Information',
  external_signs: 'External Signs',
  head_spine: 'Head & Spine',
  chest_lungs: 'Chest & Lungs',
  abdomen: 'Abdomen',
  musculoskeletal: 'Musculoskeletal',
  detailed_pathology: 'Detailed Pathology',
  opinions: 'Medical Opinions',
};

// Success messages for each section
const SECTION_SUCCESS_MESSAGES: Record<SectionId, string> = {
  header: 'Header section completed! All basic information filled.',
  general: 'General information completed! Personal details are ready.',
  external_signs: 'External signs documented! Physical examination complete.',
  head_spine: 'Head & spine examination complete! Neurological assessment done.',
  chest_lungs: 'Chest & lungs examination complete! Respiratory assessment done.',
  abdomen: 'Abdominal examination complete! Internal organ assessment done.',
  musculoskeletal: 'Musculoskeletal examination complete! Movement assessment done.',
  detailed_pathology: 'Pathology details documented! Medical analysis complete.',
  opinions: 'Medical opinions documented! Professional assessment complete.',
};

export const showSectionCompletionToast = (
  sectionId: SectionId,
  formData: Record<string, any>,
  previousProgress: { completed: number; total: number }
) => {
  const currentProgress = computeSectionProgress(sectionId, formData);
  
  // Check if section was just completed (progress changed from incomplete to complete)
  const wasIncomplete = previousProgress.completed < previousProgress.total;
  const isNowComplete = currentProgress.completed === currentProgress.total;
  
  console.log(`Section ${sectionId}:`, {
    previous: previousProgress,
    current: currentProgress,
    wasIncomplete,
    isNowComplete
  });
  
  if (wasIncomplete && isNowComplete) {
    const emoji = SECTION_EMOJIS[sectionId];
    const title = SECTION_TITLES[sectionId];
    const message = SECTION_SUCCESS_MESSAGES[sectionId];
    const progress = `${currentProgress.completed}/${currentProgress.total}`;
    
    console.log(`🎉 Showing completion toast for ${sectionId}: ${emoji} ${title}`);
    
    // Force the toast to show immediately
    setTimeout(() => {
      toast({
        title: `${emoji} ${title} Complete!`,
        description: `${message} Progress: ${progress}`,
        duration: 4000,
        className: "bg-green-50 border-green-200 text-green-800",
      });
    }, 100);
  }
};

// Function to get section progress for tracking
export const getSectionProgress = (sectionId: SectionId, formData: Record<string, any>) => {
  return computeSectionProgress(sectionId, formData);
};

// Function to check if a section is complete
export const isSectionComplete = (sectionId: SectionId, formData: Record<string, any>): boolean => {
  const progress = computeSectionProgress(sectionId, formData);
  return progress.completed === progress.total;
};

// Function to get overall form completion percentage
export const getOverallCompletion = (formData: Record<string, any>): number => {
  const sections: SectionId[] = ['header', 'general', 'external_signs', 'head_spine', 'chest_lungs', 'abdomen', 'musculoskeletal', 'detailed_pathology', 'opinions'];
  
  let totalFields = 0;
  let completedFields = 0;
  
  sections.forEach(sectionId => {
    const progress = computeSectionProgress(sectionId, formData);
    totalFields += progress.total;
    completedFields += progress.completed;
  });
  
  return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
};
