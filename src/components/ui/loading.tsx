import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}

export function LoadingSection() {
  return (
    <div className="flex justify-center items-center h-40">
      <LoadingSpinner />
    </div>
  );
} 