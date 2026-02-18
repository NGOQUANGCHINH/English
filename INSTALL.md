# 🚀 Hướng Dẫn Cài Đặt & Chạy English Learning Hub

## 📋 Yêu Cầu

- Trình duyệt web hiện đại (Chrome, Edge, Firefox, Safari)
- Node.js (tùy chọn, để chạy local server)

## 🎯 Cách 1: Chạy Trực Tiếp (Đơn Giản Nhất)

### Trên Windows
1. Mở file `index.html` bằng trình duyệt
2. Ứng dụng sẽ tải tự động

### Trên macOS
1. Mở Finder, tìm file `index.html`
2. Nhấp chuột phải → Mở bằng → Chọn trình duyệt (Chrome, Safari, v.v.)

### Trên Linux
```bash
# Mở bằng Firefox
firefox /path/to/index.html

# Hoặc Chrome
google-chrome /path/to/index.html
```

## 🔧 Cách 2: Chạy Local Server (Khuyến Nghị)

### Bước 1: Cài Đặt Node.js
Tải từ: https://nodejs.org (phiên bản LTS)

### Bước 2: Mở Terminal

**Windows:**
- Nhấn `Win + R`, gõ `cmd`, nhấn Enter
- Hoặc: PowerShell / Git Bash

**macOS:**
- Cmd + Space → gõ "Terminal" → Enter

**Linux:**
- Mở Terminal từ menu

### Bước 3: Điều Hướng Đến Thư Mục

```bash
# Thay đổi thư mục
cd /Applications/Index_code/English/english-learning-app

# Hoặc nếu ở Windows
cd C:\path\to\english-learning-app
```

### Bước 4: Cài Đặt & Chạy

```bash
# Lần đầu tiên (cài đặt dependencies)
npm install

# Chạy ứng dụng
npm start
```

Ứng dụng sẽ tự động mở tại `http://localhost:8000`

### Hoặc dùng http-server trực tiếp:

```bash
# Nếu chưa cài
npm install -g http-server

# Chạy
http-server -p 8000 -o index.html
```

## 📱 Chạy Trên Điện Thoại

### Cùng Mạng WiFi

1. Trên máy tính, chạy server local
2. Lấy địa chỉ IP của máy tính:
   - **Windows:** gõ `ipconfig` trong CMD
   - **macOS/Linux:** gõ `ifconfig` hoặc `ip addr` trong Terminal
3. Tìm dòng có IPv4 Address (ví dụ: `192.168.1.100`)
4. Trên điện thoại, mở trình duyệt
5. Nhập: `http://192.168.1.100:8000`

## 🎨 Tùy Chỉnh

### Thay Đổi Port

Nếu port 8000 bị chiếm:

```bash
http-server -p 3000 -o index.html
```

### Đổi Từ Vựng Mặc Định

Sửa file `js/app.js`, tìm hàm `getDefaultVocabulary()` và thay đổi các từ

### Đổi Màu Chủ Đề

Sửa file `css/style.css`, tìm phần `:root` và đổi biến `--primary`, `--secondary`, v.v.

## 📦 Cấu Trúc Thư Mục

```
english-learning-app/
├── index.html              # Trang chính
├── QUICKSTART.html         # Hướng dẫn nhanh
├── README.md               # Tài liệu đầy đủ
├── INSTALL.md              # File này
├── package.json            # Cấu hình npm
├── .gitignore              # Gitignore
├── css/
│   ├── style.css           # Kiểu chính
│   └── animations.css      # Hiệu ứng
├── js/
│   ├── app.js              # Ứng dụng chính
│   ├── dashboard.js        # Dashboard
│   ├── vocabulary.js       # Quản lý từ vựng
│   ├── flashcard.js        # Flashcard
│   ├── verb-forms.js       # Động từ
│   ├── typing-practice.js  # Luyện gõ
│   ├── quiz.js             # Trắc nghiệm
│   ├── settings.js         # Cài đặt
│   └── storage.js          # Lưu trữ
└── data/
    └── sample-vocabulary.json  # Mẫu từ vựng
```

## ⚠️ Vấn Đề Phổ Biến

### "Không thể mở index.html"
→ Dùng local server (Cách 2) thay vì mở file trực tiếp

### "Phát âm không hoạt động"
→ Kiểm tra xem trình duyệt có hỗ trợ Web Speech API không
→ Thử chuyển sang Chrome hoặc Edge

### "LocalStorage không hoạt động"
→ Không mở ứng dụng ở file:// protocol
→ Phải chạy trên local server hoặc domain

### "Port 8000 đã được sử dụng"
→ Đổi port: `http-server -p 3000 -o index.html`
→ Hoặc tìm process đang chạy: `netstat -tulpn | grep 8000`

## 🎓 Các Bước Tiếp Theo

1. **Tải Từ Vựng:** Chuẩn bị file JSON theo format
2. **Upload:** Nhấn "📤 Upload JSON" trong ứng dụng
3. **Bắt Đầu Học:** Chọn bài từ menu

## 📚 Tài Liệu Thêm

- `README.md` - Tài liệu đầy đủ về tính năng
- `QUICKSTART.html` - Hướng dẫn nhanh (mở trong trình duyệt)

## 🆘 Cần Giúp?

1. Kiểm tra xem tất cả file có tồn tại không
2. Xem console trình duyệt (F12 → Console) để xem lỗi
3. Thử xóa cache/cookies của trình duyệt

## 🌐 Deploy Online (Tùy Chọn)

Để deploy lên web:

### Netlify
```bash
# Cài netlify-cli
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

### GitHub Pages
1. Push code lên GitHub
2. Settings → Pages → Deploy from branch
3. Chọn main branch
4. Truy cập: `username.github.io/english-learning-app`

### Vercel
```bash
npm install -g vercel
vercel
```

## ✅ Checklist

- [ ] Đã cài Node.js (nếu dùng Cách 2)
- [ ] Đã điều hướng đến thư mục đúng
- [ ] Đã chạy `npm install` (nếu cần)
- [ ] Đã chạy `npm start` hoặc `http-server`
- [ ] Ứng dụng mở tại localhost
- [ ] Có thể tải file JSON
- [ ] Tất cả tính năng hoạt động

---

**Chúc bạn học tiếng Anh vui vẻ! 🎉**
