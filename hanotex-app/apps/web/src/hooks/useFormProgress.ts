'use client';

import { useMemo } from 'react';

interface FormData {
  title: string;
  publicSummary: string;
  categoryId: string;
  trlLevel: string;
  submitter: {
    submitterType: string;
    email: string;
    fullName: string;
    phone?: string;
    organization?: string;
  };
  owners: Array<{
    ownerType: string;
    ownerName: string;
    ownershipPercentage: number;
  }>;
  ipDetails: Array<{
    ipType: string;
    ipNumber: string;
    status: string;
    territory: string;
  }>;
  legalTerritory: {
    protectionTerritories: string[];
    certifications: string[];
  };
  pricing: {
    pricingType: string;
    askingPrice?: string;
    appraisalPurpose?: string;
  };
  classification: {
    field: string;
    industry: string;
    specialty: string;
  };
  documents: Array<any>;
}

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  fields: string[];
}

export function useFormProgress(formData: FormData) {
  const steps: Step[] = useMemo(() => {
    const baseSteps: Step[] = [
      {
        id: 'submitter',
        title: 'Thông tin người đăng',
        description: 'Thông tin cơ bản về người đăng ký',
        completed: false,
        required: true,
        fields: ['submitter.email', 'submitter.fullName', 'submitter.submitterType']
      },
      {
        id: 'basic',
        title: 'Thông tin cơ bản',
        description: 'Tên, mô tả và phân loại công nghệ',
        completed: false,
        required: true,
        fields: ['title', 'publicSummary', 'classification.field', 'classification.industry', 'classification.specialty', 'trlLevel', 'categoryId']
      },
      {
        id: 'owners',
        title: 'Chủ sở hữu công nghệ',
        description: 'Thông tin về quyền sở hữu',
        completed: false,
        required: true,
        fields: ['owners']
      },
      {
        id: 'ip',
        title: 'Sở hữu trí tuệ (IP)',
        description: 'Thông tin về bằng sáng chế và quyền IP',
        completed: false,
        required: true,
        fields: ['ipDetails']
      },
      {
        id: 'legal',
        title: 'Pháp lý & Lãnh thổ',
        description: 'Phạm vi bảo hộ và chứng nhận',
        completed: false,
        required: true,
        fields: ['legalTerritory.protectionTerritories', 'legalTerritory.certifications']
      },
      {
        id: 'investment',
        title: 'Đầu tư & Chuyển giao',
        description: 'Mong muốn đầu tư và hình thức chuyển giao',
        completed: false,
        required: false,
        fields: ['investmentTransfer.investmentStage', 'investmentTransfer.territoryScope']
      },
      {
        id: 'pricing',
        title: 'Định giá & Giá mong muốn',
        description: 'Thông tin về giá cả và thẩm định',
        completed: false,
        required: false,
        fields: ['pricing.pricingType']
      },
      {
        id: 'documents',
        title: 'Tài liệu minh chứng',
        description: 'Upload tài liệu hỗ trợ',
        completed: false,
        required: false,
        fields: ['documents']
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

function isFieldCompleted(formData: FormData, fieldPath: string): boolean {
  const keys = fieldPath.split('.');
  let value: any = formData;

  for (const key of keys) {
    if (value === null || value === undefined) {
      return false;
    }
    value = value[key];
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.some(item => {
      if (typeof item === 'object') {
        // Kiểm tra các trường quan trọng trong object
        return item.ownerName || item.ipType || item.ownerType;
      }
      return Boolean(item);
    });
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
