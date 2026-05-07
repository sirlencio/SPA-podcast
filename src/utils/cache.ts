const EXPIRATION = 24 * 60 * 60 * 1000;

export function isExpired(timestamp: number): boolean {
  return Date.now() - timestamp > EXPIRATION;
}

export function shouldFetch(timestamp?: number, hasData?: boolean): boolean {
  if (!timestamp || !hasData) return true;
  return isExpired(timestamp);
}