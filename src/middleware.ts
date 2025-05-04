import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const path = request.nextUrl.pathname;

	if (!sessionCookie) {
		if (path.startsWith('/api/')) {
			return NextResponse.json(
				{ success: false, message: 'Authentication required' },
				{ status: 401 }
			);
		} else {
			return NextResponse.redirect(new URL("/auth/sign-in", request.url));
		}

	}

	return NextResponse.next();
}

export const config = {
	// Update the matcher to include API routes and your private routes
	matcher: [
		// Private pages
		'/dashboard/:path*',
		// Exclude Next.js specific files and API auth routes
		'/((?!api/auth|_next/static|_next/image|favicon.ico|about|auth).*)',
	],
}