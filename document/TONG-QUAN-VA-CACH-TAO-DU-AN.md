# Tổng quan dự án & Hướng dẫn tạo dự án từ đầu theo thứ tự

> Tài liệu dành cho việc **học & hiểu**: mô tả tổng thể dự án **Frontend-Coursera**
> (`react-work`) — một admin dashboard mô phỏng nền tảng học trực tuyến Coursera, được
> xây bằng **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**, giao tiếp với backend
> **NestJS** qua REST API. Sau phần tổng quan là **lộ trình tạo lại dự án theo đúng thứ
> tự các bước**, kèm giải thích "vì sao" ở từng bước.

---

## MỤC LỤC

1. [Dự án này là gì](#1-dự-án-này-là-gì)
2. [Công nghệ sử dụng (Tech Stack)](#2-công-nghệ-sử-dụng-tech-stack)
3. [Kiến trúc & luồng dữ liệu](#3-kiến-trúc--luồng-dữ-liệu)
4. [Cấu trúc thư mục](#4-cấu-trúc-thư-mục)
5. [Phần A — Tạo dự án theo từng bước](#5-phần-a--tạo-dự-án-theo-từng-bước)
6. [Phần B — Thứ tự học gợi ý](#6-phần-b--thứ-tự-học-gợi-ý)
7. [Các pattern / quy ước quan trọng](#7-các-pattern--quy-ước-quan-trọng)
8. [Lưu ý & điểm cần cải thiện](#8-lưu-ý--điểm-cần-cải-thiện)

---

## 1. Dự án này là gì

Đây là **Frontend** của một hệ thống quản trị nội dung khoá học, gồm 4 module chính:

| Module | Chức năng | Đường dẫn |
|--------|-----------|-----------|
| Đăng nhập / Đăng ký | Xác thực người dùng, lưu token | `/login`, `/register` |
| Lĩnh vực (Field Study) | CRUD + tìm kiếm | `/field-study`, `/field-study/:fieldId`, `/created-fieldStudy`, `/update-fieldStudy/:fieldId` |
| Kỹ năng (Skill) | CRUD + tìm kiếm + lọc/sắp xếp | `/skill`, `/skill/:skillId`, `/create-skill`, `/update-skill/:skillId` |
| Ngôn ngữ (Language) | CRUD + tìm kiếm + lọc + **infinite scroll** | `/language`, `/language/:languageId`, `/create-language`, `/update-language/:languageId` |
| Quản lý video | Danh sách nhóm video | `/video` |

Đặc điểm nổi bật:

- **Xác thực** bằng Bearer token lưu trong `localStorage` (key `auth-storage`).
- **Bảo vệ route**: chưa đăng nhập thì bị đẩy về `/login` (`ProtectRoute`).
- **Mọi API đều gọi qua `POST`**, tham số gửi trong `body`.
- Thống nhất toast thông báo bằng `react-toastify`.

---

## 2. Công nghệ sử dụng (Tech Stack)

| Nhóm | Công nghệ | Vai trò |
|------|-----------|---------|
| UI library | React 19 + React DOM 19 | Xây dựng giao diện |
| Ngôn ngữ | TypeScript ~6.0 | Kiểu dữ liệu tĩnh, bắt lỗi sớm |
| Build tool | Vite 8 (+ `@vitejs/plugin-react`) | Dev server, HMR, bundle |
| Routing | react-router-dom 7 | Điều hướng SPA |
| HTTP client | axios | Gọi API, interceptor |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) | Utility-first CSS |
| Gộp class | clsx + tailwind-merge (`cn`) | `src/lib/utils.ts` |
| Icon | lucide-react, @thesvg/react | Bộ icon SVG |
| Thời gian | moment | Format ngày tháng |
| Thông báo | react-toastify | Toast |
| Lint / Format | oxlint, prettier | Kiểm tra & format code |

Lệnh chạy (`package.json` scripts):

```bash
npm run dev       # chạy dev server (vite)
npm run build     # build production (tsc -b && vite build)
npm run lint      # chạy oxlint
npm run preview   # xem bản build
```

---

## 3. Kiến trúc & luồng dữ liệu

```
Người dùng (Browser)
        │
        ▼
  index.html ───► src/main.tsx (createRoot, bọc AuthProvider)
        │
        ▼
  src/App.tsx (BrowserRouter + Routes + ToastContainer)
        │
        ├── /login, /register ──► pages/Login, pages/Register (gọi axios trực tiếp)
        │
        └── <ProtectRoute> (kiểm tra đăng nhập)
                 │
                 └── <DashboardLayout> (Navbar + Sidebar + <Outlet/>)
                          │
                          ├── pages/* (logic & gọi API qua hooks)
                          │        │
                          │        ▼
                          │   services/* (gọi HTTP qua axiosInstance)
                          │        │
                          │        ▼
                          │   axiosInstance (thêm Bearer token, xử lý 401)
                          │        │
                          │        ▼
                          │   Backend NestJS (https://nestjs-api-coursera.onrender.com)
                          │
                          └── components/* (UI thuần, nhận props)
```

Luồng dữ liệu đi theo **một chiều, phân lớp rõ ràng**:

`pages` (giao diện + logic) → `services` (gọi HTTP) → `axiosInstance` (auth) → `backend`

Trong đó `models` cung cấp kiểu dữ liệu, `hooks`/`contexts` là tầng logic tái sử dụng,
`components` là UI thuần nhận dữ liệu qua `props`.

---

## 4. Cấu trúc thư mục

```
react-work/
├── index.html                    # Điểm vào HTML, chứa <div id="root">
├── vite.config.ts                # Cấu hình Vite: plugin React + Tailwind, alias "@" -> src
├── package.json                  # Script & dependency
├── tsconfig.json                 # Chỉ chứa references tới 2 file tsconfig con
├── tsconfig.app.json             # Cấu hình TS cho code app (paths "@/*")
├── tsconfig.node.json            # Cấu hình TS cho Vite config
├── .oxlintrc.json / .prettierrc  # Cấu hình lint / format
├── public/                       # Tài nguyên tĩnh (favicon.svg, icons.svg)
├── document/                     # Tài liệu (explain.md, load-more-api-guide.md, file này)
└── src/
    ├── main.tsx                  # createRoot + AuthProvider + render <App/>
    ├── App.tsx                   # Khai báo toàn bộ Routes + ToastContainer
    ├── index.css                 # Chỉ có: @import "tailwindcss";
    ├── assets/                   # Ảnh tĩnh
    ├── constants/                # Hằng số (sort.ts: FILTER_OPTIONS)
    ├── models/                   # Interface TS (fieldStudy, language, skill, user, videoGroup)
    ├── services/                 # axiosInstance.ts, type.ts + các Service class
    ├── hooks/                    # useFetch, useDebounce, usePaginationList, useScrollToEnd
    ├── contexts/                 # authContext (quản lý đăng nhập)
    ├── lib/                      # utils.ts (hàm cn)
    ├── components/
    │   ├── common/               # Button, InputText, SearchInput, TextArea, Switch,
    │   │                         # RadioButton, ConfirmDeleteModal
    │   ├── layouts/              # DashboardLayout, Navbar, ProtectRoute
    │   ├── FieldCard/            # Thẻ Lĩnh vực
    │   ├── FieldStudy/Header.tsx # Header danh sách Lĩnh vực
    │   ├── Skill/SkillCard.tsx   # Thẻ Kỹ năng
    │   ├── SkillHeader/          # Header danh sách Kỹ năng
    │   ├── LanguageCard/         # Thẻ Ngôn ngữ
    │   ├── LanguageHeader/       # Header danh sách Ngôn ngữ
    │   ├── CreateLanguageModal/  # Modal tạo Ngôn ngữ nhanh (trong thẻ)
    │   └── CreateSkillModal/     # Modal tạo Kỹ năng nhanh
    └── pages/                    # Login, Register, Dashboard, FieldStudy (list/detail/
                                  # create/update), Skill (...), Language (...), Video
```

<!-- CONTINUE -->

