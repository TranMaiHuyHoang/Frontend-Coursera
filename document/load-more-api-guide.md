# Hướng dẫn sử dụng API Load More Data (Infinite Scroll)

> Tài liệu mô tả cách dùng API để "tải thêm dữ liệu" khi cuộn tới cuối danh sách,
> dựa trên cách triển khai ở trang Ngôn ngữ: `src/pages/Language/index.tsx`.

## 1. Giới thiệu

"Load more data" là kỹ thuật tải dữ liệu theo từng trang (pagination), mỗi lần cuộn
tới cuối danh sách thì gọi thêm trang kế tiếp rồi nối vào danh sách hiện tại, thay vì
tải toàn bộ một lúc. Lợi ích: giảm tải ban đầu, tăng tốc độ hiển thị.

Luồng tóm tắt:
1. Tải trang đầu (`page = 1`) khi vào trang hoặc khi thay đổi tìm kiếm/lọc.
2. Người dùng cuộn tới đáy danh sách.
3. Gọi tiếp `page + 1` và **nối** (append) kết quả vào danh sách.
4. Dừng khi trang trả về ít hơn `limit` phần tử (= hết dữ liệu).

Các thành phần tham gia:

| Thành phần | Vai trò |
|---|---|
| `languageService.getListLanguage` | Gọi API `POST /languages/list` |
| `usePaginationList` | Quản lý state phân trang và hàm tải (`loadFirstPage`, `loadMore`) |
| `useScrollToEnd` | Phát hiện cuộn tới cuối để kích hoạt `loadMore` |
| `useDebounce` | Trì hoãn gọi API khi người dùng gõ tìm kiếm |

## 2. API phía Backend

**Endpoint:** `POST /languages/list`

**Request body (payload):**

```json
{
  "keyword": "react",
  "filter": "newest",
  "page": 2,
  "limit": 15
}
```

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `keyword` | string | Từ khoá tìm kiếm (tuỳ chọn) |
| `filter` | string | `newest` hoặc `oldest` |
| `page` | number | Trang hiện tại, bắt đầu từ 1 |
| `limit` | number | Số phần tử mỗi trang |

**Response:**

```json
{
  "statusCode": 200,
  "message": "success",
  "data": [ "..." ],
  "option_data": {
    "pagination": { "page": 2, "limit": 15, "total": 40, "totalPages": 3 }
  }
}
```

> Frontend chủ yếu dùng `data` (mảng). Việc xác định "đã hết dữ liệu" được xử lý
> bằng cách so sánh `data.length < limit` (giải thích ở mục 4). Trường
> `option_data.pagination` là thông tin bổ trợ từ backend.

## 3. Service gọi API

`src/services/LanguageService/index.ts`:

```ts
getListLanguage = async (body: object): Promise<ApiResponse> => {
    const response = await this.api.post('/languages/list', body);
    return response.data;
};
```

Service chỉ truyền nguyên `body` (gồm `keyword`, `filter`, `page`, `limit`) lên backend.
Kiểu phản hồi chuẩn được định nghĩa ở `src/services/type.ts`:

```ts
interface ApiResponse<DataType = any> {
    statusCode: number;
    message: string;
    data: DataType;
    option_data?: {
        pagination?: PaginationMeta;
        [key: string]: unknown;
    };
}
```

## 4. Hook usePaginationList — trái tim của "load more"

Tập tin: `src/hooks/usePaginationList/index.ts`

### 4.1. Cách khởi tạo

```ts
const {
    list: languages,
    setList: setLanguages,
    loadFirstPage,
    loadMore,
} = usePaginationList<ILanguage>({
    fetchFn: async (payload) => {
        const res = await languageService.getListLanguage(payload);
        return res.data;              // trả về mảng
    },
    limit: 15,
    params: { keyword: search, filter },
});
```

- `fetchFn`: hàm gọi API. Nhận `payload = { ...params, page, limit }` và **phải trả về
  `Promise<T[]>`** (mảng dữ liệu).
- `limit`: số phần tử mỗi trang.
- `params`: các tham số cố định được tự động ghép với `page`/`limit` trong mỗi lần gọi.

### 4.2. Các giá trị trả về

| Giá trị | Ý nghĩa |
|---|---|
| `list` | Danh sách đang hiển thị |
| `setList` | Cập nhật danh sách (dùng khi xoá/thêm phần tử thủ công) |
| `loadFirstPage` | Tải trang đầu (`page = 1`), thay mới toàn bộ list |
| `loadMore` | Tải trang tiếp theo, nối kết quả vào list |
| `isLoadingMore` | `true` khi đang tải thêm |
| `isLastPage` | `true` khi đã hết dữ liệu (trang cuối) |

### 4.3. Logic bên trong hook

**`loadFirstPage()`**
- Đặt `page = 1`.
- Gọi `fetchFn({ ...params, page: 1, limit })`, kết quả thay thế toàn bộ list: `setList(data)`.
- Đánh dấu `isLastPage = data.length < limit`.

