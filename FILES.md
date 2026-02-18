# 📚 English Learning Hub - Tất Cả File & Cấu Trúc

## 🎯 File Chính

### HTML
- **index.html** - Trang chính (mở để bắt đầu)
- **QUICKSTART.html** - Hướng dẫn nhanh (mở trong trình duyệt)

### Tài Liệu
- **README.md** - Tài liệu đầy đủ về tính năng
- **INSTALL.md** - Hướng dẫn cài đặt & chạy
- **FILES.md** - File này (danh sách file & cấu trúc)

## 📁 Cấu Trúc Thư Mục Đầy Đủ

```
english-learning-app/
│
├── 📄 index.html                    # Trang chính
├── 📄 QUICKSTART.html               # Hướng dẫn nhanh
├── 📄 README.md                     # Tài liệu đầy đủ
├── 📄 INSTALL.md                    # Hướng dẫn cài đặt
├── 📄 FILES.md                      # Danh sách file này
├── 📄 package.json                  # Cấu hình npm
├── 📄 .gitignore                    # Git ignore
│
├── 📁 css/
│   ├── style.css                    # Kiểu chính & layout
│   └── animations.css               # Hiệu ứng & transition
│
├── 📁 js/
│   ├── app.js                       # Ứng dụng chính
│   ├── storage.js                   # Quản lý LocalStorage
│   ├── dashboard.js                 # Dashboard & thống kê
│   ├── vocabulary.js                # Quản lý từ vựng
│   ├── flashcard.js                 # Flashcard
│   ├── verb-forms.js                # Bảng động từ bất quy tắc
│   ├── typing-practice.js           # Luyện gõ tiếng Anh
│   ├── quiz.js                      # Trắc nghiệm
│   └── settings.js                  # Cài đặt & tùy chỉnh
│
└── 📁 data/
    ├── sample-vocabulary.json       # Mẫu từ vựng (20 từ)
    ├── fruits-and-food.json         # Từ vựng trái cây & đồ ăn (100+ từ)
    └── nature-and-seasons.json      # Từ vựng tự nhiên & mùa (100+ từ)
```

## 📄 Chi Tiết Từng File

### HTML Files

#### **index.html** (1500+ dòng)
- Cấu trúc chính của ứng dụng
- Khai báo tất cả section & elements
- Liên kết CSS & JS
- Chứa: Sidebar, Header, Main content, Modals

#### **QUICKSTART.html** (400+ dòng)
- Hướng dẫn HTML theo style modern
- Tính năng, cách sử dụng, FAQ
- CSS inline đầy đủ
- Tối ưu responsive

### CSS Files

#### **css/style.css** (800+ dòng)
- Biến CSS (màu, kích thước, shadow, v.v.)
- Giao diện chính (Minimalism)
- Layout Flexbox & Grid
- Responsive design
- Dark mode support
- Sidebar, Header, Buttons, Forms, Cards

#### **css/animations.css** (300+ dòng)
- @keyframes: slideUp, slideDown, fadeIn, flip, rotate, shake, v.v.
- Animation timing & effects
- Hover states
- Loading & success animations

### JavaScript Files

#### **js/app.js** (300+ dòng)
- Class EnglishLearningApp chính
- Khởi tạo ứng dụng
- Setup event listeners
- Dark mode toggle
- Text-to-Speech API
- JSON upload handler
- Navigation giữa sections

#### **js/storage.js** (200+ dòng)
- Quản lý LocalStorage
- CRUD: getVocabulary, saveVocabulary, getLearningHistory, v.v.
- Streak management
- Mistakes tracking
- Verb forms bookmarking
- Quiz answers storage

