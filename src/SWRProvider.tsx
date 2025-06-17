'use client';

import type { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

/**
 * Global SWR configuration with best practices
 */
export default function SWRProvider({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        // Deduplication interval - prevents duplicate requests within this timeframe
        dedupingInterval: 2000,

        // Revalidation settings
        revalidateOnFocus: false, // Don't refetch when window gains focus (can be distracting)
        revalidateOnReconnect: true, // Refetch when network reconnects (important for data freshness)
        revalidateIfStale: true, // Revalidate if data is stale

        // Error retry configuration
        errorRetryCount: 3, // Maximum number of retries on error
        errorRetryInterval: 1000, // Base retry interval (1 second)

        // Loading delay to prevent flash of loading states
        loadingTimeout: 3000, // Show error after 3 seconds of loading

        // Focus revalidation throttling
        focusThrottleInterval: 5000, // Throttle focus revalidation to once per 5 seconds

        // Cache settings
        refreshInterval: 0, // Disable automatic refresh (we'll handle this manually)

        // Global error handler
        onError: (error, key) => {
          // Log errors for debugging (you might want to send to error tracking service)
          // console.error('SWR Error:', { error, key });

          // You can add global error handling here:
          // - Toast notifications
          // - Error tracking (Sentry, etc.)
          // - Analytics

          // For now, we'll just handle errors silently
          // In production, you'd want to send this to an error tracking service
          void error;
          void key;
        },

        // Global success handler (optional)
        onSuccess: (_data, _key, _config) => {
          // You can add global success handling here:
          // - Analytics tracking
          // - Cache warming
          // - Background sync
        },

        // Optimistic update settings
        compare: (a, b) => {
          // Custom deep comparison for better performance
          // This prevents unnecessary re-renders when data hasn't actually changed
          return JSON.stringify(a) === JSON.stringify(b);
        },

        // Use the browser's built-in fetch with better defaults
        fetcher: undefined, // We'll use our custom fetcher in the hooks

        // SWR will use this to determine if data is "stale"
        refreshWhenHidden: false, // Don't refresh when page is hidden
        refreshWhenOffline: false, // Don't refresh when offline

        // Suspense support (if using React Suspense)
        suspense: false,

        // Keep previous data while fetching new data (better UX)
        keepPreviousData: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
