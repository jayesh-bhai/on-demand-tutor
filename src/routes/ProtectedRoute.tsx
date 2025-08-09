import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { JSX } from 'react';
import React from 'react';

interface Props {
  roleRequired: 'student' | 'mentor';
  children: React.ReactElement;
}

export default function ProtectedRoute({ roleRequired, children }: Props) {
  const { currentUser, role } = useAuth();

  // not logged in → redirect to login
  if (!currentUser) return <Navigate to="/login" replace />;

  // If role is not loaded yet, render nothing (or a loader)
  if (role === null) {
    // you can return a spinner here
    return null;
  }

  // wrong role → redirect to home (or unauthorized page)
  if (role !== roleRequired) return <Navigate to="/" replace />;

  return children;
}
