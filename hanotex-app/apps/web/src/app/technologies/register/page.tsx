'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { 
  ArrowLeft,
  Save,
  Eye,
  Upload,
  Plus,
  Trash2,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function RegisterTechnologyPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    publicSummary: '',
    confidentialDetail: '',
    trlLevel: '',
    categoryId: '',
    visibilityMode: 'PUBLIC_SUMMARY',
    // Thông tin người đăng
    submitter: {
      submitterType: 'INDIVIDUAL',
      fullName: 'Nguyễn Văn A', // Tự động lấy từ auth
      email: 'user@example.com', // Tự động lấy từ auth
      phone: '',
      organization: '',
      position: '',
      // Trường cho doanh nghiệp
      taxCode: '',
      businessLicense: '',
      legalRepresentative: '',
      productionCapacity: '',
      // Trường cho viện/trường
      unitCode: '',
      managingAgency: '',
      researchTaskCode: '',
      acceptanceReport: '',
      researchTeam: ''
    },
    owners: [{ ownerType: 'INDIVIDUAL', ownerName: '', ownershipPercentage: 100 }],
    ipDetails: [{ ipType: 'PATENT', ipNumber: '', status: '', territory: '' }],
    // Pháp lý & Lãnh thổ
    legalTerritory: {
      protectionTerritories: [],
      certifications: [],
      localCertificationFiles: []
    },
    pricing: {
      pricingType: 'ASK',
      askingPrice: '',
      currency: 'VND',
      priceType: '',
      appraisalPurpose: '',
      appraisalScope: '',
      appraisalDeadline: ''
    },
    investmentTransfer: {
      investmentStage: '',
      commercializationMethods: [],
      transferMethods: [],
      territoryScope: '',
      financialMethods: [],
      usageLimitations: '',
      currentPartners: '',
      potentialPartners: ''
    },
    // Thông tin bổ sung (optional)
    optionalInfo: {
      team: '',
      testResults: '',
      economicSocialImpact: '',
      financialSupport: ''
    },
    // Thông tin phân loại
    classification: {
      field: '',
      industry: '',
      specialty: ''
    },
    // Tài liệu upload
    documents: []
  });

  const [categories, setCategories] = useState([]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Implement technology registration API call
      console.log('Submitting technology:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Công nghệ đã được đăng ký thành công! Đang chờ phê duyệt.');
      setFormData({
        title: '',
        publicSummary: '',
        confidentialDetail: '',
        trlLevel: '',
        categoryId: '',
        visibilityMode: 'PUBLIC_SUMMARY',
        submitter: {
          submitterType: 'INDIVIDUAL',
          fullName: '',
          email: '',
          phone: '',
          organization: '',
          position: '',
          taxCode: '',
          businessLicense: '',
          legalRepresentative: '',
          productionCapacity: '',
          unitCode: '',
          managingAgency: '',
          researchTaskCode: '',
          acceptanceReport: '',
          researchTeam: ''
        },
        owners: [{ ownerType: 'INDIVIDUAL', ownerName: '', ownershipPercentage: 100 }],
        ipDetails: [{ ipType: 'PATENT', ipNumber: '', status: '', territory: '' }],
        legalTerritory: {
          protectionTerritories: [],
          certifications: [],
          localCertificationFiles: []
        },
        pricing: {
          pricingType: 'ASK',
          askingPrice: '',
          currency: 'VND',
          priceType: '',
          appraisalPurpose: '',
          appraisalScope: '',
          appraisalDeadline: ''
        },
        investmentTransfer: {
          investmentStage: '',
          commercializationMethods: [],
          transferMethods: [],
          territoryScope: '',
          financialMethods: [],
          usageLimitations: '',
          currentPartners: '',
          potentialPartners: ''
        }
      });
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi đăng ký công nghệ');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addOwner = () => {
    setFormData(prev => ({
      ...prev,
      owners: [...prev.owners, { ownerType: 'INDIVIDUAL', ownerName: '', ownershipPercentage: 0 }]
    }));
  };

  const removeOwner = (index: number) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.filter((_, i) => i !== index)
    }));
  };

  const updateOwner = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      owners: prev.owners.map((owner, i) => 
        i === index ? { ...owner, [field]: value } : owner
      )
    }));
  };

  const addIPDetail = () => {
    setFormData(prev => ({
      ...prev,
      ipDetails: [...prev.ipDetails, { ipType: 'PATENT', ipNumber: '', status: '', territory: '' }]
    }));
  };

  const removeIPDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ipDetails: prev.ipDetails.filter((_, i) => i !== index)
    }));
  };

  const updateIPDetail = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      ipDetails: prev.ipDetails.map((ip, i) => 
        i === index ? { ...ip, [field]: value } : ip
      )
    }));
  };

  const handleTerritoryChange = (territory: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      legalTerritory: {
        ...prev.legalTerritory,
        protectionTerritories: checked 
          ? [...prev.legalTerritory.protectionTerritories, territory]
          : prev.legalTerritory.protectionTerritories.filter(t => t !== territory)
      }
    }));
  };

  const handleCertificationChange = (certification: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      legalTerritory: {
        ...prev.legalTerritory,
        certifications: checked 
          ? [...prev.legalTerritory.certifications, certification]
          : prev.legalTerritory.certifications.filter(c => c !== certification)
      }
    }));
  };

  const handleLocalCertificationUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} quá lớn. Kích thước tối đa là 10MB.`);
        continue;
      }

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      };

      setFormData(prev => ({
        ...prev,
        legalTerritory: {
          ...prev.legalTerritory,
          localCertificationFiles: [...prev.legalTerritory.localCertificationFiles, newFile]
        }
      }));
    }
  };

  const removeLocalCertificationFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      legalTerritory: {
        ...prev.legalTerritory,
        localCertificationFiles: prev.legalTerritory.localCertificationFiles.filter((_, i) => i !== index)
      }
    }));
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      // Kiểm tra kích thước file (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError(`File ${file.name} quá lớn. Kích thước tối đa là 10MB.`);
        continue;
      }

      // Thêm file vào danh sách
      const newDocument = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      };

      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, newDocument]
      }));

      // Giả lập OCR để tự động điền thông tin
      await simulateOCR(file);
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const simulateOCR = async (file: File) => {
    // Giả lập quá trình OCR
    setTimeout(() => {
      // Giả lập kết quả OCR dựa trên tên file
      const fileName = file.name.toLowerCase();
      
      if (fileName.includes('patent') || fileName.includes('bằng')) {
        setFormData(prev => ({
          ...prev,
          classification: {
            ...prev.classification,
            field: 'SCI_ENG',
            industry: 'MECH'
          }
        }));
      } else if (fileName.includes('software') || fileName.includes('phần mềm')) {
        setFormData(prev => ({
          ...prev,
          classification: {
            ...prev.classification,
            field: 'SCI_ENG',
            industry: 'EEICT',
            specialty: 'SYSTEM_SOFTWARE'
          }
        }));
      } else if (fileName.includes('ai') || fileName.includes('trí tuệ')) {
        setFormData(prev => ({
          ...prev,
          classification: {
            ...prev.classification,
            field: 'SCI_INT',
            industry: 'AI'
          }
        }));
      }
    }, 1000);
  };

  const getTRLSuggestions = (trlLevel: string) => {
    const suggestions: Record<string, { title: string; fields: string[] }> = {
      '1': {
        title: 'TRL 1 - Nguyên lý cơ bản',
        fields: ['Giả thuyết khoa học', 'Khung lý thuyết', 'Phương pháp nghiên cứu', 'Kế hoạch R&D']
      },
      '2': {
        title: 'TRL 2 - Khái niệm công nghệ',
        fields: ['Khái niệm công nghệ', 'Phân tích tính khả thi', 'Thiết kế sơ bộ', 'Đánh giá rủi ro']
      },
      '3': {
        title: 'TRL 3 - Bằng chứng thực nghiệm',
        fields: ['Kết quả thử nghiệm cơ sở', 'Bằng chứng khoa học', 'Phân tích dữ liệu', 'Báo cáo nghiên cứu']
      },
      '4': {
        title: 'TRL 4 - Mẫu thử trong lab',
        fields: ['Mẫu thử trong phòng thí nghiệm', 'BOM linh kiện', 'Sơ đồ kỹ thuật', 'Video demo']
      },
      '5': {
        title: 'TRL 5 - Mẫu thử gần điều kiện thực',
        fields: ['Mẫu thử trong môi trường thực tế', 'Kết quả pilot', 'Yêu cầu hạ tầng', 'Đánh giá hiệu suất']
      },
      '6': {
        title: 'TRL 6 - Nguyên mẫu',
        fields: ['Nguyên mẫu hoàn chỉnh', 'Thử nghiệm tích hợp', 'Đánh giá độ tin cậy', 'Tối ưu hóa thiết kế']
      },
      '7': {
        title: 'TRL 7 - Trình diễn quy mô pilot',
        fields: ['Hệ thống pilot', 'Thử nghiệm quy mô lớn', 'Đánh giá thương mại', 'Kế hoạch sản xuất']
      },
      '8': {
        title: 'TRL 8 - Hoàn thiện',
        fields: ['Hệ thống hoàn chỉnh', 'Quy trình sản xuất', 'Tiêu chuẩn chất lượng', 'Đào tạo vận hành']
      },
      '9': {
        title: 'TRL 9 - Thương mại hóa',
        fields: ['Sản phẩm thương mại', 'Case study khách hàng', 'Dữ liệu thị trường', 'Kế hoạch mở rộng']
      }
    };

    return suggestions[trlLevel] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Đăng ký công nghệ</h1>
                  <p className="text-gray-600">Đăng ký công nghệ mới lên sàn giao dịch HANOTEX</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Xem trước
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          {/* 1. Thông tin người đăng */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">1. Thông tin người đăng</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="submitter.submitterType" className="block text-sm font-medium text-gray-700 mb-1">
                    Loại người đăng
                  </label>
                  <select
                    id="submitter.submitterType"
                    name="submitter.submitterType"
                    value={formData.submitter.submitterType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="INDIVIDUAL">Cá nhân</option>
                    <option value="COMPANY">Doanh nghiệp</option>
                    <option value="RESEARCH_INSTITUTION">Viện/Trường</option>
                  </select>
                </div>
                
                {/* Các trường chung */}
                <div>
                  <label htmlFor="submitter.email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="submitter.email"
                    name="submitter.email"
                    required
                    value={formData.submitter.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <label htmlFor="submitter.phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="submitter.phone"
                    name="submitter.phone"
                    value={formData.submitter.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                {/* Trường dành cho Cá nhân */}
                {formData.submitter.submitterType === 'INDIVIDUAL' && (
                  <>
                    <div>
                      <label htmlFor="submitter.fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ tên *
                      </label>
                      <input
                        type="text"
                        id="submitter.fullName"
                        name="submitter.fullName"
                        required
                        value={formData.submitter.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập họ tên"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.position" className="block text-sm font-medium text-gray-700 mb-1">
                        Nghề nghiệp / Chức danh
                      </label>
                      <input
                        type="text"
                        id="submitter.position"
                        name="submitter.position"
                        value={formData.submitter.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhà nghiên cứu / Founder"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.organization" className="block text-sm font-medium text-gray-700 mb-1">
                        Tổ chức / Công ty
                      </label>
                      <input
                        type="text"
                        id="submitter.organization"
                        name="submitter.organization"
                        value={formData.submitter.organization}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập tên tổ chức"
                      />
                    </div>
                  </>
                )}

                {/* Trường dành cho Doanh nghiệp */}
                {formData.submitter.submitterType === 'COMPANY' && (
                  <>
                    <div>
                      <label htmlFor="submitter.fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Tên doanh nghiệp *
                      </label>
                      <input
                        type="text"
                        id="submitter.fullName"
                        name="submitter.fullName"
                        required
                        value={formData.submitter.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Công ty ABC"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.taxCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã số thuế
                      </label>
                      <input
                        type="text"
                        id="submitter.taxCode"
                        name="submitter.taxCode"
                        value={formData.submitter.taxCode || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="010xxxxxxx"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.businessLicense" className="block text-sm font-medium text-gray-700 mb-1">
                        Giấy ĐKKD
                      </label>
                      <input
                        type="text"
                        id="submitter.businessLicense"
                        name="submitter.businessLicense"
                        value={formData.submitter.businessLicense || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Số/Ngày cấp"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.legalRepresentative" className="block text-sm font-medium text-gray-700 mb-1">
                        Người đại diện pháp luật
                      </label>
                      <input
                        type="text"
                        id="submitter.legalRepresentative"
                        name="submitter.legalRepresentative"
                        value={formData.submitter.legalRepresentative || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nguyễn Văn B"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.productionCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                        Năng lực sản xuất
                      </label>
                      <input
                        type="text"
                        id="submitter.productionCapacity"
                        name="submitter.productionCapacity"
                        value={formData.submitter.productionCapacity || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhà xưởng, công suất, nhân sự R&D"
                      />
                    </div>
                  </>
                )}

                {/* Trường dành cho Viện/Trường */}
                {formData.submitter.submitterType === 'RESEARCH_INSTITUTION' && (
                  <>
                    <div>
                      <label htmlFor="submitter.fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Tên viện/trường *
                      </label>
                      <input
                        type="text"
                        id="submitter.fullName"
                        name="submitter.fullName"
                        required
                        value={formData.submitter.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Trường/Viện XYZ"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.unitCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã số đơn vị
                      </label>
                      <input
                        type="text"
                        id="submitter.unitCode"
                        name="submitter.unitCode"
                        value={formData.submitter.unitCode || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="..."
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.managingAgency" className="block text-sm font-medium text-gray-700 mb-1">
                        Cơ quan chủ quản
                      </label>
                      <input
                        type="text"
                        id="submitter.managingAgency"
                        name="submitter.managingAgency"
                        value={formData.submitter.managingAgency || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Bộ/UBND ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.researchTaskCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã số nhiệm vụ KH&CN
                      </label>
                      <input
                        type="text"
                        id="submitter.researchTaskCode"
                        name="submitter.researchTaskCode"
                        value={formData.submitter.researchTaskCode || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="VD: KC.01.xx.yyyy"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.acceptanceReport" className="block text-sm font-medium text-gray-700 mb-1">
                        Báo cáo nghiệm thu
                      </label>
                      <input
                        type="text"
                        id="submitter.acceptanceReport"
                        name="submitter.acceptanceReport"
                        value={formData.submitter.acceptanceReport || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Link hoặc ghi chú"
                      />
                    </div>
                    <div>
                      <label htmlFor="submitter.researchTeam" className="block text-sm font-medium text-gray-700 mb-1">
                        Nhóm nghiên cứu/Chủ nhiệm
                      </label>
                      <input
                        type="text"
                        id="submitter.researchTeam"
                        name="submitter.researchTeam"
                        value={formData.submitter.researchTeam || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="TS. ..."
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 2. Thông tin cơ bản */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">2. Thông tin cơ bản</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên sản phẩm Khoa học/ Công nghệ *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên sản phẩm khoa học/công nghệ"
                />
              </div>


              {/* Upload tài liệu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tài liệu minh chứng (PDF, Ảnh, Video)
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Kéo thả tài liệu vào đây hoặc <span className="text-blue-600">click để chọn file</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Hỗ trợ: PDF, JPG, PNG, MP4 (Tối đa 10MB mỗi file)
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.mp4"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
                {formData.documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{doc.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Thông tin phân loại */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="classification.field" className="block text-sm font-medium text-gray-700 mb-1">
                    Lĩnh vực *
                  </label>
                  <select
                    id="classification.field"
                    name="classification.field"
                    required
                    value={formData.classification.field}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn lĩnh vực</option>
                    <option value="SCI_NAT">Khoa học tự nhiên</option>
                    <option value="SCI_ENG">Khoa học kỹ thuật & công nghệ</option>
                    <option value="SCI_MED">Khoa học y, dược</option>
                    <option value="SCI_AGR">Khoa học nông nghiệp</option>
                    <option value="SCI_SOC">Khoa học xã hội</option>
                    <option value="SCI_HUM">Khoa học nhân văn</option>
                    <option value="SCI_INT">Khoa học liên ngành</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="classification.industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Ngành *
                  </label>
                  <select
                    id="classification.industry"
                    name="classification.industry"
                    required
                    value={formData.classification.industry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn ngành</option>
                    <option value="MECH">Cơ khí – Động lực</option>
                    <option value="EEICT">Điện – Điện tử – CNTT</option>
                    <option value="MTRL">Vật liệu & Công nghệ vật liệu</option>
                    <option value="ENV">Công nghệ môi trường</option>
                    <option value="AUTO">Tự động hóa & Robot</option>
                    <option value="BIOTECH">Công nghệ sinh học y dược</option>
                    <option value="MEDDEV">Thiết bị y tế</option>
                    <option value="PHARMA">Dược học</option>
                    <option value="AGRI">Nông nghiệp</option>
                    <option value="FOOD">Công nghệ thực phẩm</option>
                    <option value="AQUA">Thủy sản</option>
                    <option value="AI">Trí tuệ nhân tạo</option>
                    <option value="NANO">Công nghệ nano</option>
                    <option value="SPACE">Công nghệ vũ trụ</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="classification.specialty" className="block text-sm font-medium text-gray-700 mb-1">
                    Chuyên ngành *
                  </label>
                  <select
                    id="classification.specialty"
                    name="classification.specialty"
                    required
                    value={formData.classification.specialty}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn chuyên ngành</option>
                    <option value="ENGINE_INTERNAL">Động cơ đốt trong</option>
                    <option value="PRECISION_MECHANICS">Cơ khí chính xác</option>
                    <option value="TRANSPORTATION">Phương tiện giao thông</option>
                    <option value="SEMICONDUCTOR">Bán dẫn</option>
                    <option value="TELECOMMUNICATIONS">Viễn thông</option>
                    <option value="SYSTEM_SOFTWARE">Phần mềm hệ thống</option>
                    <option value="POLYMER_COMPOSITE">Polyme/Compozit</option>
                    <option value="NANO_MATERIALS">Vật liệu nano</option>
                    <option value="BATTERY_FUEL">Pin & Nhiên liệu</option>
                    <option value="WATER_TREATMENT">Xử lý nước thải</option>
                    <option value="WASTE_RECYCLING">Tái chế chất thải</option>
                    <option value="EMISSION_REDUCTION">Giảm phát thải</option>
                    <option value="INDUSTRIAL_ROBOT">Robot công nghiệp</option>
                    <option value="INDUSTRIAL_IOT">IoT công nghiệp</option>
                    <option value="SMART_CONTROL">Điều khiển thông minh</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="trlLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Mức độ phát triển (TRL) *
                  </label>
                  <select
                    id="trlLevel"
                    name="trlLevel"
                    required
                    value={formData.trlLevel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn mức độ TRL</option>
                    <option value="1">TRL 1 - Nguyên lý cơ bản</option>
                    <option value="2">TRL 2 - Khái niệm công nghệ</option>
                    <option value="3">TRL 3 - Bằng chứng khái niệm</option>
                    <option value="4">TRL 4 - Xác thực trong phòng thí nghiệm</option>
                    <option value="5">TRL 5 - Xác thực trong môi trường liên quan</option>
                    <option value="6">TRL 6 - Trình diễn trong môi trường liên quan</option>
                    <option value="7">TRL 7 - Trình diễn trong môi trường vận hành</option>
                    <option value="8">TRL 8 - Hệ thống hoàn chỉnh và đủ điều kiện</option>
                    <option value="9">TRL 9 - Hệ thống thực tế được chứng minh</option>
                  </select>
                  
                  {/* Gợi ý TRL */}
                  {formData.trlLevel && getTRLSuggestions(formData.trlLevel) && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700">
                        <strong>Gợi ý:</strong> {getTRLSuggestions(formData.trlLevel)?.fields.join(', ')}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục * <span className="text-xs text-gray-500">(Phân loại chính thức theo hệ thống HANOTEX)</span>
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    required
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="550e8400-e29b-41d4-a716-446655440001">Công nghệ thông tin & Truyền thông</option>
                    <option value="550e8400-e29b-41d4-a716-446655440002">Công nghệ sinh học & Y dược</option>
                    <option value="550e8400-e29b-41d4-a716-446655440003">Vật liệu mới & Công nghệ vật liệu</option>
                    <option value="550e8400-e29b-41d4-a716-446655440004">Cơ khí & Tự động hóa</option>
                    <option value="550e8400-e29b-41d4-a716-446655440005">Năng lượng & Môi trường</option>
                    <option value="550e8400-e29b-41d4-a716-446655440006">Nông nghiệp & Thực phẩm</option>
                    <option value="550e8400-e29b-41d4-a716-446655440007">Giao thông vận tải</option>
                    <option value="550e8400-e29b-41d4-a716-446655440008">Xây dựng & Kiến trúc</option>
                    <option value="550e8400-e29b-41d4-a716-446655440009">Khoa học xã hội & Nhân văn</option>
                    <option value="550e8400-e29b-41d4-a716-446655440010">Liên ngành & Khác</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Danh mục giúp phân loại và tìm kiếm công nghệ dễ dàng hơn trên sàn giao dịch
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="publicSummary" className="block text-sm font-medium text-gray-700 mb-1">
                  Tóm tắt công khai *
                </label>
                <textarea
                  id="publicSummary"
                  name="publicSummary"
                  required
                  rows={4}
                  value={formData.publicSummary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả ngắn gọn về công nghệ (sẽ hiển thị công khai)"
                />
              </div>

              <div>
                <label htmlFor="confidentialDetail" className="block text-sm font-medium text-gray-700 mb-1">
                  Chi tiết bảo mật
                </label>
                <textarea
                  id="confidentialDetail"
                  name="confidentialDetail"
                  rows={6}
                  value={formData.confidentialDetail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mô tả chi tiết về công nghệ (chỉ hiển thị cho người có quyền truy cập)"
                />
              </div>

              <div>
                <label htmlFor="visibilityMode" className="block text-sm font-medium text-gray-700 mb-1">
                  Chế độ hiển thị
                </label>
                <select
                  id="visibilityMode"
                  name="visibilityMode"
                  value={formData.visibilityMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PUBLIC_SUMMARY">Chỉ hiển thị tóm tắt</option>
                  <option value="PUBLIC_FULL">Hiển thị đầy đủ</option>
                  <option value="PRIVATE">Riêng tư</option>
                </select>
              </div>

              {/* Thông tin bổ sung (Optional) - Nested trong Basic Info */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium text-gray-900">Thông tin bổ sung</h3>
                  <button
                    type="button"
                    onClick={() => setShowOptionalFields(!showOptionalFields)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {showOptionalFields ? 'Ẩn thông tin bổ sung' : 'Hiển thị thông tin bổ sung'}
                  </button>
                </div>
                {showOptionalFields && (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="optionalInfo.team" className="block text-sm font-medium text-gray-700 mb-1">
                        Đội ngũ / Nhân lực/ Cơ sở hạ tầng
                      </label>
                      <textarea
                        id="optionalInfo.team"
                        name="optionalInfo.team"
                        value={formData.optionalInfo.team}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mô tả về đội ngũ phát triển, nhân lực chuyên môn..."
                      />
                    </div>
                    <div>
                      <label htmlFor="optionalInfo.testResults" className="block text-sm font-medium text-gray-700 mb-1">
                        Kết quả thử nghiệm / Triển khai
                      </label>
                      <textarea
                        id="optionalInfo.testResults"
                        name="optionalInfo.testResults"
                        value={formData.optionalInfo.testResults}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mô tả kết quả thử nghiệm, triển khai thực tế..."
                      />
                    </div>
                    <div>
                      <label htmlFor="optionalInfo.economicSocialImpact" className="block text-sm font-medium text-gray-700 mb-1">
                        Hiệu quả kinh tế - xã hội
                      </label>
                      <textarea
                        id="optionalInfo.economicSocialImpact"
                        name="optionalInfo.economicSocialImpact"
                        value={formData.optionalInfo.economicSocialImpact}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Mô tả tác động kinh tế, xã hội, môi trường..."
                      />
                    </div>
                    <div>
                      <label htmlFor="optionalInfo.financialSupport" className="block text-sm font-medium text-gray-700 mb-1">
                        Thông tin quỹ tài chính hỗ trợ
                      </label>
                      <textarea
                        id="optionalInfo.financialSupport"
                        name="optionalInfo.financialSupport"
                        value={formData.optionalInfo.financialSupport}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Thông tin về quỹ hỗ trợ, tài trợ, chương trình khuyến khích..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Technology Owners */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">3. Chủ sở hữu công nghệ</h2>
                <button
                  type="button"
                  onClick={addOwner}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm chủ sở hữu
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {formData.owners.map((owner, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại chủ sở hữu
                    </label>
                    <select
                      value={owner.ownerType}
                      onChange={(e) => updateOwner(index, 'ownerType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="INDIVIDUAL">Cá nhân</option>
                      <option value="COMPANY">Doanh nghiệp</option>
                      <option value="RESEARCH_INSTITUTION">Viện/Trường</option>
                      <option value="FULL_OWNERSHIP">Sở hữu toàn phần</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên chủ sở hữu
                    </label>
                    <input
                      type="text"
                      value={owner.ownerName}
                      onChange={(e) => updateOwner(index, 'ownerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập tên chủ sở hữu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tỷ lệ sở hữu (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={owner.ownershipPercentage}
                      onChange={(e) => updateOwner(index, 'ownershipPercentage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeOwner(index)}
                      className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Intellectual Property (IP) */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">4. Sở hữu trí tuệ (IP)</h2>
                <button
                  type="button"
                  onClick={addIPDetail}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm IP
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {formData.ipDetails.map((ip, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loại hình IP
                    </label>
                    <select
                      value={ip.ipType}
                      onChange={(e) => updateIPDetail(index, 'ipType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="PATENT">Sáng chế (Patent)</option>
                      <option value="UTILITY_MODEL">Giải pháp hữu ích</option>
                      <option value="INDUSTRIAL_DESIGN">Kiểu dáng công nghiệp</option>
                      <option value="TRADEMARK">Nhãn hiệu</option>
                      <option value="COPYRIGHT">Quyền tác giả</option>
                      <option value="TRADE_SECRET">Bí mật kinh doanh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số đơn/Số bằng
                    </label>
                    <input
                      type="text"
                      value={ip.ipNumber}
                      onChange={(e) => updateIPDetail(index, 'ipNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="VD: VN1-001234"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tình trạng
                    </label>
                    <select
                      value={ip.status}
                      onChange={(e) => updateIPDetail(index, 'status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn tình trạng</option>
                      <option value="PENDING">Đang nộp</option>
                      <option value="GRANTED">Đã được cấp</option>
                      <option value="EXPIRED">Hết hiệu lực</option>
                      <option value="REJECTED">Bị từ chối</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeIPDetail(index)}
                      className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Pháp lý & Lãnh thổ */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">5. Pháp lý & Lãnh thổ</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Phạm vi bảo hộ/chứng nhận */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phạm vi bảo hộ/chứng nhận (chọn nhiều)
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {[
                      'VN (Cục SHTT)',
                      'PCT (đơn quốc tế)',
                      'EP/EPO (Châu Âu)',
                      'US/USPTO (Hoa Kỳ)',
                      'CN/CNIPA (Trung Quốc)',
                      'JP/JPO (Nhật Bản)',
                      'WO khác...'
                    ].map((territory) => (
                      <label key={territory} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.legalTerritory.protectionTerritories.includes(territory)}
                          onChange={(e) => handleTerritoryChange(territory, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{territory}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    *PCT là đơn quốc tế (chưa là bằng); EPO/USPTO/JPO là cơ quan cấp bằng/đơn tương ứng.
                  </p>
                </div>

                {/* Chứng nhận tiêu chuẩn/quy chuẩn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chứng nhận tiêu chuẩn/quy chuẩn (chọn nhiều)
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                    {[
                      'CE Marking (EU)',
                      'FDA Approval (US)',
                      'ISO 9001 (QMS)',
                      'ISO/IEC 27001 (ISMS)',
                      'ISO 13485 (Thiết bị y tế)',
                      'IEC/EN (thiết bị điện – điện tử)',
                      'Khác...'
                    ].map((certification) => (
                      <label key={certification} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.legalTerritory.certifications.includes(certification)}
                          onChange={(e) => handleCertificationChange(certification, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{certification}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Upload chứng nhận tiêu chuẩn địa phương */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload chứng nhận tiêu chuẩn địa phương (optional)
                  </label>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('local-cert-upload')?.click()}
                  >
                    <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-600 mb-1">
                      Click để upload PDF/Ảnh
                    </p>
                    <p className="text-xs text-gray-500">
                      Tối đa 10MB mỗi file
                    </p>
                    <input
                      id="local-cert-upload"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleLocalCertificationUpload}
                    />
                  </div>
                  
                  {/* Hiển thị danh sách file đã upload */}
                  {formData.legalTerritory.localCertificationFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.legalTerritory.localCertificationFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLocalCertificationFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Gợi ý khó khăn thường gặp */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-yellow-900 mb-2">
                  <strong>Khó khăn thường gặp:</strong>
                </h4>
                <p className="text-xs text-yellow-800 mb-2">
                  (1) Phân biệt PCT vs bằng đã cấp; (2) Phân biệt CE/FDA/ISO/IEC; (3) Tìm đúng mã/tiêu chuẩn.
                </p>
                <p className="text-xs text-yellow-700">
                  <em>Gợi ý UX:</em> thanh tìm kiếm có autocomplete + tooltip giải thích ngắn; bảng so sánh nhanh các tiêu chuẩn.
                </p>
              </div>
            </div>
          </div>

          {/* 6. Mong muốn đầu tư & Hình thức chuyển giao */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">6. Mong muốn đầu tư & Hình thức chuyển giao <span className="text-sm font-normal text-gray-500">(Tùy chọn)</span></h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="investmentTransfer.investmentStage" className="block text-sm font-medium text-gray-700 mb-1">
                    Giai đoạn đầu tư mong muốn
                  </label>
                  <select
                    id="investmentTransfer.investmentStage"
                    name="investmentTransfer.investmentStage"
                    value={formData.investmentTransfer.investmentStage}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn giai đoạn đầu tư</option>
                    <option value="SEED">Seed (TRL 1-3)</option>
                    <option value="SERIES_A">Series A (TRL 4-6)</option>
                    <option value="SERIES_B">Series B (TRL 7-9)</option>
                    <option value="GROWTH">Growth/Strategic</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="investmentTransfer.territoryScope" className="block text-sm font-medium text-gray-700 mb-1">
                    Phạm vi lãnh thổ
                  </label>
                  <select
                    id="investmentTransfer.territoryScope"
                    name="investmentTransfer.territoryScope"
                    value={formData.investmentTransfer.territoryScope}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn phạm vi</option>
                    <option value="VIETNAM">Trong nước (VN)</option>
                    <option value="ASEAN">Khu vực (ASEAN)</option>
                    <option value="ASIA">Châu Á</option>
                    <option value="GLOBAL">Toàn cầu</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phương án thương mại hóa (chọn nhiều)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['B2B', 'B2C', 'Licensing', 'OEM/ODM', 'Joint Venture', 'Spin-off'].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.investmentTransfer.commercializationMethods.includes(method)}
                        onChange={(e) => {
                          const methods = formData.investmentTransfer.commercializationMethods;
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              investmentTransfer: {
                                ...prev.investmentTransfer,
                                commercializationMethods: [...methods, method]
                              }
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              investmentTransfer: {
                                ...prev.investmentTransfer,
                                commercializationMethods: methods.filter(m => m !== method)
                              }
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình thức chuyển quyền (chọn nhiều)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Chuyển nhượng toàn bộ', 'Chuyển nhượng một phần', 'License độc quyền', 'License không độc quyền', 'Sub-license', 'Kèm dịch vụ kỹ thuật'].map((method) => (
                    <label key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.investmentTransfer.transferMethods.includes(method)}
                        onChange={(e) => {
                          const methods = formData.investmentTransfer.transferMethods;
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              investmentTransfer: {
                                ...prev.investmentTransfer,
                                transferMethods: [...methods, method]
                              }
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              investmentTransfer: {
                                ...prev.investmentTransfer,
                                transferMethods: methods.filter(m => m !== method)
                              }
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="investmentTransfer.currentPartners" className="block text-sm font-medium text-gray-700 mb-1">
                    Đối tác đã/đang hợp tác
                  </label>
                  <textarea
                    id="investmentTransfer.currentPartners"
                    name="investmentTransfer.currentPartners"
                    value={formData.investmentTransfer.currentPartners}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tên đối tác, phạm vi hợp tác, trạng thái..."
                  />
                </div>
                <div>
                  <label htmlFor="investmentTransfer.potentialPartners" className="block text-sm font-medium text-gray-700 mb-1">
                    Đối tác tiềm năng
                  </label>
                  <textarea
                    id="investmentTransfer.potentialPartners"
                    name="investmentTransfer.potentialPartners"
                    value={formData.investmentTransfer.potentialPartners}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Danh sách mục tiêu, kênh tiếp cận..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 7. Chính sách hiển thị & NDA */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">7. Chính sách hiển thị & NDA <span className="text-sm font-normal text-gray-500">(Tùy chọn)</span></h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="visibilityMode" className="block text-sm font-medium text-gray-700 mb-1">
                  Chế độ hiển thị
                </label>
                <select
                  id="visibilityMode"
                  name="visibilityMode"
                  value={formData.visibilityMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="PUBLIC_SUMMARY">Tóm tắt công khai + Chi tiết sau NDA</option>
                  <option value="PUBLIC_FULL">Hoàn toàn công khai</option>
                  <option value="PRIVATE">Riêng tư (chỉ theo lời mời)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Trường công khai</h4>
                  <div className="space-y-2">
                    {[
                      { field: 'title', label: 'Tên công nghệ/sản phẩm' },
                      { field: 'publicSummary', label: 'Mô tả ngắn (2-3 câu)' },
                      { field: 'classification', label: 'Lĩnh vực/Ngành/Chuyên ngành' },
                      { field: 'trlLevel', label: 'TRL' },
                      { field: 'owners', label: 'Chủ sở hữu' },
                      { field: 'ipDetails', label: 'Loại chứng nhận (không hiển thị số)' }
                    ].map((item) => (
                      <label key={item.field} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Không công khai: số bằng, tài liệu chi tiết, dữ liệu tài chính.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Trường ẩn sau NDA</h4>
                  <div className="space-y-2">
                    {[
                      { field: 'confidentialDetail', label: 'Mô tả chi tiết kỹ thuật' },
                      { field: 'documents', label: 'Tài liệu minh chứng (PDF/Ảnh/Video)' },
                      { field: 'ipNumbers', label: 'Số đơn/Số bằng' },
                      { field: 'financials', label: 'Dữ liệu tài chính/kiểm thử chi tiết' },
                      { field: 'contacts', label: 'Liên hệ trực tiếp nhóm R&D' }
                    ].map((item) => (
                      <label key={item.field} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Watermark tài liệu</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">🔍 Xem trước phần CÔNG KHAI:</h4>
                <div className="text-sm text-blue-700">
                  Tên, mô tả ngắn, taxonomy, TRL, ứng dụng (theo lựa chọn trường công khai).
                </div>
              </div>
            </div>
          </div>

          {/* 8. Định giá & Giá mong muốn */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">8. Định giá & Giá mong muốn <span className="text-sm font-normal text-gray-500">(Tùy chọn)</span></h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Chọn hình thức
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'APPRAISAL', label: 'Yêu cầu THẨM ĐỊNH' },
                    { value: 'ASK', label: 'Đặt GIÁ MONG MUỐN' },
                    { value: 'AUCTION', label: 'MỞ ĐẤU GIÁ' },
                    { value: 'OFFER', label: 'CHÀO GIÁ (Open to offers)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        pricing: { ...prev.pricing, pricingType: option.value }
                      }))}
                      className={`px-4 py-3 text-sm font-medium rounded-lg border transition-colors ${
                        formData.pricing.pricingType === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                {formData.pricing.pricingType === 'APPRAISAL' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Thông tin thẩm định</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pricing.appraisalPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                          Mục đích thẩm định
                        </label>
                        <select
                          id="pricing.appraisalPurpose"
                          name="pricing.appraisalPurpose"
                          value={formData.pricing.appraisalPurpose}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Chọn mục đích</option>
                          <option value="NEGOTIATION">Tham chiếu đàm phán</option>
                          <option value="AUCTION">Phục vụ đấu giá</option>
                          <option value="INVESTOR">Báo cáo cho nhà đầu tư</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="pricing.appraisalDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                          Thời hạn mong muốn
                        </label>
                        <input
                          type="date"
                          id="pricing.appraisalDeadline"
                          name="pricing.appraisalDeadline"
                          value={formData.pricing.appraisalDeadline}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="pricing.appraisalScope" className="block text-sm font-medium text-gray-700 mb-1">
                          Phạm vi thẩm định
                        </label>
                        <select
                          id="pricing.appraisalScope"
                          name="pricing.appraisalScope"
                          value={formData.pricing.appraisalScope}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Chọn phạm vi</option>
                          <option value="IP_ONLY">Chỉ IP</option>
                          <option value="IP_TECHNOLOGY">IP + công nghệ + tài sản kèm</option>
                          <option value="FULL_PROJECT">Toàn bộ dự án</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                          Hệ thống sẽ tạo <strong>valuation_request</strong> tới bên thẩm định được phê duyệt.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.pricing.pricingType === 'ASK' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Thông tin giá mong muốn</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="pricing.askingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                          Giá mong muốn
                        </label>
                        <input
                          type="number"
                          id="pricing.askingPrice"
                          name="pricing.askingPrice"
                          value={formData.pricing.askingPrice}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nhập số tiền"
                        />
                      </div>
                      <div>
                        <label htmlFor="pricing.currency" className="block text-sm font-medium text-gray-700 mb-1">
                          Tiền tệ
                        </label>
                        <select
                          id="pricing.currency"
                          name="pricing.currency"
                          value={formData.pricing.currency}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="VND">VND</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="pricing.priceType" className="block text-sm font-medium text-gray-700 mb-1">
                          Loại giá
                        </label>
                        <select
                          id="pricing.priceType"
                          name="pricing.priceType"
                          value={formData.pricing.priceType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="INDICATIVE">Indicative (không ràng buộc)</option>
                          <option value="FLOOR">Floor (giá sàn)</option>
                          <option value="FIRM">Firm (cam kết)</option>
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Khuyến nghị kèm thẩm định để tăng độ tin cậy.
                    </p>
                  </div>
                )}

                {formData.pricing.pricingType === 'AUCTION' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Thông tin đấu giá</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="pricing.auctionType" className="block text-sm font-medium text-gray-700 mb-1">
                          Loại đấu giá
                        </label>
                        <select
                          id="pricing.auctionType"
                          name="pricing.auctionType"
                          value={formData.pricing.auctionType || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Chọn loại đấu giá</option>
                          <option value="ENGLISH">English (tăng dần)</option>
                          <option value="DUTCH">Dutch (giảm dần)</option>
                          <option value="SEALED">Sealed bid</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="pricing.reservePrice" className="block text-sm font-medium text-gray-700 mb-1">
                          Giá khởi điểm / Reserve
                        </label>
                        <input
                          type="number"
                          id="pricing.reservePrice"
                          name="pricing.reservePrice"
                          value={formData.pricing.reservePrice || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0 nếu không có"
                        />
                      </div>
                      <div>
                        <label htmlFor="pricing.auctionStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Thời gian bắt đầu
                        </label>
                        <input
                          type="date"
                          id="pricing.auctionStartDate"
                          name="pricing.auctionStartDate"
                          value={formData.pricing.auctionStartDate || ''}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.pricing.pricingType === 'OFFER' && (
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900">Chào giá mở</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        Bạn không đặt giá – người mua sẽ gửi đề nghị. Có thể bật "gợi ý khoảng giá" dựa trên dữ liệu thị trường.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Đăng ký công nghệ
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
