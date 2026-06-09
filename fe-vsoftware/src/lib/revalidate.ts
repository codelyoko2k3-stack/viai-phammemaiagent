/**
 * Báo cho Next.js xoá Data Cache ngay sau khi admin lưu thành công,
 * để trang công khai cập nhật tức thì thay vì chờ hết hạn cache (60-300s).
 * Fire-and-forget — không chặn UX của thao tác lưu, lỗi thì bỏ qua.
 */
export function notifyPublicRevalidate(): void {
  if (typeof window === 'undefined') return
  fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
}

/** Bọc một promise gọi API admin: chờ kết quả rồi kích hoạt revalidate trang công khai. */
export async function withRevalidate<T>(promise: Promise<T>): Promise<T> {
  const result = await promise
  notifyPublicRevalidate()
  return result
}
