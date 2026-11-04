import { useEffect, useState } from 'react';

/** Recompute from the absolute deadline so background-tab throttling cannot accumulate drift. */
export default function useRemainingSeconds(expiresAt: string | null | undefined) {
  const deadline = expiresAt ? Date.parse(expiresAt) : NaN;
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (!Number.isFinite(deadline)) return;
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', update);
    };
  }, [deadline]);
  return Number.isFinite(deadline) ? Math.max(0, Math.ceil((deadline - now) / 1000)) : null;
}
