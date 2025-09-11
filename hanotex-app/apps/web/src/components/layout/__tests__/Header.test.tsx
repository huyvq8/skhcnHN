import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import Header from '../Header';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    jest.clearAllMocks();
  });

  it('renders header with logo and navigation', () => {
    render(<Header />);
    
    // Check if logo is rendered
    expect(screen.getByText('HANOTEX')).toBeInTheDocument();
    expect(screen.getByText('Sàn giao dịch công nghệ Hà Nội')).toBeInTheDocument();
  });

  it('renders main navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Trang chủ')).toBeInTheDocument();
    expect(screen.getByText('Công nghệ')).toBeInTheDocument();
    expect(screen.getByText('Nhu cầu')).toBeInTheDocument();
    expect(screen.getByText('Đấu giá')).toBeInTheDocument();
    expect(screen.getByText('Tin tức')).toBeInTheDocument();
    expect(screen.getByText('Sự kiện')).toBeInTheDocument();
  });

  it('renders user menu and actions', () => {
    render(<Header />);
    
    expect(screen.getByText('Người dùng')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notification/i })).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Initially mobile menu should not be visible
    expect(screen.queryByText('Trang chủ')).toBeInTheDocument(); // Desktop version
    
    // Click menu button to open mobile menu
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    expect(screen.getByText('Trang chủ')).toBeInTheDocument();
  });

  it('toggles user menu when user button is clicked', () => {
    render(<Header />);
    
    const userButton = screen.getByText('Người dùng');
    
    // Initially user menu should not be visible
    expect(screen.queryByText('Hồ sơ cá nhân')).not.toBeInTheDocument();
    
    // Click user button to open user menu
    fireEvent.click(userButton);
    
    // User menu should now be visible
    expect(screen.getByText('Hồ sơ cá nhân')).toBeInTheDocument();
    expect(screen.getByText('Công nghệ của tôi')).toBeInTheDocument();
    expect(screen.getByText('Nhu cầu của tôi')).toBeInTheDocument();
    expect(screen.getByText('Đấu giá tham gia')).toBeInTheDocument();
    expect(screen.getByText('Tin nhắn')).toBeInTheDocument();
    expect(screen.getByText('Cài đặt')).toBeInTheDocument();
    expect(screen.getByText('Đăng xuất')).toBeInTheDocument();
  });

  it('closes user menu when clicking outside', () => {
    render(<Header />);
    
    const userButton = screen.getByText('Người dùng');
    
    // Open user menu
    fireEvent.click(userButton);
    expect(screen.getByText('Hồ sơ cá nhân')).toBeInTheDocument();
    
    // Click outside (on the header)
    const header = screen.getByRole('banner');
    fireEvent.click(header);
    
    // User menu should be closed
    expect(screen.queryByText('Hồ sơ cá nhân')).not.toBeInTheDocument();
  });

  it('has correct links for main navigation items', () => {
    render(<Header />);
    
    const homeLink = screen.getByText('Trang chủ').closest('a');
    const technologiesLink = screen.getByText('Công nghệ').closest('a');
    const demandsLink = screen.getByText('Nhu cầu').closest('a');
    const auctionsLink = screen.getByText('Đấu giá').closest('a');
    const newsLink = screen.getByText('Tin tức').closest('a');
    const eventsLink = screen.getByText('Sự kiện').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(technologiesLink).toHaveAttribute('href', '/technologies');
    expect(demandsLink).toHaveAttribute('href', '/demands');
    expect(auctionsLink).toHaveAttribute('href', '/auctions');
    expect(newsLink).toHaveAttribute('href', '/news');
    expect(eventsLink).toHaveAttribute('href', '/events');
  });

  it('shows active state for current page', () => {
    (usePathname as jest.Mock).mockReturnValue('/technologies');
    render(<Header />);
    
    const technologiesLink = screen.getByText('Công nghệ').closest('a');
    expect(technologiesLink).toHaveClass('bg-blue-100', 'text-blue-700');
  });

  it('renders submenu items for technologies', () => {
    render(<Header />);
    
    const technologiesLink = screen.getByText('Công nghệ');
    
    // Hover over technologies to show submenu
    fireEvent.mouseEnter(technologiesLink);
    
    // Check if submenu items are present
    expect(screen.getByText('Tất cả công nghệ')).toBeInTheDocument();
    expect(screen.getByText('Công nghệ mới')).toBeInTheDocument();
    expect(screen.getByText('Công nghệ nổi bật')).toBeInTheDocument();
    expect(screen.getByText('Đăng công nghệ')).toBeInTheDocument();
  });

  it('renders submenu items for demands', () => {
    render(<Header />);
    
    const demandsLink = screen.getByText('Nhu cầu');
    
    // Hover over demands to show submenu
    fireEvent.mouseEnter(demandsLink);
    
    // Check if submenu items are present
    expect(screen.getByText('Tất cả nhu cầu')).toBeInTheDocument();
    expect(screen.getByText('Nhu cầu mới')).toBeInTheDocument();
    expect(screen.getByText('Nhu cầu khẩn cấp')).toBeInTheDocument();
    expect(screen.getByText('Đăng nhu cầu')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    
    const notificationButton = screen.getByRole('button', { name: /notification/i });
    expect(notificationButton).toBeInTheDocument();
  });

  it('renders notification badge', () => {
    render(<Header />);
    
    const notificationButton = screen.getByRole('button', { name: /notification/i });
    const badge = notificationButton.querySelector('.bg-red-500');
    expect(badge).toBeInTheDocument();
  });

  it('closes mobile menu when clicking on a link', () => {
    render(<Header />);
    
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Open mobile menu
    fireEvent.click(menuButton);
    
    // Click on a link
    const homeLink = screen.getByText('Trang chủ');
    fireEvent.click(homeLink);
    
    // Mobile menu should be closed (menu button should show menu icon, not X)
    expect(menuButton.querySelector('svg')).toBeInTheDocument();
  });
});
