// Web Vitals tracking
export const trackWebVitals = () => {
  if ('PerformanceObserver' in window) {
    try {
      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log('FID:', entry);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            console.log('CLS:', clsValue);
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('Web Vitals tracking not available');
    }
  }
};

// Cache busting for images
export const getOptimizedImageUrl = (url: string, width?: number): string => {
  // For production, you could use image optimization services
  // like Cloudinary, ImgIX, or AWS CloudFront
  if (!url) return '';
  
  // Add width parameter for responsive images
  if (width) {
    // This is a placeholder - integrate with actual image service
    return url;
  }
  
  return url;
};

// Prefetch critical resources
export const prefetchResources = () => {
  if ('link' in document) {
    const prefetchLinks = [
      { rel: 'prefetch', href: '/api/menu' },
      { rel: 'preconnect', href: 'https://images.unsplash.com' },
    ];

    prefetchLinks.forEach(({ rel, href }) => {
      const link = document.createElement('link');
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });
  }
};

// Service Worker registration for offline support
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app will still work
    });
  }
};

// Debounce function for scroll/resize events
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Intersection Observer for lazy loading
export const createLazyLoadObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px',
      threshold: 0.01,
      ...options,
    });
  }
  return null;
};
