import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PROTECTED = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Strip locale prefix to check if the path is protected
  const pathnameWithoutLocale = pathname.replace(/^\/(es|en|pt)/, "") || "/";

  if (PROTECTED.some((p) => pathnameWithoutLocale.startsWith(p))) {
    const session = request.cookies.get("__session")?.value;
    if (!session || session !== process.env.DASHBOARD_SECRET) {
      const locale = pathname.match(/^\/(es|en|pt)/)?.[1] ?? "es";
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
