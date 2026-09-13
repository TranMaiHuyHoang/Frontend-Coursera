## 2. Cập Nhật VideoGroup

### Mục tiêu

Thêm chức năng **Cập Nhật Nhóm Video (VideoGroup)** tại trang Video.

Chức năng Update cần **tái sử dụng modal/form hiện tại của chức năng Tạo Nhóm Video**, không tạo form mới nếu không cần thiết.

### File liên quan

* `/Users/admin/Documents/React-work/src/services`
* `/Users/admin/Documents/React-work/src/pages/Video`
* `/Users/admin/Documents/React-work/src/components/CreateVideoGroupModal/index.tsx`

### File mẫu cần đọc

Đọc cách project hiện tại xử lý chức năng Update tại:

* `/Users/admin/Documents/React-work/src/services/SkillService`
* `/Users/admin/Documents/React-work/src/pages/UpdateSkill`

Dựa theo pattern hiện có để implement chức năng Update VideoGroup.

> Ưu tiên tái sử dụng structure, service, component, modal và coding convention hiện tại của project. Không tự ý thay đổi architecture hoặc logic không liên quan.

### UI

Tại mỗi **VideoGroup Card**, thêm button/icon:

`Cập Nhật`

Khi click `Cập Nhật`:

* Mở modal.
* Title modal hiển thị: `Cập Nhật Nhóm Video`.
* Sử dụng chung form/component với modal `Tạo Nhóm Video`.
* Form tự động hiển thị dữ liệu hiện tại của VideoGroup được chọn.

Các field:

* `video_group_name`: Tên nhóm video.
* `is_active`: Trạng thái hoạt động.

### API

**Endpoint**

`/video-groups/update`

Sử dụng method HTTP phù hợp theo API/backend hiện tại.

**Request body**

```json
{
  "video_group_id": "6a07e10855a2315bd300344d",
  "video_group_name": "Intro bundle (update)",
  "is_active": false
}
```

Trong đó:

* `video_group_id`: lấy từ VideoGroup đang được chọn.
* `video_group_name`: lấy từ form.
* `is_active`: lấy từ form.

### Workflow

1. Người dùng vào trang Video.
2. Danh sách VideoGroup được hiển thị dưới dạng card.
3. Người dùng click `Cập Nhật` tại một VideoGroup Card.
4. Lưu VideoGroup được chọn.
5. Mở modal với title `Cập Nhật Nhóm Video`.
6. Đổ dữ liệu hiện tại của VideoGroup vào form.
7. Người dùng chỉnh sửa thông tin.
8. Click button `Cập Nhật`.
9. Validate dữ liệu cần thiết trước khi gọi API.
10. Gọi API `/video-groups/update`.
11. Trong lúc gọi API:

* Disable button submit hoặc hiển thị loading.
* Không cho submit nhiều lần.

12. Nếu cập nhật thành công:

* Hiển thị thông báo cập nhật thành công.
* Đóng modal.
* Reset state/form.
* Cập nhật lại danh sách VideoGroup để hiển thị dữ liệu mới nhất.

13. Nếu cập nhật thất bại:

* Hiển thị thông báo lỗi.
* Giữ modal đang mở.
* Giữ nguyên dữ liệu người dùng đang nhập.

### Yêu cầu tái sử dụng Modal

Không tạo riêng `UpdateVideoGroupModal` nếu không cần thiết.

Ưu tiên refactor:

`CreateVideoGroupModal`

để hỗ trợ 2 mode:

* `create`
* `update`

Ví dụ:

```tsx
<CreateVideoGroupModal
    mode="create"
/>
```

và:

```tsx
<CreateVideoGroupModal
    mode="update"
    videoGroup={selectedVideoGroup}
/>
```

Modal cần tự xác định:

* Title.
* Dữ liệu mặc định của form.
* Button submit.
* API create/update tương ứng.

### Yêu cầu code

* Tái sử dụng modal/form của Create VideoGroup.
* Không duplicate form giữa Create và Update.
* API phải đặt trong service, không gọi API trực tiếp trong component nếu project đang dùng service layer.
* Tham khảo cách Update Skill đang được implement trong project.
* Không thay đổi những chức năng không liên quan.
* Giữ coding convention hiện tại của project.
* Sau khi update thành công phải cập nhật lại danh sách VideoGroup.
