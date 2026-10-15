# Workflow gọi một API chức năng trong dự án

> Tài liệu mô tả **con đường duy nhất** để gọi một API chức năng (list, detail,
> create, update, delete, ...) trong codebase này. Mọi dữ liệu đi qua đúng một
> luồng, không tạo "đường tắt" riêng.

## 0. Luồng tổng quan (sơ đồ)

```
pages / components
        │  (gọi service + hook tuỳ trường hợp)
        ▼
hooks (tuỳ chọn: usePaginationList / useFetch / useDebounce / useScrollToEnd)
        │
        ▼
services/<Domain>Service  ────►  class singleton, mọi method là POST
        │
        ▼
axiosInstance (dùng chung)
   · request  : gắn header  Authorization: Bearer <token>
   · response : nếu 401 → xoá auth-storage + chuyển /login
        │
        ▼
NestJS backend
        │
        ▼
ApiResponse { statusCode, message, data, option_data? }
        │
        ▼
caller kiểm tra `statusCode === 200` → toast + cập nhật state
```

Phía frontend luôn đi qua **3 lớp** theo đúng thứ tự:

`pages/components` → `services` → `axiosInstance`

- `pages/components` chỉ gọi service (không `import axios` trực tiếp).
- `services` chỉ gọi `axiosInstance` (không tự nối base URL).
- `axiosInstance` chỉ lo authentication + chuẩn hoá request, không biết gì về nghiệp vụ.

## 1. Các layer tham gia

| Layer | Vị trí | Vai trò |
|---|---|---|
| `axiosInstance` | `src/services/axiosInstance.ts` | Cấu hình axios chung: `baseURL`, header, interceptors auth/401 |
| `ApiResponse` | `src/services/type.ts` | Kiểu "envelope" phản hồi chuẩn của backend NestJS |
| `<Domain>Service` | `src/services/<Domain>Service/index.ts` | Class gọi HTTP cho từng resource, export singleton |
| hooks | `src/hooks/*` | Logic tái sử dụng: `useFetch`, `usePaginationList`, `useDebounce`, `useScrollToEnd` |
| pages/components | `src/pages/*`, `src/components/*` | UI: lấy state, gọi service, xử lý kết quả, hiển thị toast |

## 2. Cấu hình axiosInstance

Tập tin: `src/services/axiosInstance.ts`

```ts
import axios, { AxiosError } from 'axios';

const API_BASE = 'https://nestjs-api-coursera.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    timeout: 30000,
});
```

- **Request interceptor**: đọc `localStorage['auth-storage']`, nếu có `token`
  thì gắn `config.headers.Authorization = 'Bearer ' + token`. Nhờ vậy service
  **không bao giờ** tự truyền header auth.
- **Response interceptor**: nếu response trả `401` → xoá `auth-storage` và
  redirect về `/login` (trừ khi đang ở `/login`), sau đó reject.

> Hệ quả quan trọng: token/auth được tập trung ở đây. Khi viết service mới,
> bạn không phải — và không nên — tự xử lý token.

## 3. Kiểu phản hồi chuẩn (envelope)

Tập tin: `src/services/type.ts`

```ts
export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export interface ApiResponse<DataType = any> {
    statusCode: number;
    message: string;
    data: DataType;
    option_data?: {
        pagination?: PaginationMeta;
        [key: string]: unknown;
    };
}
```

Mọi method service trả về `Promise<ApiResponse>` (thực chất là `response.data`).
Frontend chủ yếu dùng:

- `statusCode` — kiểm tra thành công (`=== 200`).
- `data` — dữ liệu thật (mảng cho list, object cho detail/created).
- `option_data.pagination` — thông tin bổ trợ (chưa dùng nhiều; list dùng
  `data.length < limit` để nhận biết hết trang).

## 4. Service pattern

Một class cho một backend resource, mọi method là `POST`, nhận `body: object`,
trả `Promise<ApiResponse>`, và export singleton. Mẫu chuẩn từ
`src/services/SkillService/index.ts`:

```ts
import axiosInstance from '../axiosInstance';
import type { ApiResponse } from '../type';

class SkillService {
    readonly api = axiosInstance;

    getListSkills = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/list', body);
        return response.data;
    };

    getDetailSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/detail', body);
        return response.data;
    };

    createSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/create', body);
        return response.data;
    };

    updateSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/update', body);
        return response.data;
    };

    deleteSkill = async (body: object): Promise<ApiResponse> => {
        const response = await this.api.post('/skills/delete', body);
        return response.data;
    };
}

export const skillService = new SkillService();
```

Nguyên tắc:

