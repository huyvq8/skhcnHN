'use client';

import { useMemo } from 'react';

interface DemandFormData {
  title: string;
  description: string;
  categoryId: string;
  budget: string;
  currency: string;
  deadline: string;
  location: string;
  contactInfo: {
    contactPerson: string;
    email: string;
    phone: string;
    company: string;
  };
  requirements: {
    trlLevel: string;
    technologyType: string;
    specificRequirements: string;
    preferredPartners: string;
    timeline: string;
  };
}

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  fields: string[];
}

export function useDemandFormProgress(formData: DemandFormData) {
  const steps: Step[] = useMemo(() => {
    const baseSteps: Step[] = [
      {
        id: 'basic',
        title: 'Thông tin cơ bản',
        description: 'Tiêu đề, mô tả và danh mục nhu cầu',
        completed: false,
        required: true,
        fields: ['title', 'description', 'categoryId']
      },
      {
        id: 'contact',
        title: 'Thông tin liên hệ',
        description: 'Người liên hệ và thông tin công ty',
        completed: false,
        required: true,
        fields: ['contactInfo.contactPerson', 'contactInfo.email']
      },
      {
        id: 'budget',
        title: 'Ngân sách & Thời hạn',
        description: 'Thông tin về ngân sách và thời gian',
        completed: false,
        required: false,
        fields: ['budget', 'deadline']
      },
      {
        id: 'requirements',
        title: 'Yêu cầu kỹ thuật',
        description: 'Mô tả chi tiết yêu cầu công nghệ',
        completed: false,
        required: false,
        fields: ['requirements.trlLevel', 'requirements.technologyType', 'requirements.specificRequirements']
      }
    ];

    // Tính toán completion status cho từng step
    return baseSteps.map(step => {
      let completed = true;
      
      if (step.required) {
        // Kiểm tra các trường bắt buộc
        for (const field of step.fields) {
          if (!isFieldCompleted(formData, field)) {
            completed = false;
            break;
          }
        }
      } else {
        // Với trường optional, chỉ cần có ít nhất 1 trường được điền
        completed = step.fields.some(field => isFieldCompleted(formData, field));
      }

      return {
        ...step,
        completed
      };
    });
  }, [formData]);

  // Tính current step (bước hiện tại)
  const currentStep = useMemo(() => {
    const firstIncompleteIndex = steps.findIndex(step => !step.completed);
    return firstIncompleteIndex === -1 ? steps.length - 1 : firstIncompleteIndex;
  }, [steps]);

  // Tính tổng số bước hoàn thành
  const completedSteps = useMemo(() => {
    return steps.filter(step => step.completed).length;
  }, [steps]);

  // Kiểm tra xem form có thể submit không
  const canSubmit = useMemo(() => {
    const requiredSteps = steps.filter(step => step.required);
    return requiredSteps.every(step => step.completed);
  }, [steps]);

  return {
    steps,
    currentStep,
    totalSteps: steps.length,
    completedSteps,
    canSubmit,
    progressPercentage: Math.round((completedSteps / steps.length) * 100)
  };
}

function isFieldCompleted(formData: DemandFormData, fieldPath: string): boolean {
  const keys = fieldPath.split('.');
  let value: any = formData;

  for (const key of keys) {
    if (value === null || value === undefined) {
      return false;
    }
    value = value[key];
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.some(item => Boolean(item));
  }

  if (typeof value === 'object' && value !== null) {
    // Kiểm tra object có ít nhất 1 property không rỗng
    return Object.values(value).some(val => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return Boolean(val);
    });
  }

  return Boolean(value);
}
