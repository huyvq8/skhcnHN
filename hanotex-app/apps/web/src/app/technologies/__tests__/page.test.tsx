import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TechnologiesPage from '../page';

// Mock the API client
jest.mock('@/lib/api', () => ({
  getTechnologies: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn(),
  })),
}));

describe('TechnologiesPage', () => {
  const mockApiClient = require('@/lib/api');
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock successful API response
    mockApiClient.getTechnologies.mockResolvedValue({
      success: true,
      data: [
        {
          id: 1,
          title: 'Hệ thống đốt LPG cho động cơ ô tô',
          trl_level: 7,
          status: 'ACTIVE',
          public_summary: 'Công nghệ đốt LPG tiên tiến cho động cơ ô tô',
          category_id: 2,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: 2,
          title: 'Hệ thống AI nhận diện bệnh lý từ hình ảnh y tế',
          trl_level: 6,
          status: 'ACTIVE',
          public_summary: 'Ứng dụng trí tuệ nhân tạo trong chẩn đoán y tế',
          category_id: 3,
          created_at: '2025-01-14T10:00:00Z'
        }
      ]
    });
  });

  it('renders loading state initially', () => {
    render(<TechnologiesPage />);
    
    // Should show loading spinner
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders page title and description', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Danh sách công nghệ')).toBeInTheDocument();
      expect(screen.getByText('Khám phá và tìm kiếm các công nghệ phù hợp với nhu cầu của bạn')).toBeInTheDocument();
    });
  });

  it('renders search form', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Tìm kiếm công nghệ...');
      const searchButton = screen.getByText('Tìm kiếm');
      
      expect(searchInput).toBeInTheDocument();
      expect(searchButton).toBeInTheDocument();
    });
  });

  it('renders filter options', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Danh mục')).toBeInTheDocument();
      expect(screen.getByText('TRL Level')).toBeInTheDocument();
      expect(screen.getByText('Trạng thái')).toBeInTheDocument();
    });
  });

  it('renders technologies list after loading', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Hệ thống đốt LPG cho động cơ ô tô')).toBeInTheDocument();
      expect(screen.getByText('Hệ thống AI nhận diện bệnh lý từ hình ảnh y tế')).toBeInTheDocument();
    });
  });

  it('displays TRL levels with correct colors', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const trl7 = screen.getByText('TRL 7');
      const trl6 = screen.getByText('TRL 6');
      
      expect(trl7).toBeInTheDocument();
      expect(trl6).toBeInTheDocument();
    });
  });

  it('displays technology status', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getAllByText('Hoạt động')).toHaveLength(2);
    });
  });

  it('updates search input value when typing', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Tìm kiếm công nghệ...');
      
      fireEvent.change(searchInput, { target: { value: 'AI technology' } });
      
      expect(searchInput).toHaveValue('AI technology');
    });
  });

  it('changes view mode when toggle buttons are clicked', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const gridButton = screen.getByRole('button', { name: /grid/i });
      const listButton = screen.getByRole('button', { name: /list/i });
      
      // Initially grid view should be active
      expect(gridButton).toHaveClass('bg-blue-100', 'text-blue-700');
      
      // Click list view
      fireEvent.click(listButton);
      
      // List view should now be active
      expect(listButton).toHaveClass('bg-blue-100', 'text-blue-700');
      expect(gridButton).not.toHaveClass('bg-blue-100', 'text-blue-700');
    });
  });

  it('changes sort order when sort buttons are clicked', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const dateSortButton = screen.getByText('Ngày tạo');
      const trlSortButton = screen.getByText('TRL Level');
      
      // Click TRL Level sort
      fireEvent.click(trlSortButton);
      
      // Should call API with new sort parameters
      expect(mockApiClient.getTechnologies).toHaveBeenCalledWith(
        expect.objectContaining({
          sort: 'trl_level',
          order: 'DESC'
        })
      );
    });
  });

  it('filters technologies by category', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const categorySelect = screen.getByDisplayValue('Tất cả danh mục');
      
      fireEvent.change(categorySelect, { target: { value: '2' } });
      
      // Should call API with category filter
      expect(mockApiClient.getTechnologies).toHaveBeenCalledWith(
        expect.objectContaining({
          category: '2'
        })
      );
    });
  });

  it('filters technologies by TRL level', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const trlSelect = screen.getByDisplayValue('Tất cả TRL');
      
      fireEvent.change(trlSelect, { target: { value: '7-9' } });
      
      // Should call API with TRL filter
      expect(mockApiClient.getTechnologies).toHaveBeenCalledWith(
        expect.objectContaining({
          trl_level: '7-9'
        })
      );
    });
  });

  it('filters technologies by status', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const statusSelect = screen.getByDisplayValue('Đang hoạt động');
      
      fireEvent.change(statusSelect, { target: { value: 'PENDING' } });
      
      // Should call API with status filter
      expect(mockApiClient.getTechnologies).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'PENDING'
        })
      );
    });
  });

  it('shows empty state when no technologies found', async () => {
    // Mock empty response
    mockApiClient.getTechnologies.mockResolvedValue({
      success: true,
      data: []
    });
    
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Không tìm thấy công nghệ nào')).toBeInTheDocument();
      expect(screen.getByText('Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    // Mock API error
    mockApiClient.getTechnologies.mockRejectedValue(new Error('API Error'));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error fetching technologies:', expect.any(Error));
    });
    
    consoleSpy.mockRestore();
  });

  it('displays results count', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Tìm thấy 2 công nghệ')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', async () => {
    render(<TechnologiesPage />);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Tìm kiếm công nghệ...');
      const searchButton = screen.getByText('Tìm kiếm');
      
      expect(searchInput).toHaveAttribute('type', 'text');
      expect(searchButton).toHaveAttribute('type', 'submit');
    });
  });
});
