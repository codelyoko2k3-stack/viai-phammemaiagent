import { NextRequest, NextResponse } from 'next/server'

const ADMIN_LOGIN = '/admin/login'
const ADMIN_PROTECTED_PREFIX = '/admin'
const ADMIN_TOKEN_KEY = 'admin_token'

const CUSTOMER_LOGIN = '/dang-nhap'
const CUSTOMER_PROTECTED_PREFIX = '/tai-khoan'
const CUSTOMER_TOKEN_KEY = 'customer_token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith(CUSTOMER_PROTECTED_PREFIX)) {
    const token = request.cookies.get(CUSTOMER_TOKEN_KEY)?.value
    if (!token) {
      const loginUrl = new URL(CUSTOMER_LOGIN, request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  const token = request.cookies.get(ADMIN_TOKEN_KEY)?.value

  const isAdminLogin = pathname === ADMIN_LOGIN
  const isProtected = pathname.startsWith(ADMIN_PROTECTED_PREFIX) && !isAdminLogin

  if (isProtected && !token) {
    const loginUrl = new URL(ADMIN_LOGIN, request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminLogin && token) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/tai-khoan/:path*'],
}
