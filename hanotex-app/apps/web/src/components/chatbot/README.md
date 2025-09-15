# HANOTEX Intelligent Chatbot

## Tổng quan

Chatbot thông minh của HANOTEX được thiết kế để hỗ trợ người dùng trong việc đăng ký và quản lý sản phẩm khoa học công nghệ.

## Cấu trúc Components

### 1. IntelligentChatbot.tsx
- **Mục đích**: Chatbot đầy đủ tính năng cho trang đăng ký sản phẩm
- **Tính năng**:
  - Hướng dẫn chi tiết từng bước đăng ký
  - Giải thích thuật ngữ chuyên môn (TRL, IP, etc.)
  - Gợi ý nội dung phù hợp
  - Hỗ trợ OCR và tự động điền form
  - Gợi ý câu hỏi thường gặp

### 2. SimpleChatbot.tsx
- **Mục đích**: Chatbot đơn giản cho các trang khác
- **Tính năng**:
  - Trả lời câu hỏi cơ bản về HANOTEX
  - Hướng dẫn sử dụng sàn giao dịch
  - Thông tin liên hệ và hỗ trợ

### 3. GlobalChatbot.tsx
- **Mục đích**: Component quản lý chatbot toàn cục
- **Tính năng**:
  - Tự động chọn loại chatbot phù hợp
  - Auto-open cho người dùng mới
  - Quản lý trạng thái chatbot

## Tính năng chính

### 🤖 Trí tuệ nhân tạo
- **Natural Language Processing**: Hiểu và xử lý câu hỏi tiếng Việt
- **Context Awareness**: Nhận biết ngữ cảnh và đưa ra câu trả lời phù hợp
- **Learning**: Cải thiện qua tương tác với người dùng

### 📚 Kiến thức chuyên sâu
- **TRL (Technology Readiness Level)**: Giải thích 9 mức độ phát triển công nghệ
- **Sở hữu trí tuệ**: Patent, Trademark, Copyright, Trade Secret
- **Pháp lý & Lãnh thổ**: Bảo hộ, chứng nhận tiêu chuẩn
- **Quy trình đăng ký**: Hướng dẫn từng bước chi tiết

### 🎯 Hỗ trợ đăng ký sản phẩm
- **Hướng dẫn form**: Giải thích từng trường thông tin
- **Validation**: Kiểm tra và gợi ý sửa lỗi
- **OCR Integration**: Hỗ trợ đọc tài liệu tự động
- **Best Practices**: Mẹo và kinh nghiệm đăng ký hiệu quả

### 💡 Gợi ý thông minh
- **Quick Actions**: Các hành động nhanh
- **Suggested Questions**: Câu hỏi thường gặp
- **Contextual Help**: Hỗ trợ theo ngữ cảnh
- **Progressive Disclosure**: Hiển thị thông tin theo mức độ

## Cách sử dụng

### Cho người dùng mới
1. Truy cập trang đăng ký sản phẩm
2. Chatbot sẽ tự động hiện ra sau 3 giây
3. Chọn câu hỏi gợi ý hoặc nhập câu hỏi riêng
4. Nhận hướng dẫn chi tiết và hỗ trợ

### Cho người dùng có kinh nghiệm
1. Click vào icon chatbot ở góc phải màn hình
2. Hỏi trực tiếp về vấn đề cần hỗ trợ
3. Nhận câu trả lời nhanh chóng và chính xác

## Tích hợp

### Layout chính
```tsx
import GlobalChatbot from '@/components/chatbot/GlobalChatbot';

// Trong RootLayout
<GlobalChatbot />
```

### Trang đăng ký
```tsx
import IntelligentChatbot from '@/components/chatbot/IntelligentChatbot';

// Tự động hiển thị chatbot thông minh
```

## Customization

### Thêm câu trả lời mới
```tsx
// Trong getBotResponse function
if (message.includes('keyword')) {
  return 'Câu trả lời mới...';
}
```

### Thêm gợi ý
```tsx
suggestions: [
  'Gợi ý 1',
  'Gợi ý 2',
  'Gợi ý 3'
]
```

### Tùy chỉnh UI
```tsx
// Thay đổi màu sắc, kích thước, vị trí
className="fixed bottom-6 right-6 bg-blue-600..."
```

## Roadmap

### Phase 1 ✅
- [x] Chatbot cơ bản
- [x] Tích hợp vào layout
- [x] Hướng dẫn đăng ký sản phẩm

### Phase 2 🚧
- [ ] Machine Learning integration
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Advanced analytics

### Phase 3 📋
- [ ] AI-powered recommendations
- [ ] Integration with external APIs
- [ ] Real-time collaboration
- [ ] Advanced personalization

## Support

Nếu cần hỗ trợ về chatbot, vui lòng liên hệ:
- Email: dev@hanotex.vn
- GitHub: [HANOTEX Repository]
- Documentation: [Internal Wiki]
