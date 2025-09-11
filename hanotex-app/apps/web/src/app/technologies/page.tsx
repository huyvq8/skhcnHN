'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Metadata } from 'next';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  SortAsc, 
  SortDesc,
  MapPin,
  Calendar,
  Eye,
  Star,
  ArrowRight
} from 'lucide-react';
import { Technology } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import apiClient from '@/lib/api';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: '',
    trl_level: '',
    status: 'ACTIVE'
  });
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const params = {
          search: searchQuery,
          sort: sortBy,
          order: sortOrder,
          ...filters
        };
        
        const response = await apiClient.getTechnologies(params);
        if (response.success && response.data && Array.isArray(response.data)) {
          setTechnologies(response.data);
        }
      } catch (error) {
        console.error('Error fetching technologies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, [searchQuery, sortBy, sortOrder, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setSortOrder('DESC');
    }
  };

  const getTRLColor = (level: number) => {
    if (level <= 3) return 'bg-red-100 text-red-800';
    if (level <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Danh sách công nghệ
          </h1>
          <p className="text-gray-600">
            Khám phá và tìm kiếm các công nghệ phù hợp với nhu cầu của bạn
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm công nghệ..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả danh mục</option>
                  <option value="1">Khoa học tự nhiên</option>
                  <option value="2">Khoa học kỹ thuật & công nghệ</option>
                  <option value="3">Khoa học y, dược</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TRL Level
                </label>
                <select
                  value={filters.trl_level}
                  onChange={(e) => setFilters({...filters, trl_level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tất cả TRL</option>
                  <option value="1-3">TRL 1-3 (Nghiên cứu cơ bản)</option>
                  <option value="4-6">TRL 4-6 (Phát triển)</option>
                  <option value="7-9">TRL 7-9 (Thương mại hóa)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trạng thái
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Đang hoạt động</option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="SOLD">Đã bán</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              Tìm thấy <span className="font-semibold">{technologies.length}</span> công nghệ
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSort('created_at')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'created_at' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Ngày tạo
                {sortBy === 'created_at' && (
                  sortOrder === 'ASC' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                )}
              </button>
              
              <button
                onClick={() => handleSort('trl_level')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'trl_level' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                TRL Level
                {sortBy === 'trl_level' && (
                  sortOrder === 'ASC' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                )}
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Technologies Grid/List */}
        {technologies.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {technologies.map((tech) => (
              <div
                key={tech.id}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
                  viewMode === 'list' ? 'p-6' : 'p-6'
                }`}
              >
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTRLColor(tech.trl_level)}`}>
                        TRL {tech.trl_level}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tech.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tech.status === 'ACTIVE' ? 'Hoạt động' : 'Chờ duyệt'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {tech.title}
                    </h3>

                    {tech.public_summary && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {tech.public_summary}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Mới cập nhật</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>123 lượt xem</span>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Xem chi tiết
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </>
                ) : (
                  // List View
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tech.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTRLColor(tech.trl_level)}`}>
                            TRL {tech.trl_level}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tech.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {tech.status === 'ACTIVE' ? 'Hoạt động' : 'Chờ duyệt'}
                          </span>
                        </div>
                      </div>

                      {tech.public_summary && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {tech.public_summary}
                        </p>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Mới cập nhật</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>123 lượt xem</span>
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Xem chi tiết
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Không tìm thấy công nghệ nào
            </h3>
            <p className="text-gray-600">
              Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
