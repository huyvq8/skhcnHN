'use client';

import { CheckCircle } from 'lucide-react';

interface CompactProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
  className?: string;
}

export default function CompactProgressBar({
  currentStep,
  totalSteps,
  steps,
  className = ""
}: CompactProgressBarProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
  const completedSteps = steps.filter(step => step.completed).length;

  return (
    <div className={`bg-white border-b border-gray-200 sticky top-16 z-40 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Progress Bar */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex items-center space-x-1">
              <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600 ml-2">
                {completedSteps}/{totalSteps}
              </span>
            </div>
            
            {/* Current Step */}
            <span className="text-xs text-gray-500 truncate max-w-32">
              {steps[currentStep]?.title}
            </span>
          </div>

          {/* Completion Status */}
          <div className="flex items-center space-x-2">
            {completedSteps === totalSteps ? (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-xs font-medium">Hoàn thành</span>
              </div>
            ) : (
              <span className="text-xs text-gray-500">
                Bước {currentStep + 1}/{totalSteps}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
