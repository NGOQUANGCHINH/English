# English Learning Hub 🌍

Một ứng dụng web hiện đại để học tiếng Anh với giao diện Minimalism, hiệu ứng mượt mà, và nhiều tính năng học tập toàn diện.

## 🎯 Tính Năng Chính

### 📊 Dashboard
- **Lịch Học Tập**: Hình ảnh trực quan ngày học (xanh) và ngày không học (xám)
- **Streak Tracking**: Theo dõi chuỗi ngày học liên tục
- **Thống Kê**: Hiển thị tổng từ vựng, lỗi ghi nhớ, từ học hôm nay
- **Danh Sách Từ Hôm Nay**: Xem các từ đã học trong ngày

### 📚 My Vocabulary
- Duyệt toàn bộ từ vựng
- Tìm kiếm từ theo tiếng Anh hoặc tiếng Việt
- Phát âm từ vựng
- Thêm từ vào lịch học

### 🎴 Flashcard
- Lật thẻ để xem nghĩa
- Điều hướng trước/sau
- Đánh dấu đúng/sai
- Đảo thẻ ngẫu nhiên
- Phát âm từ

### ⚡ Verb Forms
- Bảng động từ bất quy tắc đầy đủ (V1 - V2 - V3)
- 150+ động từ tiếng Anh
- Tích để ghi nhớ
- Thiết kế bảng dễ đọc

### ⌨️ Typing Practice
- Xem nghĩa Việt, gõ tiếng Anh
- Kiểm tra chính tả
- Điều hướng bằng nút hoặc mũi tên
- Phản hồi tức thì

### ❓ Quiz
- Trắc nghiệm 4 đáp án (A, B, C, D)
- Câu hỏi tiếng Anh, đáp án tiếng Việt
- Đảo ngôn ngữ câu hỏi/đáp án
- Đảo ngẫu nhiên đáp án
- Phát âm câu hỏi
- Danh sách câu hỏi với trạng thái

### ⚙️ Settings
- Điều chỉnh tốc độ nói (0.5x - 2x)
- Chọn giọng nói
- Dark Mode
- Tùy chọn thông báo
- Xóa tất cả dữ liệu

## 🚀 Bắt Đầu

### Cài Đặt
1. Clone hoặc tải file
2. Mở `index.html` trong trình duyệt
3. Trang sẽ tải từ vựng mặc định

### Tải File JSON
1. Chuẩn bị file JSON theo format (xem `data/sample-vocabulary.json`)
2. Nhấn nút "📤 Upload JSON" trong menu
3. Chọn file từ máy tính
4. Từ vựng sẽ được cập nhật tự động

## 📁 Cấu Trúc Dự Án

```
english-learning-app/
├── index.html              # Trang chính
├── css/
│   ├── style.css          # Kiểu chính
│   └── animations.css     # Hiệu ứng
├── js/
│   ├── app.js             # Ứng dụng chính
│   ├── dashboard.js       # Dashboard
│   ├── vocabulary.js      # Quản lý từ vựng
│   ├── flashcard.js       # Flashcard
│   ├── verb-forms.js      # Động từ bất quy tắc
│   ├── typing-practice.js # Luyện gõ
│   ├── quiz.js            # Trắc nghiệm
│   ├── settings.js        # Cài đặt
│   └── storage.js         # Quản lý lưu trữ
└── data/
    └── sample-vocabulary.json  # Mẫu từ vựng
```

## 📋 Format JSON

```json
{
  "version": 1,
  "type": "words",
  "words": [
    { "term": "hello", "meaning": "xin chào" },
    { "term": "thank", "meaning": "cảm ơn" }
  ]
}
```

## 💾 Lưu Trữ Dữ Liệu

Ứng dụng sử dụng **LocalStorage** để lưu:
- Từ vựng
- Lịch học tập
- Lỗi ghi nhớ
- Streak
- Cài đặt

## 🎨 Tính Năng Thiết Kế

### Minimalism
- Giao diện sạch, đơn giản
- Không quá phức tạp
- Focus vào chức năng

### Smooth Animations
- Transition mượt mà (0.3s)
- Hiệu ứng flip, slide, fade
- Không gây khó chịu

### Dark Mode
- Chế độ tối đầy đủ
- Bảo vệ mắt
- Lưu tùy chọn

### Responsive Design
- Hoạt động trên desktop
- Tối ưu tablet
- Mobile-friendly

## 🎯 Cách Sử Dụng

### Dashboard
1. Mở trang, vào Dashboard
2. Xem lịch học, streak, thống kê
3. Xem từ học hôm nay

### Flashcard
1. Vào "Flashcard"
2. Đọc từ tiếng Anh
3. Nhấn card để lật xem nghĩa
4. Đánh dấu đúng/sai
5. Tiếp tục từ tiếp theo

### Quiz
1. Vào "Quiz"
2. Đọc câu hỏi, chọn đáp án
3. Xem kết quả tức thì
4. Nếu sai, thấy đáp án đúng
5. Tiếp tục câu tiếp

### Verb Forms
1. Vào "Verb Forms"
2. Duyệt danh sách động từ
3. Nhấn "☐ Lưu" để ghi nhớ
4. Động từ được tích sẽ có nền xanh

### Typing Practice
1. Vào "Typing Practice"
2. Xem nghĩa Việt
3. Gõ từ tiếng Anh
4. Nhấn Enter hoặc "Kiểm Tra"
5. Xem phản hồi

## 🔧 Tùy Chỉnh

### Thêm Từ Vựng
1. Tạo file JSON
2. Làm theo format mẫu
3. Tải lên bằng nút Upload

### Đổi Màu
Mở `css/style.css`, tìm phần `:root` và đổi các biến màu

### Đổi Font
Mở `css/style.css`, sửa `font-family`

## 📱 Browser Support

- Chrome/Edge (khuyến nghị)
- Firefox
- Safari
- Các trình duyệt modern khác

## 🌐 Web Speech API

- **Text-to-Speech**: Phát âm từ vựng
- Hỗ trợ tiếng Anh
- Tốc độ điều chỉnh được

## 📝 Lưu Ý

- Dữ liệu lưu trên máy cục bộ (LocalStorage)
- Xóa cache trình duyệt sẽ xóa tất cả dữ liệu
- Backup dữ liệu bằng cách export file JSON

## 🎓 Mẹo Học Tập

1. **Streak**: Cố gắng học mỗi ngày để duy trì streak
2. **Flashcard**: Lặp lại từ sai nhiều lần
3. **Quiz**: Kiểm tra kiến thức định kỳ
4. **Typing**: Luyện gõ để cải thiện viết
5. **Verb Forms**: Ghi nhớ động từ bất quy tắc

## 🤝 Đóng Góp

Có ý tưởng? Hãy cải thiện ứng dụng!

## 📄 License

Mã nguồn mở - Tự do sử dụng

---

**Happy Learning! 🎉**
