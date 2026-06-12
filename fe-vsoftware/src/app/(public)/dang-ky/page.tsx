"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PageHero from '@/components/common/PageHero'
import { customerRegister } from '@/lib/api/customer'
import { setCustomerToken, setCustomerRefreshToken } from '@/lib/customer-auth'
import { getErrorMessage } from '@/lib/error'

type FormValues = {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export default function DangKyPage() {
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  async function onSubmit(data: FormValues) {
    setServerError('')
    try {
      const res = await customerRegister({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        password: data.password,
      })
      const { accessToken, refreshToken } = res.data

      setCustomerToken(accessToken)
      if (refreshToken) setCustomerRefreshToken(refreshToken)

      // Full reload để header (UserNavButton) nhận lại trạng thái đăng nhập mới
      window.location.href = '/tai-khoan'
    } catch (err) {
      setServerError(getErrorMessage(err) || 'Đăng ký thất bại, vui lòng thử lại')
    }
  }

  return (
    <>
      <PageHero
        title="Đăng Ký"
        titleEm="Ký"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Đăng ký' }]}
      />

      <section className="py-16 bg-vs-bg">
        <div className="container mx-auto px-6">
          <div className="w-full bg-white rounded-[20px] p-10 shadow-vs-md">
            <div className="max-w-[480px] mx-auto">
              <h1 className="text-[24px] font-extrabold text-vs-dark mb-2">Tạo tài khoản ViAI</h1>
              <p className="text-[14.5px] text-vs-gray-600 mb-8 leading-[1.65]">
                Tạo tài khoản để lưu hồ sơ và theo dõi các yêu cầu tư vấn / đăng ký phần mềm của bạn.
              </p>

              {serverError && (
                <div className="mb-[18px] px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-[13.5px] text-red-600">
                  {serverError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-[18px]">
                  <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                    Họ và tên <span className="text-vs-orange">*</span>
                  </label>
                  <input
                    {...register('fullName', { required: 'Họ và tên là bắt buộc' })}
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                  />
                  {errors.fullName && <div className="text-[13px] text-red-500 mt-1">{errors.fullName.message}</div>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[18px]">
                  <div>
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

                  <div>
                    <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                      Số điện thoại <span className="text-vs-orange">*</span>
                    </label>
                    <input
                      {...register('phone', {
                        required: 'Số điện thoại là bắt buộc',
                        pattern: { value: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' },
                      })}
                      type="tel"
                      placeholder="0912 345 678"
                      className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                    />
                    {errors.phone && <div className="text-[13px] text-red-500 mt-1">{errors.phone.message}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-[18px]">
                  <div>
                    <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                      Mật khẩu <span className="text-vs-orange">*</span>
                    </label>
                    <input
                      {...register('password', {
                        required: 'Mật khẩu là bắt buộc',
                        minLength: { value: 8, message: 'Mật khẩu tối thiểu 8 ký tự' },
                      })}
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                    />
                    {errors.password && <div className="text-[13px] text-red-500 mt-1">{errors.password.message}</div>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">
                      Xác nhận mật khẩu <span className="text-vs-orange">*</span>
                    </label>
                    <input
                      {...register('confirmPassword', {
                        required: 'Vui lòng xác nhận mật khẩu',
                        validate: (value) => value === watch('password') || 'Mật khẩu xác nhận không khớp',
                      })}
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                    />
                    {errors.confirmPassword && <div className="text-[13px] text-red-500 mt-1">{errors.confirmPassword.message}</div>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-vs-blue text-white rounded-lg text-[16px] font-extrabold cursor-pointer border-none hover:bg-vs-blue-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(30,91,198,0.25)] transition-all mt-2 disabled:opacity-60"
                >
                  {isSubmitting ? 'Đang tạo tài khoản...' : 'Đăng ký'}
                </button>
              </form>

              <p className="text-center text-[13.5px] text-vs-gray-600 mt-6">
                Đã có tài khoản?{' '}
                <Link href="/dang-nhap" className="text-vs-blue font-extrabold no-underline hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
