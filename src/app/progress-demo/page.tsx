'use client';

import React, { useState } from 'react';
import ProgressIndicator from '@/components/ui/progress-indicator';

export default function ProgressDemoPage() {
  const [formData, setFormData] = useState({
    externalSigns: { field1: true, field2: false, field3: true, field4: false },
    generalInfo: { field1: true, field2: true, field3: false, field4: true, field5: false },
    headSpine: { field1: false, field2: true, field3: false },
    chestLungs: { field1: true, field2: true, field3: false, field4: true, field5: false, field6: true },
    abdomen: { field1: false, field2: true, field3: false, field4: true },
    musculoskeletal: { field1: true, field2: false, field3: true, field4: false, field5: true }
  });

  const calculateProgress = (section: string) => {
    const fields = Object.values(formData[section as keyof typeof formData]);
    return fields.filter(Boolean).length;
  };

  const getTotalFields = (section: string) => {
    return Object.keys(formData[section as keyof typeof formData]).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Form Progress Indicators Demo</h1>
          <p className="text-gray-600">Reusable progress indicators for all form sections</p>
        </div>

        {/* External Signs Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">External Signs Section</h2>
              <p className="text-gray-600">External examination and signs</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('externalSigns')}
              totalFields={getTotalFields('externalSigns')}
              size="medium"
              variant="blue"
            />
          </div>
        </div>

        {/* General Information Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">General Information Section</h2>
              <p className="text-gray-600">Basic case information and details</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('generalInfo')}
              totalFields={getTotalFields('generalInfo')}
              size="medium"
              variant="green"
            />
          </div>
        </div>

        {/* Head & Spine Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Head & Spine Section</h2>
              <p className="text-gray-600">Neurological examination findings</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('headSpine')}
              totalFields={getTotalFields('headSpine')}
              size="small"
              variant="purple"
            />
          </div>
        </div>

        {/* Chest & Lungs Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Chest & Lungs Section</h2>
              <p className="text-gray-600">Respiratory system examination</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('chestLungs')}
              totalFields={getTotalFields('chestLungs')}
              size="large"
              variant="red"
            />
          </div>
        </div>

        {/* Abdomen Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Abdomen Section</h2>
              <p className="text-gray-600">Abdominal organ examination</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('abdomen')}
              totalFields={getTotalFields('abdomen')}
              size="medium"
              variant="yellow"
            />
          </div>
        </div>

        {/* Musculoskeletal Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Musculoskeletal Section</h2>
              <p className="text-gray-600">Bone and muscle examination</p>
            </div>
            <ProgressIndicator
              completedFields={calculateProgress('musculoskeletal')}
              totalFields={getTotalFields('musculoskeletal')}
              size="medium"
              variant="green"
            />
          </div>
        </div>

        {/* Compact Variants Row */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compact Progress Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProgressIndicator
              completedFields={3}
              totalFields={5}
              size="small"
              variant="blue"
              showPercentage={false}
            />
            <ProgressIndicator
              completedFields={2}
              totalFields={4}
              size="small"
              variant="red"
              showCounter={false}
            />
            <ProgressIndicator
              completedFields={4}
              totalFields={6}
              size="small"
              variant="purple"
            />
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use</h3>
          <div className="space-y-2 text-blue-800">
            <p><strong>Props:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code>completedFields</code>: Number of completed fields</li>
              <li><code>totalFields</code>: Total number of fields</li>
              <li><code>size</code>: "small" | "medium" | "large"</li>
              <li><code>variant</code>: "blue" | "green" | "red" | "yellow" | "purple"</li>
              <li><code>showPercentage</code>: Show/hide percentage (default: true)</li>
              <li><code>showCounter</code>: Show/hide field counter (default: true)</li>
              <li><code>className</code>: Additional CSS classes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
