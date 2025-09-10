'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, TrendingUp, Users, Award, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/technologies?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const stats = [
    { icon: TrendingUp, label: 'Công nghệ', value: '500+', color: 'text-primary-600' },
    { icon: Users, label: 'Người dùng', value: '2,500+', color: 'text-secondary-600' },
    { icon: Award, label: 'Giao dịch', value: '150+', color: 'text-accent-600' },
    { icon: Zap, label: 'TRL Level', value: '1-9', color: 'text-purple-600' },
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="text-gradient">HANOTEX</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sàn giao dịch công nghệ trực tuyến của thành phố Hà Nội
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-12"
          >
            Kết nối doanh nghiệp, viện nghiên cứu và cá nhân trong lĩnh vực khoa học công nghệ. 
            Tạo cầu nối cho việc chuyển giao và thương mại hóa công nghệ.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm công nghệ, sản phẩm, dịch vụ..."
                  className="w-full pl-12 pr-32 py-4 text-lg border border-gray-300 rounded-xl shadow-soft focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-primary px-6 py-2"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/technologies"
              className="btn btn-primary btn-lg group"
            >
              Khám phá công nghệ
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/register"
              className="btn btn-outline btn-lg group"
            >
              Đăng ký ngay
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-soft mb-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-100 rounded-full opacity-20 animate-pulse animation-delay-200" />
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent-100 rounded-full opacity-20 animate-pulse animation-delay-400" />
      <div className="absolute bottom-40 right-10 w-24 h-24 bg-purple-100 rounded-full opacity-20 animate-pulse animation-delay-600" />
    </section>
  );
}
