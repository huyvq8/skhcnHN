'use client';

import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    required: boolean;
  }>;
  onStepClick?: (stepIndex: number) => void;
}

export default function FormProgress({
  currentStep,
  totalSteps,
  steps,
  onStepClick
}: FormProgressProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-4">
      {/* Compact Progress Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {currentStep + 1}/{totalSteps} bước
            </span>
            <span className="text-xs text-gray-500">
              • {steps[currentStep]?.title}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={isExpanded ? "Thu gọn" : "Mở rộng"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Steps List */}
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-100">
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                  index <= currentStep
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                } ${onStepClick ? 'hover:bg-blue-100' : ''}`}
                onClick={() => onStepClick && onStepClick(index)}
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Circle className={`h-4 w-4 ${
                      index <= currentStep ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className={`text-xs font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                      {step.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h4>
                    {index === currentStep && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Hiện tại
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion Message */}
          {currentStep === totalSteps && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <p className="text-xs font-medium text-green-800">
                  Hoàn thành! Có thể gửi form.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
