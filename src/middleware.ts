import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';

const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up']);

export default convexAuthNextjsMiddleware((req, { convexAuth }) => {
  if (!isAuthRoute(req) && !convexAuth.isAuthenticated()) {
  console.log('redirect on auth');
    return nextjsMiddlewareRedirect(req, '/sign-in');
  }

  if (isAuthRoute(req) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(req, '/');
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