#### **js/dashboard.js** (250+ dòng)
- Dashboard initialization
- Stats update (Streak, Total Words, Mistakes, Today's Words)
- Calendar rendering (lịch học tập)
- Today's words display
- Inline CSS cho dashboard

#### **js/vocabulary.js** (150+ dòng)
- Vocabulary module
- Search & filter functionality
- Display vocabulary list
- Speak pronunciation
- Add to learning history
- Responsive grid layout

#### **js/flashcard.js** (200+ dòng)
- Flashcard module
- Card flip animation
- Navigation (next/prev)
- Shuffle functionality
- Mark correct/incorrect
- Speak pronunciation
- Smooth transitions
- Inline CSS cho flashcard

#### **js/verb-forms.js** (450+ dòng)
- 150+ irregular verbs (V1-V2-V3)
- Dynamic table rendering
- Mark verbs (tích để ghi nhớ)
- Responsive table
- Inline CSS & styling

#### **js/typing-practice.js** (200+ dòng)
- Typing practice mode
- Answer validation
- Instant feedback (correct/incorrect)
- Navigation (arrows & buttons)
- Error animation
- Inline CSS

#### **js/quiz.js** (350+ dòng)
- Quiz generation
- 4-option multiple choice
- Language toggle (English ↔ Vietnamese)
- Answer shuffling
- Quiz list modal
- Answer tracking
- Inline CSS & styling

#### **js/settings.js** (200+ dòng)
- Settings module
- Speech rate adjustment (0.5x - 2x)
- Voice selection
- Dark mode toggle
- Notifications
- Background music
- Data reset functionality
- Inline CSS

### Data Files (JSON)

#### **data/sample-vocabulary.json** (100+ từ)
- Format chuẩn JSON
- 20 từ cơ bản mặc định
- Sử dụng mẫu

#### **data/fruits-and-food.json** (100+ từ)
- Từ vựng về trái cây
- Thực phẩm & đồ ăn
- Số lượng & màu sắc

#### **data/nature-and-seasons.json** (100+ từ)
- Ngày tháng
- Mùa & thời tiết
- Động vật
- Thiên nhiên

### Config Files

#### **package.json**
```json
{
  "name": "english-learning-hub",
  "version": "1.0.0",
  "scripts": {
    "start": "npx http-server -p 8000 -o index.html",
    "dev": "npx http-server -p 8000 -c-1"
  }
}
```

#### **.gitignore**
- node_modules/
- .vscode/
- .idea/
- .DS_Store
- v.v.

## 📊 Thống Kê Code

| File | Loại | Dòng | Chức Năng |
|------|------|------|----------|
| index.html | HTML | 1500+ | Cấu trúc chính |
| style.css | CSS | 800+ | Kiểu & layout |
| animations.css | CSS | 300+ | Hiệu ứng |
| app.js | JS | 300+ | Ứng dụng chính |
| storage.js | JS | 200+ | Lưu trữ |
| dashboard.js | JS | 250+ | Dashboard |
| vocabulary.js | JS | 150+ | Từ vựng |
| flashcard.js | JS | 200+ | Flashcard |
| verb-forms.js | JS | 450+ | Động từ (150+ từ) |
| typing-practice.js | JS | 200+ | Luyện gõ |
| quiz.js | JS | 350+ | Trắc nghiệm |
| settings.js | JS | 200+ | Cài đặt |
| **Tổng cộng** | **Nhiều** | **~5000+** | **Ứng dụng hoàn chỉnh** |

## 🎯 Tính Năng Theo File

### Bảng Động Từ (verb-forms.js)
- ✅ 150+ động từ bất quy tắc
- ✅ V1 (Base form)
- ✅ V2 (Past tense)
- ✅ V3 (Past Participle)
- ✅ Nghĩa tiếng Việt
- ✅ Tích để ghi nhớ

**Các động từ có:**
- be, beat, become, begin, bend, bet, bind, bite, bleed, blow
- break, breed, bring, build, burn, buy, catch, choose, come, cost
- cut, deal, dig, do, draw, dream, drink, drive, eat, fall
- feel, fight, find, fly, forbid, forget, forgive, freeze, get, give
- go, grow, hang, have, hear, hide, hit, hold, hurt, keep
- kneel, know, lay, lead, learn, leave, lend, let, lie, light
- lose, make, mean, meet, pay, put, read, ride, ring, rise
- run, say, see, seek, sell, send, set, shake, shine, shoot
- show, shut, sing, sink, sit, sleep, slide, speak, spend, spin
- split, spread, stand, steal, stick, sting, stink, strike, string, swim
- swing, take, teach, tear, tell, think, throw, thrust, understand, wake
- walk, wear, weep, win, wind, write
- **Tất cả đều có nghĩa tiếng Việt**

### Dashboard
- ✅ Lịch 30 ngày (xanh/xám)
- ✅ Streak hiện tại
- ✅ Tổng từ vựng
- ✅ Số lỗi
- ✅ Từ hôm nay
- ✅ Tự động cập nhật

## 🚀 Cách Khởi Động

### Cách 1: Trực Tiếp
```bash
# Mở index.html trong trình duyệt
```

### Cách 2: Local Server
```bash
npm install
npm start
# Hoặc
http-server -p 8000
```

## 📱 Features Được Implement

### Dashboard ✅
- [x] Lịch học (màu xanh/xám)
- [x] Streak tracking
- [x] Thống kê
- [x] Từ hôm nay

### Vocabulary ✅
- [x] Danh sách từ
- [x] Tìm kiếm
- [x] Phát âm

### Flashcard ✅
- [x] Lật thẻ
- [x] Lùi/Tiếp
- [x] Đánh dấu đúng/sai
- [x] Đảo ngẫu nhiên
- [x] Phát âm

### Verb Forms ✅
- [x] 150+ động từ
- [x] V1-V2-V3
- [x] Ghi nhớ (tích)
- [x] Bảng dễ đọc
- [x] Responsive

### Typing Practice ✅
- [x] Nhập từ
- [x] Kiểm tra chính tả
- [x] Feedback tức thì
- [x] Điều hướng (mũi tên)

### Quiz ✅
- [x] 4 đáp án
- [x] Đảo ngôn ngữ
- [x] Phát âm
- [x] Danh sách câu
- [x] Tracking

### Settings ✅
- [x] Tốc độ nói
- [x] Giọng nói
- [x] Dark mode
- [x] Xóa dữ liệu

## 💾 Data Persistence

Tất cả lưu trữ qua **LocalStorage**:
- vocabulary
- learningHistory
- mistakes
- streak
- markedVerbs
- quizAnswers
- settings

## 🎨 Design Features

- ✅ Minimalism style
- ✅ Smooth animations
- ✅ Dark mode
- ✅ Responsive design
- ✅ Sidebar navigation
- ✅ Search functionality
- ✅ Color-coded feedback
- ✅ Interactive UI

## 📖 Tài Liệu

- ✅ README.md - Tài liệu đầy đủ
- ✅ INSTALL.md - Hướng dẫn cài đặt
- ✅ QUICKSTART.html - Hướng dẫn nhanh
- ✅ FILES.md - File này

---

**Tất cả được xây dựng bằng HTML5, CSS3, JavaScript Vanilla - 100% Local Storage - Không cần Framework!**
