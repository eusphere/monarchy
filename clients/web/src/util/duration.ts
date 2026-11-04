export function parseExpiry(expiresAt: string | null | undefined): number | null {
  if (!expiresAt) return null;
  const deadline = Date.parse(expiresAt);
  return Number.isFinite(deadline) ? deadline : null;
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
}
