import React from 'react';
import { LucideIcon } from 'lucide-react';
import ProgressIndicator from './progress-indicator';

interface SectionHeaderProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description?: string;
  completedFields: number;
  totalFields: number;
  progressVariant?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  progressSize?: 'small' | 'medium' | 'large';
}

export default function SectionHeader({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  description,
  completedFields,
  totalFields,
  progressVariant = 'blue',
  progressSize = 'medium'
}: SectionHeaderProps) {
  // Accent palettes mapped to variant for cohesive look
  const accents: Record<string, { bar: string; spot1: string; spot2: string }> = {
    blue:   { bar: 'from-blue-500 via-indigo-500 to-sky-500',    spot1: 'bg-blue-200/40',    spot2: 'bg-indigo-200/40' },
    green:  { bar: 'from-emerald-500 via-green-500 to-teal-500', spot1: 'bg-emerald-200/40', spot2: 'bg-teal-200/40' },
    red:    { bar: 'from-rose-500 via-pink-500 to-fuchsia-500',  spot1: 'bg-rose-200/40',    spot2: 'bg-fuchsia-200/40' },
    yellow: { bar: 'from-amber-500 via-yellow-500 to-orange-500',spot1: 'bg-amber-200/40',   spot2: 'bg-orange-200/40' },
    purple: { bar: 'from-violet-500 via-purple-500 to-fuchsia-500', spot1: 'bg-violet-200/40', spot2: 'bg-purple-200/40' },
  };
  const accent = accents[progressVariant] ?? accents.blue;
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 p-5 md:p-6 shadow-sm ring-1 ring-black/5 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-px">
      {/* Top accent gradient bar (variant aware) */}
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accent.bar} opacity-90`} />
      {/* Soft background blobs for an eye-soothing feel */}
      <div className={`pointer-events-none absolute -top-10 -left-10 h-36 w-36 rounded-full blur-3xl ${accent.spot1}`} />
      <div className={`pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl ${accent.spot2}`} />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${iconBgColor} ring-1 ring-black/5 bg-white/80 backdrop-blur-sm transition-transform group-hover:scale-[1.02]`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-gray-600 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Progress Indicator - Right Side */}
        <ProgressIndicator
          completedFields={completedFields}
          totalFields={totalFields}
          size={progressSize}
          variant={progressVariant}
          showPercentage={true}
          showCounter={true}
        />
      </div>
    </div>
  );
}
