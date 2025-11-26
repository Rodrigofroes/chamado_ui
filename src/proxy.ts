import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH, AUTH_REDIRECT, ROUTES_ADMIN, ROUTES_CLIENT } from './lib/constants/urls'
import decodeJWT from './lib/jwt/decodeJWT'
import { TIPO_USUARIO_MIDDLEWARE } from './lib/types/types'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const url = request.nextUrl.clone()

  const matchRoute = (routeBase: string, path: string) => {
    return path === routeBase || path.startsWith(`${routeBase}/`)
  }

  const isProtectedRoute = [...ROUTES_ADMIN, ...ROUTES_CLIENT].some((route) =>
    matchRoute(route.rota, pathname)
  )

  if (!token && isProtectedRoute) {
    url.pathname = AUTH.rota
    return NextResponse.redirect(url)
  }

  let usuario = null
  if (token) {
    try {
      usuario = await decodeJWT(token)
    } catch {
      url.pathname = AUTH.rota
      return NextResponse.redirect(url)
    }
  }

  if(token && pathname.match(AUTH_REDIRECT.rota)){
    if (usuario?.tipo === TIPO_USUARIO_MIDDLEWARE.ADMIN.toString()) {
      url.pathname = ROUTES_ADMIN[0].rota
    } else {
      url.pathname = ROUTES_CLIENT[0].rota
    }
    return NextResponse.redirect(url)
  }

  if(!token && pathname.match(AUTH_REDIRECT.rota)){
    url.pathname = AUTH.rota
    return NextResponse.redirect(url)
  }

  if (token && pathname === AUTH.rota || pathname === '/') {
    if (usuario?.tipo === TIPO_USUARIO_MIDDLEWARE.ADMIN.toString()) {
      url.pathname = ROUTES_ADMIN[0].rota
    } else {
      url.pathname = ROUTES_CLIENT[0].rota
    }
    return NextResponse.redirect(url)
  }

  if (ROUTES_ADMIN.some((route) => matchRoute(route.rota, pathname))) {
    if (usuario?.tipo !== TIPO_USUARIO_MIDDLEWARE.ADMIN.toString()) {
      url.pathname = ROUTES_CLIENT[0].rota
      return NextResponse.redirect(url)
    }
  }

  if (ROUTES_CLIENT.some((route) => matchRoute(route.rota, pathname))) {
    if (usuario?.tipo === TIPO_USUARIO_MIDDLEWARE.CLIENT.toString()) {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
