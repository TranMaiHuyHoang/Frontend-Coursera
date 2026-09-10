# Giải thích cấu trúc & cách hoạt động của project

> Tài liệu này mô tả project **Frontend-Coursera** (`react-work`) — một ứng dụng web
> quản trị (admin dashboard) mô phỏng nền tảng học trực tuyến Coursera, được xây dựng
> bằng **React + TypeScript + Vite**. Ứng dụng giao tiếp với một backend **NestJS**
> qua REST API.

---

## 1. Tổng quan công nghệ (Tech Stack)

Dựa trên `package.json`:

| Nhóm | Công nghệ | Vai trò |
|------|-----------|---------|
| UI | React 19 + React DOM 19 | Xây dựng giao diện |
| Ngôn ngữ | TypeScript ~6.0 | Kiểu dữ liệu tĩnh |
| Build | Vite 8 | Dev server, bundle, HMR |
| Routing | react-router-dom 7 | Điều hướng giữa các trang |
| HTTP | axios 1.19 | Gọi API |
| Styling | Tailwind CSS 4 (+ `@tailwindcss/vite`) | Utility CSS |
| Hỗ trợ class | clsx + tailwind-merge (`src/lib/utils.ts`) | Gộp/xử lý class |
| Icon | lucide-react, @thesvg/react | Bộ icon |
| Thời gian | moment | Format ngày tháng |
| Thông báo | react-toastify | Toast notification |
| Lint/Format | oxlint, prettier | Kiểm tra & format code |

Các lệnh chính (`npm run ...`):
- `dev` — chạy dev server (`vite`)
- `build` — build production (`tsc -b && vite build`)
- `lint` — chạy oxlint
- `preview` — xem bản build

---

## 2. Cấu trúc thư mục

```
react-work/
├── index.html                 # Điểm vào HTML, chứa <div id="root">
├── vite.config.ts             # Cấu hình Vite, alias "@" -> src, plugin React + Tailwind
├── package.json               # Khai báo script & dependency
├── tsconfig*.json             # Cấu hình TypeScript (app/node, references)
├── public/                    # Tài nguyên tĩnh (favicon.svg, icons.svg)
├── src/
│   ├── main.tsx               # Điểm vào JS: render <App/> vào #root, bọc AuthProvider
│   ├── App.tsx                # Khai báo toàn bộ Routes
│   ├── index.css              # Chỉ import tailwindcss
│   ├── assets/                # Ảnh tĩnh (hero.png, react.svg, vite.svg)
│   ├── constants/             # Hằng số (sort.ts: FILTER_OPTIONS)
│   ├── models/                # Interface TS cho các đối tượng dữ liệu
│   ├── services/              # Lớp gọi API + cấu hình axios
│   ├── hooks/                 # Custom hooks tái sử dụng
│   ├── contexts/              # Context API (authContext)
│   ├── lib/                   # Hàm tiện ích (utils.ts: cn)
│   ├── components/
│   │   ├── common/            # Các component UI dùng chung
│   │   ├── layouts/           # Bố cục (Navbar, DashboardLayout, ProtectRoute)
│   │   ├── FieldCard/         # Thẻ "Lĩnh vực"
│   │   ├── LanguageCard/      # Thẻ "Ngôn ngữ"
│   │   ├── Skill/             # Thẻ "Kỹ năng"
│   │   ├── FieldStudy/        # Header danh sách Lĩnh vực
│   │   ├── LanguageHeader/    # Header danh sách Ngôn ngữ
│   │   ├── SkillHeader/       # Header danh sách Kỹ năng
│   │   └── CreateLanguageModal/  # Modal tạo Ngôn ngữ nhanh
│   └── pages/                 # Các trang (Login, Register, Dashboard, CRUD...)
```

---

## 3. Luồng khởi động (Entry point)

1. `index.html` tải script `/src/main.tsx` và có thẻ `<div id="root"></div>`.
2. `src/main.tsx`:
   - `createRoot(document.getElementById('root')!)` gắn React vào DOM.
   - Bọc ứng dụng trong `<StrictMode>` và `<AuthProvider>` rồi render `<App />`.
3. `src/App.tsx`:
   - Dùng `BrowserRouter` để quản lý routing.
   - Khai báo toàn bộ `<Routes>`.
   - Render `<ToastContainer>` cho thông báo (góc phải dưới).

---

## 4. Routing (điều hướng)

Tất cả route được khai báo trong `src/App.tsx`:

**Route công khai (không cần đăng nhập):**
- `/login` → trang `Login`
- `/register` → trang `Register`

