'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Nguyễn Văn An',
    role: 'Giám đốc Công nghệ',
    company: 'TechCorp Vietnam',
    avatar: '/avatars/avatar-1.jpg',
    content: 'HANOTEX đã giúp chúng tôi tìm được công nghệ AI phù hợp cho dự án. Quy trình giao dịch rất minh bạch và chuyên nghiệp.',
    rating: 5,
  },
  {
    name: 'Trần Thị Bình',
    role: 'Trưởng phòng R&D',
    company: 'Innovation Lab',
    avatar: '/avatars/avatar-2.jpg',
    content: 'Sàn giao dịch này thực sự kết nối được cộng đồng nghiên cứu. Chúng tôi đã chuyển giao thành công 3 công nghệ trong 6 tháng.',
    rating: 5,
  },
  {
    name: 'Lê Minh Cường',
    role: 'Startup Founder',
    company: 'GreenTech Solutions',
    avatar: '/avatars/avatar-3.jpg',
    content: 'HANOTEX là cầu nối tuyệt vời giữa nghiên cứu và thương mại. Chúng tôi đã tìm được đối tác phù hợp cho sản phẩm của mình.',
    rating: 5,
  },
  {
    name: 'Phạm Thị Dung',
    role: 'Nghiên cứu viên',
    company: 'Viện Khoa học Công nghệ',
    avatar: '/avatars/avatar-4.jpg',
    content: 'Giao diện thân thiện, dễ sử dụng. Chúng tôi có thể dễ dàng đăng tải và quản lý các công nghệ của mình.',
    rating: 5,
  },
  {
    name: 'Hoàng Văn Em',
    role: 'CTO',
    company: 'Digital Solutions',
    avatar: '/avatars/avatar-5.jpg',
    content: 'Hệ thống bảo mật tốt, thông tin được bảo vệ an toàn. Chúng tôi tin tưởng khi giao dịch trên sàn này.',
    rating: 5,
  },
  {
    name: 'Vũ Thị Phương',
    role: 'Giám đốc Điều hành',
    company: 'BioTech Innovations',
    avatar: '/avatars/avatar-6.jpg',
    content: 'HANOTEX đã giúp chúng tôi mở rộng mạng lưới đối tác và tìm được nhiều cơ hội hợp tác mới.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những phản hồi tích cực từ cộng đồng người dùng HANOTEX
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-medium transition-all duration-300"
            >
              <div className="card-body">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary-600" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-600 text-center mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-600">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-primary-600 font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  4.9/5
                </div>
                <div className="text-gray-600">
                  Đánh giá trung bình
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600">
                  Khách hàng hài lòng
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">
                  Đánh giá tích cực
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
