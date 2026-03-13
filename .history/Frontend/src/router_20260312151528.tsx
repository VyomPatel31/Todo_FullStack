import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OtpVerify from './pages/OtpVerify';
import Dashboard from './pages/Dashboard';

// Root route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Home page
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Login page
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

// Signup page
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
});

// OTP verification page
const verifyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/verify',
  component: OtpVerify,
});

// Dashboard page
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
]);

// Create router
export const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
