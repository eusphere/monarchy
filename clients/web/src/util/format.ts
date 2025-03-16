export function formatRatingDelta(ratingDelta: number): string {
  if (ratingDelta === 0) return '-';
  if (ratingDelta > 0) return `+${ratingDelta}`;
  return `${ratingDelta}`;
}

/**
 * Formats a date relative to the current time
 * Returns a string in the format:
 * 
 *  • "Xm" for dates less than 1 hour ago (e.g. "5m" for 5 minutes)
 *  • "Xh" for dates less than 24 hours ago (e.g. "3h" for 3 hours) 
 *  • "Xd" for dates less than 7 days ago (e.g. "2d" for 2 days)
 *  • Full date string for dates 7 or more days ago
 */
export function formatDateRelative(date: Date): string {
  const now = new Date();
  const sameYear = date.getFullYear() === now.getFullYear();
  // Compute differences.
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  if (diffMinutes < 60) return `${diffMinutes}m`;
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: sameYear ? undefined : 'numeric'
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' });
}
