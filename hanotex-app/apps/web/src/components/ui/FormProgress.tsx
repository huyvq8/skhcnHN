'use client';

import { CheckCircle, Circle } from 'lucide-react';

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
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Tiến trình hoàn thiện</h3>
          <span className="text-sm font-medium text-blue-600">
            {currentStep}/{totalSteps} bước
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Bắt đầu</span>
          <span className="font-medium text-blue-600">{Math.round(progressPercentage)}%</span>
          <span>Hoàn thành</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
              index <= currentStep
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 border border-gray-200'
            } ${onStepClick ? 'hover:bg-blue-100' : ''}`}
            onClick={() => onStepClick && onStepClick(index)}
          >
            <div className="flex-shrink-0 mt-0.5">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <Circle className={`h-5 w-5 ${
                  index <= currentStep ? 'text-blue-500' : 'text-gray-400'
                }`} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                  {step.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </h4>
                {index === currentStep && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Hiện tại
                  </span>
                )}
              </div>
              {step.description && (
                <p className={`text-xs mt-1 ${
                  index <= currentStep ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Message */}
      {currentStep === totalSteps && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-sm font-medium text-green-800">
              Tuyệt vời! Bạn đã hoàn thành tất cả các bước. Có thể gửi form.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
