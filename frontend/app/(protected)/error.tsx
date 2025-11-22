'use client';
import React from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProtectedError({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-md border border-dashed border-gray-300 p-6 text-center shadow-sm dark:border-gray-700">
      <div className="text-lg font-semibold text-red-600">Something went wrong</div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => (window.location.href = '/')}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Go home
        </button>
      </div>
      {error.digest && <p className="text-xs text-gray-400">Error ID: {error.digest}</p>}
    </div>
  );
}
