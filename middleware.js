import createIntlMiddleware from 'next-intl/middleware';
 
export default createIntlMiddleware({
  // A list of all locales that are supported
  locales: ['sr', 'en'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'sr'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};