- Endpoint và tên key trong `body` **phải khớp chính xác** backend/người láng
  giềng (ví dụ `skillId`, `fieldStudyId`, `languageId`, `video_group_id`). Không
  đoán mò.
- Các resource hiện có: `SkillService`, `LanguageService`, `FieldStudyService`,
  `VideoGroupService`, `VideoService`.
- Đặt tên method nhất quán: `getList<X>`, `getDetail<X>`, `create<X>`,
  `update<X>`, `delete<X>`.

## 5. Hai hình mẫu gọi dữ liệu

### 5.1. Danh sách + phân trang/load-more (list)

Dùng hook `usePaginationList<T>` (mẫu: `Skill`, `Language`, `Video`, `VideoGroup`).

```tsx
const { list, setList, loadFirstPage, loadMore } = usePaginationList<ISkill>({
    fetchFn: async (payload) => (await skillService.getListSkills(payload)).data,
    limit: 15,
    params: { keyword: search, filter },
});

useEffect(() => { loadFirstPage(); }, [search, filter]); // load lại trang đầu khi search/filter đổi

const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 }); // cuộn tới gần cuối → load trang kế
```

Trình tự:

1. Vào trang → `useEffect` gọi `loadFirstPage()` → `page = 1`.
2. Thay đổi tìm kiếm/lọc → gọi lại `loadFirstPage()` (thay mới, KHÔNG nối).
3. Cuộn tới gần đáy vùng cuộn → `useScrollToEnd` gọi `loadMore()` → `page + 1`
   → nối (`append`) kết quả.
4. Backend trả ít hơn `limit` phần tử → `isLastPage = true` → dừng gọi.

Chi tiết đầy đủ về load-more/infinite scroll xem thêm
`document/load-more-api-guide.md`.

### 5.2. Chi tiết đơn (detail / prefill update)

Dùng hook `useFetch<T>` (mẫu: `SkillDetail`, `UpdateSkill`).

```tsx
const { data: skill, isLoading, error, loadFetchFn } = useFetch<ISkill>({
    fetchFn: async () => (await skillService.getDetailSkill({ skillId })).data,
});

useEffect(() => { loadFetchFn(); }, [skillId]);

// Với UpdateSkill, prefill form khi data về:
useEffect(() => {
    if (skill) {
        setFormData({
            name: skill.name,
            description: skill.description || '',
            isActive: skill.isActive ?? true,
        });
    }
}, [skill]);
```

`useFetch` trả về `{ data, setData, isLoading, error, loadFetchFn, reset }`.
Trang xử lý UI theo `isLoading` (loading), `error` (error state), `!data`
(not found).

## 6. Gọi create / update / delete (hiệu ứng phụ)

Quy ước chung cho mọi thao tác ghi:

- Bọc trong `try/catch`, giữ state `isLoading` để chống double-submit.
- Thành công: `statusCode === 200` → `toast.success(...)` → cập nhật state
  (prepend item vừa tạo / filter item vừa xoá / `navigate` quay lại).
- Thất bại (`catch`): `toast.error(...)`, **không** mutate state.

Ví dụ **create** (from `CreateVideoModal`):

```tsx
try {
    setIsLoading(true);
    const res = await videoService.createVideo({
        video_group_id: videoGroupId,
        video_name: videoName.trim(),
        description: description.trim(),
        video_url: videoUrl.trim(),
        // ...các key theo hợp đồng backend
    });

    if (res.statusCode === 200) {
        toast.success('Thêm video thành công!');
        resetForm();
        onClose();
        onCreated?.(res.data);   // đẩy kết quả lên page (optimistic prepend)
    }
} catch (error) {
    console.error(error);
    toast.error('Có lỗi xảy ra khi thêm video!');
} finally {
    setIsLoading(false);
}
```

Ví dụ **delete** (optimistic + toast):

```tsx
const res = await languageService.deleteLanguage({ languageId });
if (res.statusCode === 200) {
    setLanguages((prev) => prev.filter((l) => l._id !== languageId));
    toast.success('Xoá Ngôn Ngữ thành công');
}
```

Ví dụ **update**:

```tsx
const res = await skillService.updateSkill({ skillId, ...formData });
if (res.statusCode === 200 || res.data) {
    navigate(-1);
    toast.success(res.message || 'Cập nhật kỹ năng thành công!');
}
```

## 7. Toast & thông báo người dùng

- Thư viện: `react-toastify`, container mount trong `src/App.tsx`
  (`bottom-right`, `autoClose 3000`).
- Dùng: `toast.success` / `toast.error` / `toast.warning` inside `try/catch`.
- `toast.warning` dùng cho validation phía client (chặn submit khi thiếu field bắt buộc).

<!-- SNIP:PART4 -->

