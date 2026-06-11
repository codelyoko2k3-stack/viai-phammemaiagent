"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PageHero from '@/components/common/PageHero'
import { customerLogin } from '@/lib/api/customer'
import { setCustomerToken, setCustomerRefreshToken } from '@/lib/customer-auth'
import { getErrorMessage } from '@/lib/error'

type FormValues = {
  email: string
  password: string
}

export default function DangNhapPage() {
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    setServerError('')
    try {
      const res = await customerLogin(data)
      const { accessToken, refreshToken } = res.data

      setCustomerToken(accessToken)
      if (refreshToken) setCustomerRefreshToken(refreshToken)

      // Full reload để header (UserNavButton) nhận lại trạng thái đăng nhập mới
      window.location.href = '/tai-khoan'
    } catch (err) {
      setServerError(getErrorMessage(err) || 'Sai email hoặc mật khẩu')
    }
  }

  return (
    <>
      <PageHero
        title="Đăng Nhập"
        titleEm="Nhập"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đăng nhập' }]}
      />

      <section className="py-16 bg-vs-bg">
        <div className="container mx-auto px-6">
          <div className="w-full bg-white rounded-[20px] p-10 shadow-vs-md">
            <div className="max-w-[440px] mx-auto">
              <h1 className="text-[24px] font-extrabold text-vs-dark mb-2">Đăng nhập tài khoản</h1>
              <p className="text-[14.5px] text-vs-gray-600 mb-8 leading-[1.65]">
                Đăng nhập để theo dõi yêu cầu tư vấn và lịch sử đăng ký phần mềm của bạn.
              </p>

              {serverError && (
                <div className="mb-[18px] px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-[13.5px] text-red-600">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-[18px]">
                  <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                    Email <span className="text-vs-orange">*</span>
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email là bắt buộc',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
                    })}
                    type="email"
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                  />
                  {errors.email && <div className="text-[13px] text-red-500 mt-1">{errors.email.message}</div>}
                </div>

                <div className="mb-[18px]">
                  <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                    Mật khẩu <span className="text-vs-orange">*</span>
                  </label>
                  <input
                    {...register('password', { required: 'Mật khẩu là bắt buộc' })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                  />
                  {errors.password && <div className="text-[13px] text-red-500 mt-1">{errors.password.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-vs-blue text-white rounded-lg text-[16px] font-extrabold cursor-pointer border-none hover:bg-vs-blue-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(30,91,198,0.25)] transition-all mt-2 disabled:opacity-60"
                >
                  {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </form>

              <p className="text-center text-[13.5px] text-vs-gray-600 mt-6">
                Chưa có tài khoản?{' '}
                <Link href="/dang-ky" className="text-vs-blue font-extrabold no-underline hover:underline">
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