**Route bảo vệ (bọc trong `ProtectRoute` + `DashboardLayout`):**
- `/` → `Dashboard` (trang chủ)
- `/field-study` → danh sách Lĩnh vực
- `/field-study/:fieldId` → chi tiết Lĩnh vực
- `/created-fieldStudy` → tạo Lĩnh vực
- `/update-fieldStudy/:fieldId` → cập nhật Lĩnh vực
- `/skill` → danh sách Kỹ năng
- `/skill/:skillId` → chi tiết Kỹ năng
- `/create-skill` → tạo Kỹ năng
- `/update-skill/:skillId` → cập nhật Kỹ năng
- `/language` → danh sách Ngôn ngữ
- `/language/:languageId` → chi tiết Ngôn ngữ
- `/create-language` → tạo Ngôn ngữ
- `/update-language/:languageId` → cập nhật Ngôn ngữ

> `ProtectRoute` (nested route cha) đảm bảo người dùng đã đăng nhập mới vào được.
> `DashboardLayout` (nested route con) cung cấp khung giao diện chung (navbar + sidebar).

---

## 5. Xác thực (Authentication)

Tập tin: `src/contexts/authContext/index.tsx`

- Tạo `AuthContext` và hook `useAuth()`.
- `AuthProvider` quản lý 2 state chính: `user` và `token`.
- **Lưu trữ:** thông tin auth được lưu vào `localStorage` với key `auth-storage`
  dưới dạng JSON `{ user, token }`.
- **Khôi phục:** khi app khởi động (`useEffect`), đọc `localStorage` để khôi phục
  phiên đăng nhập; nếu lỗi thì xoá dữ liệu.
- **Các hàm:**
  - `setAuth({ user, token })` — lưu sau khi đăng nhập.
  - `setUser(user)` — cập nhật thông tin user.
  - `logout()` — xoá auth khỏi state và `localStorage`.
- `isAuthenticated` = có cả `user` và `token`.
- `ProtectRoute` dùng `isAuthenticated` để quyết định: nếu đang `isLoading` thì hiển
  thị "Loading...", nếu chưa đăng nhập thì `<Navigate to="/login" replace />`,
  ngược lại render `<Outlet />`.

**Luồng đăng nhập (`pages/Login`):**
1. Validate email/password phía client.
2. Gọi `axios.post('https://nestjs-api-coursera.onrender.com/auth/login', formData)`.
3. Nhận `{ user, token }` từ `response.data.data`.
4. Gọi `setAuth(...)`, toast thành công, `navigate('/')`.

**Luồng đăng ký (`pages/Register`):** tương tự, gọi `.../auth/register`.

---

## 6. Gọi API (Services)

### 6.1. `src/services/axiosInstance.ts`

Cấu hình một instance axios dùng chung:

- `baseURL`: `https://nestjs-api-coursera.onrender.com`
- `headers.Content-Type`: `application/json`
- `withCredentials: true`
- `timeout`: 30000ms

**Request interceptor:** đọc `auth-storage` từ `localStorage`, nếu có `token` thì gắn
header `Authorization: Bearer <token>`.

**Response interceptor:** nếu nhận lỗi `401` thì xoá `auth-storage` và chuyển hướng
về `/login`.

### 6.2. Các Service (mỗi entity một class)

- `src/services/FieldStudyService/index.ts` → `fieldStudyService`
- `src/services/LanguageService/index.ts` → `languageService`
- `src/services/SkillService/index.ts` → `skillService`

Mỗi service là một class có 5 phương thức CRUD, đều dùng **POST** (backend thiết kế
kiểu RPC, không dùng REST thuần GET/PUT/DELETE):

| Phương thức | Endpoint | Mục đích |
|-------------|----------|----------|
| `getList...` | `/field-studies/list`, `/languages/list`, `/skills/list` | Lấy danh sách (nhận `body`: `keyword`, `filter`, `page`, `limit`) |
| `getDetail...` | `.../detail` | Lấy chi tiết (nhận `body`: id tương ứng) |
| `create...` | `.../create` | Tạo mới |
| `update...` | `.../update` | Cập nhật |
| `delete...` | `.../delete` | Xoá |

### 6.3. Kiểu phản hồi chuẩn (`src/services/type.ts`)

```ts
interface ApiResponse<DataType = any> {
    statusCode: number;
    message: string;
    data: DataType;
    option_data?: { pagination?: PaginationMeta; [key: string]: unknown };
}
```
- `data`: dữ liệu trả về (danh sách hoặc object).
- `option_data.pagination`: thông tin phân trang (`page`, `limit`, `total`, `totalPages`).

---

