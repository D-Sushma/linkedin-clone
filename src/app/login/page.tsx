'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false); // Track if user has attempted to login

  // Redirect to home if already authenticated (only on initial load, not after login attempt)
  useEffect(() => {
    // Only redirect if:
    // 1. Auth check is complete (not loading)
    // 2. Not currently submitting login form
    // 3. User is authenticated
    // 4. No error is being shown
    // 5. User hasn't attempted a login (meaning this is initial load, not after a failed attempt)
    if (!authLoading && !isLoading && isAuthenticated && !error && !hasAttemptedLogin) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, isLoading, error, hasAttemptedLogin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setHasAttemptedLogin(true); // Mark that login attempt has been made

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Only redirect on successful login
      setIsLoading(false);
      router.push('/');
    } catch (err: unknown) {
      // Show error message and prevent redirect
      const errorMessage = (err as { message?: string })?.message || 'Invalid email or password';
      setError(errorMessage);
      setIsLoading(false);
      // Don't redirect - stay on login page to show error
      // Keep hasAttemptedLogin = true to prevent useEffect from redirecting
    }
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if already authenticated and not in the middle of a login attempt (will redirect)
  // But only if no login attempt was made (initial page load)
  if (isAuthenticated && !isLoading && !error && !hasAttemptedLogin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-2xl">
              in
            </div>
            <span className="text-3xl font-semibold text-gray-900">LinkedIn</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
           
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
           
            />
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

