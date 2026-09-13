## 1. Tạo VideoGroup

### Mục tiêu

Thêm chức năng tạo mới **Nhóm Video (VideoGroup)** tại trang Video.

### File liên quan

* `/Users/admin/Documents/React-work/src/services`
* `/Users/admin/Documents/React-work/src/pages/Video`

> Ưu tiên đọc và tái sử dụng cấu trúc code, component, service, modal và convention hiện có trong project. Không tự ý thay đổi cấu trúc project nếu không cần thiết.

### UI

Thiết kế chức năng tạo VideoGroup bằng **Modal**.

Tại Header của trang Video, thêm button:

`Thêm Nhóm Video`

Khi click button:

* Mở modal **Thêm Nhóm Video**.
* Modal gồm các field:

  * `video_group_name`: Tên nhóm video — bắt buộc.
  * `description`: Mô tả — không bắt buộc.
  * `is_active`: Trạng thái hoạt động — mặc định `true`.
* Có button `Hủy` và `Tạo nhóm`.

### API

**Endpoint**

`POST /video-groups/create`

**Request body**

```json
{
  "video_group_name": "Intro bundle",
  "description": "Optional",
  "is_active": true
}
```

### Workflow

1. Người dùng vào trang Video.
2. Click button `Thêm Nhóm Video`.
3. Hiển thị modal tạo VideoGroup.
4. Người dùng nhập thông tin.
5. Click `Tạo nhóm`.
6. Validate `video_group_name` không được để trống.
7. Gọi API `POST /video-groups/create`.
8. Trong lúc gọi API:

   * Disable button submit hoặc hiển thị loading để tránh submit nhiều lần.
9. Nếu tạo thành công:

   * Hiển thị thông báo thành công.
   * Đóng modal.
   * Reset dữ liệu form.
   * Gọi lại API lấy danh sách VideoGroup để cập nhật UI mới nhất.
10. Nếu API thất bại:

* Giữ modal đang mở.
* Hiển thị thông báo lỗi.
* Không reset dữ liệu người dùng đã nhập.

### Yêu cầu code

* Tạo method API trong service phù hợp với cấu trúc hiện tại của project.
* Tái sử dụng Modal/component/UI hiện có nếu project đã có.
* Không thay đổi logic không liên quan.
* Không hardcode API trực tiếp trong component nếu project đang sử dụng service layer.
* Code cần tuân theo convention và coding style hiện tại của project.