## 7. Models (kiểu dữ liệu)

Tập tin trong `src/models/`:

- `IUser`: `_id`, `fullName`, `email`, `role`, `avatar`, `phone`, `isActive`.
- `IFieldStudy`: `_id`, `name`, `description`, `isActive`, `createdAt`.
- `ILanguage`: `_id`, `name`, `description`, `isActive`, `createdAt`.
- `ISkill`: `_id`, `name`, `description`, `isActive`, `createdAt`, `updatedAt`.

> Ba entity "Lĩnh vực / Kỹ năng / Ngôn ngữ" có cấu trúc gần như giống nhau,
> đều là các danh mục (category) có `name`, `description`, `isActive`, `createdAt`.

---

## 8. Custom Hooks (`src/hooks/`)

| Hook | Chức năng |
|------|-----------|
| `useFetch` | Gọi API một lần, quản lý `data`, `isLoading`, `error`, cung cấp `loadFetchFn` và `reset`. |
| `useDebounce` | Trì hoãn giá trị (mặc định 500ms) — dùng cho ô tìm kiếm để không gọi API mỗi lần gõ phím. |
| `useScrollToEnd` | Phát hiện cuộn đến cuối danh sách để tải thêm (infinite scroll). Trả về `ref` gắn vào vùng cuộn. |
| `usePaginationList` | Quản lý phân trang + tải thêm: `list`, `loadFirstPage`, `loadMore`, `isLastPage`, `isLoadingMore`. |

---

## 9. Components

### 9.1. Components dùng chung (`components/common/`)

- `Button` — nút bấm với `variant` (outline/bold), `type` (primary/secondary/danger).
- `InputText` — input text, `onChange` trả về `value` (string) thay vì event.
- `TextArea` — textarea tương tự.
- `SearchInput` — ô tìm kiếm có debounce, gọi `onSearch` sau khi hết delay.
- `RadioButton` — radio button tuỳ biến.
- `Switch` — công tắc bật/tắt (checkbox tuỳ biến).
- `ConfirmDeleteModal` — modal xác nhận xoá (Huỷ / Xoá).

### 9.2. Card & Header cho từng entity

- `FieldCard`, `LanguageCard`, `SkillCard`: hiển thị 1 phần tử trong lưới, có nút
  **Chỉnh sửa** (navigate tới trang update) và **Xoá** (mở `ConfirmDeleteModal`).
  Nội dung card là `Link` tới trang chi tiết.
- `LanguageCard` có thêm nút **+** mở `CreateLanguageModal` để thêm Ngôn ngữ nhanh.
- `SkillCard` có thêm nút **+** mở `CreateSkillModal` để thêm Kỹ năng nhanh (tương tự Ngôn ngữ).
- `FieldStudy/Header`, `LanguageHeader`, `SkillHeader`: tiêu đề danh sách, nút "Thêm",
  ô tìm kiếm (`SearchInput`), và (đối với Skill/Language) dropdown lọc `FILTER_OPTIONS`
  (mới nhất/cũ nhất).
- `CreateLanguageModal`, `CreateSkillModal`: modal tạo nhanh Language/Skill, gọi
  service tương ứng rồi trả kết quả qua callback `onCreated`.

### 9.3. Layouts

- `Navbar`: thanh trên cùng (logo "Coursera", ô search, chuông, avatar user tĩnh).
- `DashboardLayout`: bố cục chính = Navbar + Sidebar trái + `<Outlet/>` cho nội dung.
  Sidebar có menu: Dashboard, Lĩnh vực, Kỹ năng, Ngôn ngữ, Settings.
- `ProtectRoute`: bảo vệ route cần đăng nhập (mô tả ở mục 5).

---

## 10. Pages (luồng chức năng chính)

### 10.1. Dashboard (`pages/Dashboard`)
Trang tĩnh (mock data) hiển thị thống kê khoá học, tiến độ học, mục tiêu tuần.
Chưa gọi API, dữ liệu được hardcode.

### 10.2. Danh sách Lĩnh vực (`pages/FieldStudy`)
- Dùng `useFetch<IFieldStudy[]>` gọi `getListFieldStudies({ keyword: search })`.
- `useEffect` gọi lại khi `search` thay đổi (đã qua debounce ở `SearchInput`).
- Xoá: gọi `deleteFieldStudy`, nếu thành công thì `setFieldStudies` lọc bỏ phần tử.

### 10.3. Danh sách Kỹ năng (`pages/Skill`)
- Giống Lĩnh vực nhưng có thêm `filter` (mới nhất/cũ nhất).
- Gọi lại khi `search` hoặc `filter` thay đổi.
- Thêm nhanh: `SkillCard` mở `CreateSkillModal`, sau khi tạo thì chèn phần tử mới
  lên đầu danh sách (`handleCreateSkill`).

