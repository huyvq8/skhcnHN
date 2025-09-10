'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap, Building, Globe, Target, CheckCircle } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Công nghệ đăng tải',
    description: 'Các công nghệ đa dạng từ TRL 1-9',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Users,
    value: '2,500+',
    label: 'Người dùng',
    description: 'Cá nhân, doanh nghiệp, viện nghiên cứu',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
  },
  {
    icon: Award,
    value: '150+',
    label: 'Giao dịch thành công',
    description: 'Chuyển giao công nghệ hoàn tất',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: Building,
    value: '50+',
    label: 'Doanh nghiệp tham gia',
    description: 'Từ startup đến tập đoàn lớn',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Globe,
    value: '15+',
    label: 'Lĩnh vực công nghệ',
    description: 'Từ AI đến công nghệ sinh học',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: Target,
    value: '95%',
    label: 'Tỷ lệ hài lòng',
    description: 'Người dùng đánh giá tích cực',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
];

const features = [
  {
    icon: CheckCircle,
    title: 'Bảo mật cao',
    description: 'Hệ thống bảo mật đa lớp, bảo vệ thông tin người dùng',
  },
  {
    icon: CheckCircle,
    title: 'Giao dịch minh bạch',
    description: 'Quy trình giao dịch rõ ràng, minh bạch và công bằng',
  },
  {
    icon: CheckCircle,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng hỗ trợ mọi lúc',
  },
  {
    icon: CheckCircle,
    title: 'Cập nhật liên tục',
    description: 'Hệ thống được cập nhật và cải tiến liên tục',
  },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} ${stat.color} mb-4`}>
                <stat.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại sao chọn HANOTEX?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm tốt nhất cho việc giao dịch công nghệ
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
