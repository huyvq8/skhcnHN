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
  AlertCircle
} from 'lucide-react';

export default function RegisterTechnologyPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    publicSummary: '',
    confidentialDetail: '',
    trlLevel: '',
    categoryId: '',
    visibilityMode: 'PUBLIC_SUMMARY',
    owners: [{ ownerType: 'INDIVIDUAL', ownerName: '', ownershipPercentage: 100 }],
    ipDetails: [{ ipType: 'PATENT', ipNumber: '', status: '', territory: '' }],
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
        owners: [{ ownerType: 'INDIVIDUAL', ownerName: '', ownershipPercentage: 100 }],
        ipDetails: [{ ipType: 'PATENT', ipNumber: '', status: '', territory: '' }],
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

          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin cơ bản</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên công nghệ *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập tên công nghệ"
                />
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
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục *
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
                    <option value="550e8400-e29b-41d4-a716-446655440001">Công nghệ thông tin</option>
                    <option value="550e8400-e29b-41d4-a716-446655440002">Công nghệ sinh học</option>
                    <option value="550e8400-e29b-41d4-a716-446655440003">Vật liệu mới</option>
                  </select>
                </div>
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
            </div>
          </div>

          {/* Technology Owners */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Chủ sở hữu công nghệ</h2>
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

          {/* Pricing Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Thông tin định giá</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pricing.pricingType" className="block text-sm font-medium text-gray-700 mb-1">
                    Loại định giá
                  </label>
                  <select
                    id="pricing.pricingType"
                    name="pricing.pricingType"
                    value={formData.pricing.pricingType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ASK">Giá yêu cầu</option>
                    <option value="APPRAISAL">Thẩm định</option>
                    <option value="AUCTION">Đấu giá</option>
                    <option value="OFFER">Chào giá</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pricing.askingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Giá yêu cầu (VNĐ)
                  </label>
                  <input
                    type="number"
                    id="pricing.askingPrice"
                    name="pricing.askingPrice"
                    value={formData.pricing.askingPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập giá yêu cầu"
                  />
                </div>
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