### 10.4. Danh sách Ngôn ngữ (`pages/Language`)
- Dùng `usePaginationList` (thay vì `useFetch`) để hỗ trợ **phân trang + cuộn tải thêm**.
- `useScrollToEnd(loadMore, { threshold: 0.95 })` gắn vào vùng cuộn → khi gần cuối sẽ
  gọi `loadMore` để tải trang tiếp theo.
- Thêm nhanh: `LanguageCard` mở `CreateLanguageModal`, sau khi tạo thì chèn phần tử mới
  lên đầu danh sách (`handleCreate`).

### 10.5. Trang chi tiết (FieldStudyDetail / SkillDetail / LanguageDetail)
- Lấy id từ URL bằng `useParams` (ví dụ `fieldId`).
- Gọi `useFetch` để lấy chi tiết qua `getDetail...`.
- Hiển thị breadcrumb, trạng thái (Đang hoạt động / Không hoạt động), mô tả, sidebar
  thông tin (trạng thái, ngày tạo, ID).

### 10.6. Tạo mới (CreateFieldStudy / CreateSkill / CreateLanguage)
- Form nhập `name`, `description` (và `isActive` đối với Skill/Language).
- Gọi `create...`, toast thành công, điều hướng về danh sách (`navigate(-1)` hoặc
  `navigate('/...')`).

### 10.7. Cập nhật (UpdateFieldStudy / UpdateSkill / UpdateLanguage)
- Lấy id từ `useParams`, gọi `useFetch` để lấy dữ liệu hiện tại.
- Đổ dữ liệu vào form qua `useEffect`, người dùng sửa rồi gọi `update...`.
- Thành công thì `navigate(-1)` và toast.

---

## 11. Các pattern / quy ước quan trọng

1. **Alias `@`** trỏ tới `src/` (khai báo ở `vite.config.ts` và `tsconfig.app.json`).
   Ví dụ import: `import { useAuth } from '@/contexts/authContext'`.
2. **Kiến trúc phân lớp:** `pages` (giao diện + logic gọi API qua hook) → `components`
   (UI) → `services` (gọi HTTP) → `models` (kiểu dữ liệu). `hooks` và `contexts` là
   tầng logic tái sử dụng.
3. **Mọi endpoint đều dùng POST** (kể cả đọc/xoá), tham số gửi trong body.
4. **Xử lý auth tập trung** ở axios interceptor, không phải lặp lại ở từng service.
5. **Debounce tìm kiếm** để tránh gọi API liên tục khi gõ.
6. **Thông báo lỗi/thành công** thống nhất qua `react-toastify`.
7. **Xoá an toàn:** luôn có `ConfirmDeleteModal` xác nhận trước khi xoá.

---

## 12. Một số điểm cần lưu ý (hạn chế hiện tại)

- Trang `Dashboard` và `Navbar` đang dùng **dữ liệu tĩnh** (John Doe, các khoá học
  hardcode), chưa lấy từ API/user thực.
- `pages/Login` và `pages/Register` gọi `axios` trực tiếp (không dùng `axiosInstance`),
  trong khi các trang khác dùng service → thiếu nhất quán.
- Route `Settings` trong sidebar chưa có trang tương ứng trong `App.tsx`.
- Một số chuỗi hiển thị có lỗi chính tả ("Enail", "Mặt khẩu", "ngay tạo cũ nhất").
- `FILTER_OPTIONS` có giá trị `newest`/`oldest` nhưng một số chỗ (FieldStudy) dùng
  chuỗi khác ("Ngày tạo mới nhất") chưa đồng bộ.
- `Language` dùng `usePaginationList`, còn `FieldStudy`/`Skill` dùng `useFetch` đơn giản
  → cách tải danh sách chưa thống nhất giữa các module.

---

## 13. Tóm tắt nhanh

Đây là một **admin dashboard** gồm 3 module quản lý danh mục (Lĩnh vực, Kỹ năng,
Ngôn ngữ) với đầy đủ **Create – Read – Update – Delete**, có **đăng nhập/đăng ký**,
**phân quyền route**, **tìm kiếm có debounce**, **lọc/sắp xếp**, **phân trang +
infinite scroll** (module Ngôn ngữ) và **thông báo toast**. Frontend giao tiếp với
backend NestJS qua axios (base URL: `https://nestjs-api-coursera.onrender.com`), xác
thực bằng Bearer token lưu trong `localStorage`.
