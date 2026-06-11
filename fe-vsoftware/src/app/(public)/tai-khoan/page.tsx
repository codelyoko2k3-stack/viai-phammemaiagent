"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import PageHero from '@/components/common/PageHero'
import { customerGetMe, customerUpdateProfile, customerLogout, getMyRegistrations } from '@/lib/api/customer'
import { isCustomerAuthenticated, removeCustomerToken } from '@/lib/customer-auth'
import { getErrorMessage } from '@/lib/error'
import type { Customer, MyContactSubmission } from '@/types'

type ProfileForm = {
  fullName: string
  phone: string
}

export default function TaiKhoanPage() {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [submissions, setSubmissions] = useState<MyContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>()

  useEffect(() => {
    if (!isCustomerAuthenticated()) {
      router.replace('/dang-nhap?from=/tai-khoan')
      return
    }

    Promise.all([customerGetMe(), getMyRegistrations()])
      .then(([meRes, subsRes]) => {
        setCustomer(meRes.data)
        reset({ fullName: meRes.data.fullName, phone: meRes.data.phone || '' })
        setSubmissions(subsRes.data)
      })
      .catch(() => {
        removeCustomerToken()
        router.replace('/dang-nhap?from=/tai-khoan')
      })
      .finally(() => setLoading(false))
  }, [router, reset])

  async function onSubmit(data: ProfileForm) {
    setServerError('')
    setSuccessMsg('')
    setSaving(true)
    try {
      const res = await customerUpdateProfile({ fullName: data.fullName, phone: data.phone || undefined })
      setCustomer(res.data)
      setSuccessMsg('Đã cập nhật hồ sơ.')
    } catch (err) {
      setServerError(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    try {
      await customerLogout()
    } catch {
      // bỏ qua lỗi, vẫn xóa token local
    }
    removeCustomerToken()
    // Full reload để header (UserNavButton) nhận lại trạng thái đăng xuất
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-vs-gray-600 text-[14px]">
        Đang tải...
      </div>
    )
  }

  if (!customer) return null

  return (
    <>
      <PageHero
        title="Tài Khoản"
        titleEm="Khoản"
        breadcrumbs={[{ label: 'Trang chủ', href: '/' }, { label: 'Tài khoản' }]}
      />

      <section className="py-16 bg-vs-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">

            {/* Hồ sơ */}
            <div className="bg-white rounded-[20px] p-10 shadow-vs-md">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-[22px] font-extrabold text-vs-dark">Hồ sơ của bạn</h1>
                <button
                  onClick={handleLogout}
                  className="text-[13px] font-bold text-vs-orange hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Đăng xuất
                </button>
              </div>

              <div className="mb-6">
                <div className="text-[12px] font-bold text-vs-gray-400 uppercase tracking-wide mb-1">Email</div>
                <div className="text-[15px] text-vs-dark font-bold">{customer.email}</div>
              </div>

              {serverError && (
                <div className="mb-[18px] px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-[13.5px] text-red-600">
                  {serverError}
                </div>
              )}
              {successMsg && (
                <div className="mb-[18px] px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-[13.5px] text-green-700">
                  {successMsg}
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
                    className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                  />
                  {errors.fullName && <div className="text-[13px] text-red-500 mt-1">{errors.fullName.message}</div>}
                </div>

                <div className="mb-[18px]">
                  <label className="block text-[13px] font-bold text-vs-gray-700 mb-1.5">Số điện thoại</label>
                  <input
                    {...register('phone', { pattern: { value: /^0\d{9}$/, message: 'Số điện thoại không hợp lệ' } })}
                    type="tel"
                    placeholder="0912 345 678"
                    className="w-full px-4 py-3 border-[1.5px] border-vs-gray-200 rounded-lg text-[14px] text-vs-dark bg-white outline-none focus:border-vs-blue transition-colors"
                  />
                  {errors.phone && <div className="text-[13px] text-red-500 mt-1">{errors.phone.message}</div>}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-vs-blue text-white rounded-lg text-[16px] font-extrabold cursor-pointer border-none hover:bg-vs-blue-dark hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(30,91,198,0.25)] transition-all mt-2 disabled:opacity-60"
                >
                  {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </form>
            </div>

            {/* Lịch sử đăng ký */}
            <div className="bg-white rounded-2xl p-7 shadow-vs">
              <h2 className="text-[16px] font-extrabold text-vs-dark mb-5">Lịch sử đăng ký / yêu cầu tư vấn</h2>

              {submissions.length === 0 ? (
                <p className="text-[13.5px] text-vs-gray-600 leading-[1.65]">
                  Bạn chưa gửi yêu cầu tư vấn hoặc đăng ký phần mềm nào. Hãy{' '}
                  <a href="/contact" className="text-vs-blue font-bold no-underline hover:underline">liên hệ tư vấn</a>{' '}
                  ngay để được hỗ trợ.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {submissions.map((s) => (
                    <div key={s.id} className="bg-vs-bg rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div className="text-[14px] font-extrabold text-vs-dark">{s.need}</div>
                        <div className="text-[12px] text-vs-gray-400 whitespace-nowrap">
                          {new Date(s.createdAt).toLocaleDateString('vi-VN')}
                        </div>
                      </div>
                      {s.description && (
                        <p className="text-[13px] text-vs-gray-600 leading-[1.6] whitespace-pre-line">{s.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
