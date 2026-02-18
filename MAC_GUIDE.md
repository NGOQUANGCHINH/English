# 🍎 English Learning Hub - Hướng Dẫn Cho Mac

## 🎯 Bắt Đầu Nhanh Nhất Trên Mac

### Cách 1: Mở Trực Tiếp (Dễ Nhất)

1. **Mở Finder**
   - Nhấn `Cmd + Space`
   - Gõ "Finder"
   - Nhấn Enter

2. **Điều Hướng Đến Thư Mục**
   - Đường dẫn: `/Applications/Index_code/English/english-learning-app/`

3. **Mở File**
   - Tìm file `index.html`
   - Nhấp chuột phải (hoặc Ctrl+Click)
   - Chọn "Open With" → "Chrome" (hoặc Safari)
   - Ứng dụng sẽ mở ngay

### Cách 2: Terminal (Recommended)

1. **Mở Terminal**
   - Nhấn `Cmd + Space`
   - Gõ "Terminal"
   - Nhấn Enter

2. **Điều Hướng Đến Thư Mục**
   ```bash
   cd /Applications/Index_code/English/english-learning-app
   ```

3. **Cài Đặt Node.js (Lần Đầu)**
   ```bash
   # Kiểm tra xem đã cài chưa
   node --version
   npm --version

   # Nếu chưa, cài Homebrew trước
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

   # Rồi cài Node.js
   brew install node
   ```

4. **Chạy Ứng Dụng**
   ```bash
   # Lần đầu tiên
   npm install
   npm start

   # Lần sau chỉ cần
   npm start
   ```

   Ứng dụng sẽ tự động mở tại `http://localhost:8000`

### Cách 3: Dùng http-server Trực Tiếp

1. **Mở Terminal**
   ```bash
   cd /Applications/Index_code/English/english-learning-app
   ```

2. **Cài http-server**
   ```bash
   npm install -g http-server
   ```

3. **Chạy**
   ```bash
   http-server -p 8000 -o index.html
   ```

## 🔧 Cấu Hình Chi Tiết

### Cài Đặt Node.js Trên Mac

**Option 1: Dùng Homebrew (Recommended)**
```bash
# Cài Homebrew (nếu chưa)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài Node.js
brew install node

# Xác nhận cài đặt
node --version
npm --version
```

**Option 2: Download Từ nodejs.org**
1. Truy cập https://nodejs.org
2. Tải "LTS" (Long Term Support)
3. Cài như bình thường
4. Khởi động lại Terminal

### Mở Port 8000 (Nếu Bị Lỗi)

```bash
# Tìm process đang chạy port 8000
lsof -i :8000

# Kill process (nếu cần)
kill -9 <PID>

# Hoặc dùng port khác
http-server -p 3000 -o index.html
```

## 💾 Tải Từ Vựng Trên Mac

### Cách 1: Tạo File JSON

1. **Mở Terminal hoặc Text Editor**

2. **Dùng Terminal**
   ```bash
   cd /Applications/Index_code/English/english-learning-app/data

   # Tạo file mới
   nano my-vocabulary.json
   ```

3. **Dán JSON**
   ```json
   {
     "version": 1,
     "type": "words",
     "words": [
       { "term": "hello", "meaning": "xin chào" },
       { "term": "thanks", "meaning": "cảm ơn" }
     ]
   }
   ```

4. **Lưu File**
   - Nhấn `Ctrl + O` → Enter
   - Nhấn `Ctrl + X`

### Cách 2: Dùng Text Editor

1. **Mở TextEdit**
   - Cmd + Space → gõ "TextEdit"

2. **Format → Plain Text** (quan trọng!)

3. **Dán JSON**

4. **Save**
   - Cmd + S
   - Chọn format JSON (hoặc .json)

5. **Upload vào Ứng Dụng**
   - Mở app
   - Nhấn "📤 Upload JSON"
   - Chọn file

## 🐛 Khắc Phục Lỗi Trên Mac

### "Lỗi: Command not found"
```bash
# Cài lại Node.js
brew install node

# Hoặc download từ nodejs.org
```

### "Port 8000 đã được sử dụng"
```bash
# Dùng port khác
http-server -p 3000 -o index.html

# Hoặc tìm process
lsof -i :8000
kill -9 <PID>
```

