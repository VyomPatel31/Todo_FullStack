import { Outlet } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';

export default function RootLayout() {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
}
