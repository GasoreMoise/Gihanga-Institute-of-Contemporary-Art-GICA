// Security utilities and validation

export function validateEnvironment() {
  const required = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .trim();
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function rateLimitCheck(identifier: string, limit: number = 10, windowMs: number = 60000): boolean {
  // Simple in-memory rate limiting (use Redis in production)
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map();
  }
  
  const store = global.rateLimitStore as Map<string, number[]>;
  const requests = store.get(identifier) || [];
  
  // Remove old requests outside the window
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= limit) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  store.set(identifier, recentRequests);
  return true;
}

// Extend global type for rate limiting
declare global {
  var rateLimitStore: Map<string, number[]> | undefined;
}