### "Phát âm không hoạt động"
- Mở App → Settings
- Kiểm tra "Giọng Nói" (Voice Select)
- Chọn giọng tiếng Anh

### "Dark mode không lưu"
- Xóa cache: Cmd + Shift + Delete
- Hoặc Cmd + Delete (Trash)

## 🌐 Truy Cập Từ iPhone/iPad

### Cùng WiFi Network

1. **Trên Mac, chạy ứng dụng**
   ```bash
   http-server -p 8000
   ```

2. **Lấy IP Address của Mac**
   ```bash
   ifconfig | grep "inet "
   ```
   Tìm dòng có `192.168.x.x` hoặc `10.x.x.x`

3. **Trên iPhone/iPad**
   - Mở Safari
   - Nhập: `http://192.168.x.x:8000`
   - Bắt đầu học!

## 📱 Sử Dụng Trên Mac

### Keyboard Shortcuts

| Phím | Tác Vụ |
|------|--------|
| `Cmd + ,` | Mở Settings |
| `Cmd + W` | Đóng Tab |
| `Cmd + Q` | Đóng Browser |
| `Cmd + Shift + Delete` | Xóa Cache |
| `F12` hoặc `Cmd + Option + I` | Mở Developer Tools |

### Tips & Tricks

1. **Phóng to/Thu nhỏ**
   - `Cmd + +` (phóng to)
   - `Cmd + -` (thu nhỏ)
   - `Cmd + 0` (reset)

2. **Bookmark**
   - `Cmd + D` (bookmark trang)

3. **Đọc Outloud** (Safari)
   - `Cmd + Option + R`

## 🔐 Backup Dữ Liệu

### Cách 1: Export qua DevTools

1. Mở Console (Cmd + Option + J)
2. Gõ:
   ```javascript
   JSON.stringify(localStorage)
   ```
3. Copy dữ liệu
4. Lưu vào file text

### Cách 2: Tạo Backup Tự Động

```bash
# Copy data folder
cp -r /Applications/Index_code/English/english-learning-app/data ~/Desktop/app-backup

# Restore sau
cp -r ~/Desktop/app-backup /Applications/Index_code/English/
```

## 🚀 Deploy Trên Mac

### Option 1: GitHub Pages

```bash
# 1. Tạo repo trên GitHub
# 2. Clone vào máy
# 3. Copy files vào thư mục
# 4. Push lên GitHub
# 5. Enable GitHub Pages

git add .
git commit -m "Initial commit"
git push origin main
```

### Option 2: Netlify

```bash
# 1. Cài Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod --dir .
```

### Option 3: Vercel

```bash
# 1. Cài Vercel CLI
npm install -g vercel

# 2. Deploy
vercel
```

## 📚 Tài Liệu Thêm

- Mở `QUICKSTART.html` trong trình duyệt để xem hướng dẫn chi tiết
- Đọc `README.md` để hiểu tất cả tính năng
- Xem `INSTALL.md` cho hướng dẫn chung

## 🎯 Checklist

- [ ] Node.js đã cài (kiểm tra: `node --version`)
- [ ] npm đã cài (kiểm tra: `npm --version`)
- [ ] Terminal có thể chạy `npm start`
- [ ] Ứng dụng mở tại localhost:8000
- [ ] Browser hỗ trợ Web Speech API (Chrome/Safari)
- [ ] Có thể tải file JSON
- [ ] Dark mode hoạt động

## 💬 Câu Hỏi Thường Gặp

**Q: Phải cài Node.js không?**
A: Không bắt buộc. Bạn có thể mở `index.html` trực tiếp, nhưng dùng local server tốt hơn.

**Q: Ứng dụng hoạt động offline không?**
A: Có! Toàn bộ hoạt động offline. Chỉ cần trình duyệt.

**Q: Có API backend không?**
A: Không. Tất cả chạy trên trình duyệt, dữ liệu lưu local.

**Q: Có thể xóa tất cả data không?**
A: Có. Settings → "🗑️ Xóa Tất Cả Dữ Liệu"

**Q: Sync data giữa các thiết bị?**
A: Hiện không hỗ trợ. Phải upload JSON riêng trên mỗi thiết bị.

---

**Chúc bạn học tiếng Anh hiệu quả trên Mac! 🍎📚**
