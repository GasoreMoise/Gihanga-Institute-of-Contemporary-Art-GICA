import { expect, afterEach, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);
afterEach(() => {
  cleanup();
});

// Mock Next.js navigation hooks for component tests
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/en',
}));

// Mock next-intl locale hook used in components
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));
