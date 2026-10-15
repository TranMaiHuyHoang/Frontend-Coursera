## 3. Xoá VideoGroup

### Mục tiêu

Thêm chức năng **Xoá Nhóm Video (VideoGroup)** tại trang Video.

Khi người dùng thực hiện xoá, cần hiển thị modal xác nhận trước khi gọi API.

### File liên quan

* `/Users/admin/Documents/React-work/src/services`
* `/Users/admin/Documents/React-work/src/pages/Video`
* `/Users/admin/Documents/React-work/src/components/common/ConfirmDeleteModal/index.tsx`

### File mẫu cần đọc

Đọc cách project hiện tại xử lý chức năng Delete tại:

* `/Users/admin/Documents/React-work/src/services/SkillService`
* `/Users/admin/Documents/React-work/src/pages/UpdateSkill`

Dựa theo pattern hiện tại của project để implement chức năng Delete VideoGroup.

> Ưu tiên tái sử dụng service, `ConfirmDeleteModal` và coding convention hiện có. Không tạo modal xoá mới nếu component hiện tại đã đáp ứng được yêu cầu.

### UI

Tại mỗi **VideoGroup Card**, thêm button/icon:

`Xoá`

Khi click `Xoá`:

* Lưu VideoGroup đang được chọn.
* Hiển thị `ConfirmDeleteModal`.
* Nội dung modal thông báo cho người dùng xác nhận việc xoá nhóm video.
* Có button `Huỷ` và `Xoá`.

Không sử dụng form của `CreateVideoGroupModal` cho chức năng xoá.

### API

**Endpoint**

`/video-groups/delete`

Sử dụng HTTP method đúng theo API/backend hiện tại.

**Request body**

```json
{
  "video_group_id": "660000000000000000000801"
}
```

Trong đó:

* `video_group_id`: lấy từ VideoGroup Card mà người dùng đang chọn xoá.

### Workflow

1. Người dùng vào trang Video.
2. Danh sách VideoGroup được hiển thị dưới dạng card.
3. Người dùng click button/icon `Xoá` trên một VideoGroup Card.
4. Lưu VideoGroup được chọn vào state.
5. Mở `ConfirmDeleteModal`.
6. Nếu người dùng click `Huỷ`:

   * Đóng modal.
   * Không gọi API.
7. Nếu người dùng click `Xoá`:

   * Lấy `video_group_id` của VideoGroup đang chọn.
   * Gọi API `/video-groups/delete`.
8. Trong lúc gọi API:

   * Hiển thị loading hoặc disable button `Xoá`.
   * Không cho submit nhiều lần.
9. Nếu xoá thành công:

   * Hiển thị thông báo xoá thành công.
   * Đóng modal.
   * Reset VideoGroup đang được chọn.
   * Cập nhật lại danh sách VideoGroup để loại bỏ item vừa xoá khỏi UI.
10. Nếu xoá thất bại:

* Hiển thị thông báo lỗi.
* Giữ modal đang mở nếu phù hợp với pattern hiện tại của project.

### Yêu cầu code

* Tái sử dụng `/components/common/ConfirmDeleteModal/index.tsx`.
* Không tạo thêm Delete Modal mới nếu không cần thiết.
* Không sử dụng `CreateVideoGroupModal` cho chức năng Delete.
* API Delete phải được khai báo trong service phù hợp.
* Không gọi API trực tiếp trong UI component nếu project đang sử dụng service layer.
* Tham khảo pattern Delete Skill hiện tại trước khi implement.
* Không thay đổi logic không liên quan.
* Giữ nguyên coding convention và structure hiện tại của project.
* Sau khi xoá thành công phải cập nhật lại danh sách VideoGroup.