**`loadMore()`**
- Nếu đang tải (`isLoadingMore`) hoặc đã là trang cuối (`isLastPage`) → dừng ngay.
- Tính `nextPage = page + 1`, gọi `fetchFn({ ...params, page: nextPage, limit })`.
- Nối kết quả: `setList(prev => [...prev, ...data])`.
- Cập nhật `page = nextPage` và `isLastPage = data.length < limit`.

> Mẹo: `data.length < limit` nghĩa là backend trả về ít hơn số lượng yêu cầu nên
> chắc chắn không còn trang kế tiếp → đặt `isLastPage = true` để dừng.

## 5. Hook useScrollToEnd — kích hoạt loadMore khi cuộn tới cuối

Tập tin: `src/hooks/useScrollToEnd/index.ts`

```ts
const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });
```

- Nhận `callback` (ở đây là `loadMore`) và `options.threshold` (từ 0 đến 1, mặc định 1).
- Trả về một `ref` để gắn vào phần tử chứa danh sách có `overflow-y-auto`.
- Khi cuộn, nó tính `progress = (scrollTop + clientHeight) / scrollHeight`; khi
  `progress >= threshold` thì gọi `callback` một lần (chống gọi lặp bằng cờ `passedRef`).

Gắn `ref` vào thẻ `<main>`:

```tsx
<main className="min-h-0 flex-1 overflow-y-auto p-5" ref={containerRef}>
    ...
</main>
```

## 6. Luồng hoàn chỉnh trong trang Ngôn ngữ

`src/pages/Language/index.tsx`:

```tsx
const [search, setSearch] = useState('');
const [filter, setFilter] = useState(FILTER_OPTIONS[0].value);

const { list: languages, setList: setLanguages, loadFirstPage, loadMore } =
    usePaginationList<ILanguage>({
        fetchFn: async (payload) => {
            const res = await languageService.getListLanguage(payload);
            return res.data;
        },
        limit: 15,
        params: { keyword: search, filter },
    });

// Khi tìm kiếm/lọc thay đổi → tải lại từ trang đầu
useEffect(() => {
    loadFirstPage();
}, [search, filter]);

const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });
```

Trình tự chạy:
1. Lần đầu vào trang → `useEffect` chạy `loadFirstPage()` → `page = 1`.
2. Gõ tìm kiếm (đã qua `useDebounce` trong `SearchInput`) → `search` đổi → `loadFirstPage()` chạy lại.
3. Cuộn tới gần đáy (`progress >= 0.95`) → `useScrollToEnd` gọi `loadMore()` → `page + 1` → append.
4. Khi backend trả về ít hơn `limit` phần tử → `isLastPage = true` → `loadMore` dừng.

> Ghi chú: `search` trong `SearchInput` đã được debounce 1000ms (mặc định), nên
> `useEffect` chỉ chạy sau khi người dùng ngừng gõ ~1 giây.

## 7. Template áp dụng cho module khác

Muốn làm tương tự cho Kỹ năng / Lĩnh vực, chỉ cần thay service và kiểu dữ liệu:

```tsx
import { useEffect, useState } from 'react';
import usePaginationList from '@/hooks/usePaginationList';
import useScrollToEnd from '@/hooks/useScrollToEnd';
import type { ISkill } from '@/models/skill';
import { skillService } from '@/services/SkillService';

export default function Skill() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('newest');

    const { list: skills, loadFirstPage, loadMore } = usePaginationList<ISkill>({
        fetchFn: async (payload) => {
            const res = await skillService.getListSkills(payload);
            return res.data;
        },
        limit: 10,
        params: { keyword: search, filter },
    });

    useEffect(() => {
        loadFirstPage();
    }, [search, filter]);

    const containerRef = useScrollToEnd(loadMore, { threshold: 0.95 });

    return (
        <main ref={containerRef} className="overflow-y-auto">
            {skills.map((skill) => (
                <div key={skill._id}>{skill.name}</div>
            ))}
        </main>
    );
}
```

Chỉ cần đảm bảo:
1. Service tương ứng có phương thức `getList...` nhận `body: object`.
2. `fetchFn` trả về **mảng** (`res.data` là mảng).
3. Vùng cuộn có `overflow-y-auto` và được gắn `ref` từ `useScrollToEnd`.

## 8. Lưu ý & điểm có thể cải thiện

- **Điều kiện dừng hiện tại** dựa trên `data.length < limit`. Nếu backend có trả
  `option_data.pagination.totalPages`, có thể dùng `page >= totalPages` thay thế để
  chính xác hơn.
- `usePaginationList.loadMore` chỉ chống gọi lặp bằng `isLoadingMore` và `isLastPage`,
  không dùng `isFetchingFirstPage` cho `loadMore` — khi cuộn nhanh có thể cần thêm cờ
  chống gọi trùng tiếp theo.
- `useScrollToEnd` chỉ kích hoạt khi phần tử thực sự cuộn được (`scrollHeight > clientHeight`).
- Khi **tìm kiếm/lọc** thay đổi, nhớ gọi `loadFirstPage()` (không phải `loadMore`) để
  thay mới danh sách, tránh nối dữ liệu cũ.
- Thứ tự hiển thị theo `filter` (`newest`/`oldest`) phụ thuộc backend xử lý khi trả về
  từng trang.
