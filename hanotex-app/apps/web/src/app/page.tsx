import { Suspense } from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedTechnologies from '@/components/home/FeaturedTechnologies';
import CategoriesSection from '@/components/home/CategoriesSection';
import StatsSection from '@/components/home/StatsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export const metadata: Metadata = {
  title: 'Trang chủ - HANOTEX',
  description: 'Sàn giao dịch công nghệ trực tuyến của thành phố Hà Nội. Kết nối doanh nghiệp, viện nghiên cứu và cá nhân trong lĩnh vực khoa học công nghệ.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Technologies */}
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedTechnologies />
      </Suspense>
      
      {/* Categories Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <CategoriesSection />
      </Suspense>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* How It Works Section */}
      <HowItWorksSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
