import { NextRequest, NextResponse } from 'next/server'

// Define supported sub-paths and their configurations
const SUB_PATH_CONFIGS = {
    '/game-148-d': { variant: 'desktop', basePath: '/game-148-d' },
    '/game-148-m': { variant: 'mobile', basePath: '/game-148-m' },
    '/game-148-t': { variant: 'tablet', basePath: '/game-148-t' },
    '/game-148': { variant: 'default', basePath: '/game-148' },
} as const

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Find matching sub-path configuration
    const matchedConfig = Object.entries(SUB_PATH_CONFIGS).find(([subPath]) => {
        return pathname.startsWith(subPath) || pathname === subPath + '/' || pathname === subPath
    })

    if (matchedConfig) {
        const [subPath, config] = matchedConfig

        // Create response with headers to pass configuration to the app
        const response = NextResponse.next()

        // Set headers that can be accessed in getServerSideProps, API routes, etc.
        response.headers.set('x-game-variant', config.variant)
        response.headers.set('x-base-path', config.basePath)

        // Handle asset requests (CSS, JS, images, etc.)
        if (pathname.includes('/_next/') ||
            pathname.includes('.css') ||
            pathname.includes('.js') ||
            pathname.includes('.png') ||
            pathname.includes('.jpg') ||
            pathname.includes('.svg') ||
            pathname.includes('.woff') ||
            pathname.includes('.ttf') ||
            pathname.includes('.ico')) {

            // For assets, we need to ensure they use the correct base path
            // This will be handled by the Next.js configuration
            return response
        }

        // For page requests, rewrite to the root path with variant info
        const url = request.nextUrl.clone()

        // Remove the sub-path prefix from the pathname
        url.pathname = pathname.replace(subPath, '') || '/'

        // Add query parameter to pass variant info
        url.searchParams.set('variant', config.variant)
        url.searchParams.set('basePath', config.basePath)

        return NextResponse.rewrite(url, {
            headers: response.headers,
        })
    }

    // If no sub-path matches, redirect to default
    if (pathname === '/' || pathname === '') {
        const url = request.nextUrl.clone()
        url.pathname = '/game-148'
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
