import { apiClient } from './client'
import type { AuthToken, Customer, LoginPayload, MyContactSubmission, RegisterPayload } from '@/types'

export interface UpdateProfilePayload {
  fullName?: string
  phone?: string
}

export function customerRegister(payload: RegisterPayload): Promise<{ data: AuthToken }> {
  return apiClient.post('/api/auth/register', payload, false, 'customer')
}

export function customerLogin(payload: LoginPayload): Promise<{ data: AuthToken }> {
  return apiClient.post('/api/auth/login', payload, false, 'customer')
}

export function customerLogout(): Promise<void> {
  return apiClient.post('/api/auth/logout', {}, true, 'customer')
}

export function customerGetMe(): Promise<{ data: Customer }> {
  return apiClient.get('/api/auth/me', true, undefined, 'customer')
}

export function customerUpdateProfile(payload: UpdateProfilePayload): Promise<{ data: Customer }> {
  return apiClient.patch('/api/auth/me', payload, true, 'customer')
}

export function getMyRegistrations(): Promise<{ data: MyContactSubmission[] }> {
  return apiClient.get('/api/contact/me', true, undefined, 'customer')
}
