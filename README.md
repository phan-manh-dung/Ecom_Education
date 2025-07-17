# Ecom_Education

Front-end (FE) về sàn giáo dục thương mại điện tử sử dụng AI

## 🚀 Công nghệ sử dụng

- **React 19** - Framework JavaScript cho UI
- **TypeScript** - Ngôn ngữ lập trình có type safety
- **Vite** - Build tool nhanh cho development
- **Tailwind CSS** - Framework CSS utility-first
- **Ant Design** - Thư viện UI components
- **ESLint** - Linting tool để kiểm tra code

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js (version 16 trở lên)
- npm hoặc yarn

### Hướng dẫn chạy

```bash
# Di chuyển vào thư mục dự án
cd my-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 🌐 Truy cập ứng dụng

- Development: `http://localhost:5173`
- Production: Sau khi build, chạy `npm run preview`

## 📁 Cấu trúc dự án

```
my-app/
├── src/
│   ├── components/     # Các React components
│   ├── pages/          # Các trang chính
│   ├── api/            # API calls
│   ├── mockData/       # Dữ liệu mock
│   └── utils/          # Utility functions
├── public/             # Static assets
└── package.json        # Dependencies và scripts
```

## ✨ Các tính năng nổi bật

- **Trang chủ:**

  - Xem danh sách các khóa học nổi bật, có bộ lọc theo khoảng giá.
  - Xem chi tiết từng khóa học với thông tin đầy đủ, hình ảnh, mô tả, chứng chỉ, hỗ trợ trọn đời...
  - Thêm khóa học vào giỏ hàng hoặc danh sách yêu thích.
  - Xem số lượt xem từng khóa học.
  - Slider banner giới thiệu các chương trình, nhóm cộng đồng.

- **Tìm kiếm thông minh:**

  - Tìm kiếm khóa học theo tên, từ khóa, hiển thị gợi ý nhanh.

- **Giỏ hàng:**

  - Thêm/xóa/sửa số lượng khóa học trong giỏ hàng.
  - Xóa từng khóa học hoặc toàn bộ giỏ hàng.
  - Tính tổng tiền tự động.
  - Gợi ý khóa học liên quan dựa trên các tag của sản phẩm trong giỏ.
  - Responsive đẹp trên mobile (table chuyển thành card dọc).

- **Trang cá nhân:**

  - Xem danh sách các khóa học đã yêu thích, có thể bỏ yêu thích.
  - Xem lịch sử các khóa học đã xem, có thể xóa lịch sử.
  - Gợi ý khóa học thông minh dựa trên sở thích/lịch sử.

- **Chatbot AI:**

  - Trợ lý AI giúp gợi ý khóa học phù hợp theo từ khóa hoặc mô tả nhu cầu người dùng.

- **Giao diện hiện đại:**

  - Responsive, tối ưu cho cả desktop và mobile.
  - Sử dụng các component UI hiện đại (Ant Design, Tailwind, custom SCSS).

- **Các tính năng khác:**
  - Sidebar menu điều hướng nhanh.
  - Footer với thông tin liên hệ, sản phẩm, điều khoản.
  - Toast thông báo thao tác thành công/thất bại.
