'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { User } from '@/types';

// Backend User interface
interface BackendUser {
  id: string;
  name: string;
  email: string;
  title?: string;
  location?: string;
  avatar?: string;
  connections?: number;
}

// Transform backend user to our User type
function transformUser(backendUser: BackendUser): User {
  return {
    id: backendUser.id,
    name: backendUser.name,
    title: backendUser.title || 'No title',
    location: backendUser.location || 'No location',
    avatar: backendUser.avatar || '👤',
    connections: backendUser.connections || 0,
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for authentication
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('linkedin_user');
      console.log("storedUser...", storedUser);
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing stored user:', error);
          // Clear invalid data
          localStorage.removeItem('linkedin_user');
          localStorage.removeItem('linkedin_token');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const backendUser = response.data.user;
        const token = response.data.token;
        const transformedUser = transformUser(backendUser);

        setUser(transformedUser);

        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('linkedin_user', JSON.stringify(transformedUser));
          localStorage.setItem('linkedin_token', token);
        }

        return transformedUser;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      throw new Error(errorMessage);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<User> => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const backendUser = response.data.user;
        const token = response.data.token;
        const transformedUser = transformUser(backendUser);

        setUser(transformedUser);

        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('linkedin_user', JSON.stringify(transformedUser));
          localStorage.setItem('linkedin_token', token);
        }

        return transformedUser;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('linkedin_user');
      localStorage.removeItem('linkedin_token');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}

