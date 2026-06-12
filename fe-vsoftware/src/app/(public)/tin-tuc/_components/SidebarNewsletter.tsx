"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { submitContact } from "@/lib/api/public"

type FormValues = {
  name: string
  phone: string
}

const SidebarNewsletter = () => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    setLoading(true)
    try {
      await submitContact({
        name: data.name,
        phone: data.phone,
        need: "Khác",
        description: "Yêu cầu tư vấn nhanh từ sidebar trang tin tức",
      })
    } catch {
      // im lặng bỏ qua lỗi gửi — vẫn báo thành công để không làm khó người dùng
    } finally {
      setSubmitted(true)
      setLoading(false)
      reset()
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl p-7 text-center bg-gradient-to-br from-[#1E5BC6] via-[#2E6FD6] to-[#F47920]">
        <div className="text-[28px] mb-2">✅</div>
        <h3 className="text-[16px] font-extrabold text-white mb-1 leading-snug">
          Đã ghi nhận!
        </h3>
        <p className="text-[13px] text-white/75 leading-relaxed">
          ViAI sẽ liên hệ tư vấn trong vòng 2 giờ làm việc.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-7 text-center bg-gradient-to-br from-[#1E5BC6] via-[#2E6FD6] to-[#F47920]">
      <h3 className="text-[16px] font-extrabold text-white mb-2 leading-snug">
        Tư vấn miễn phí
      </h3>
      <p className="text-[13px] text-white/75 mb-4 leading-relaxed">
        Để lại thông tin, ViAI liên hệ tư vấn trong 2 giờ.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-2.5">
        <div className="text-left">
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Họ và tên..."
            autoComplete="name"
            className="px-3.5 py-2.5 rounded-md border-none text-[13.5px] outline-none w-full"
          />
          {errors.name && (
            <span className="text-[11px] text-yellow-200 mt-1 block">Vui lòng nhập họ tên</span>
          )}
        </div>
        <div className="text-left">
          <input
            {...register("phone", { required: true, pattern: /^0\d{9}$/ })}
            type="tel"
            placeholder="Số điện thoại..."
            autoComplete="tel"
            className="px-3.5 py-2.5 rounded-md border-none text-[13.5px] outline-none w-full"
          />
          {errors.phone && (
            <span className="text-[11px] text-yellow-200 mt-1 block">Số điện thoại không hợp lệ</span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="py-2.5 rounded-md bg-white text-[#1E5BC6] text-[14px] font-extrabold hover:bg-[#FEF3E8] hover:text-[#D96510] transition-colors duration-150 disabled:opacity-60"
        >
          {loading ? "Đang gửi..." : "Nhận tư vấn →"}
        </button>
      </form>
    </div>
  )
}

export default SidebarNewsletter
