import { useEffect, useState } from 'react';
import { parseExpiry } from './duration';

/** Recompute from the absolute deadline so background-tab throttling cannot accumulate drift. */
export default function useRemainingSeconds(expiresAt: string | null | undefined) {
  const deadline = parseExpiry(expiresAt);
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    if (deadline === null) return;
    const update = () => setNow(Date.now());
    update();
    const timer = window.setInterval(update, 1000);
    window.addEventListener('focus', update);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', update);
    };
  }, [deadline]);
  return deadline === null ? null : Math.max(0, Math.ceil((deadline - now) / 1000));
}
