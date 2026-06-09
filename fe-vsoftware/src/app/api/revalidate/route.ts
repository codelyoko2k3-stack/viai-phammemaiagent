import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Route nội bộ: trang admin gọi route này ngay sau khi lưu thành công
// để xoá Next.js Data Cache, giúp trang công khai cập nhật ngay lập tức
// thay vì phải chờ hết hạn revalidate (60-300s).
export async function POST() {
  revalidatePath('/', 'layout')
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
