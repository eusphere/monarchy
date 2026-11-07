import * as React from 'react';

type HoverStore<T> = {
  set: (value: T | null, key?: string | null) => void;
  clear: () => void;
  useValue: () => T | null;
  useRetention: () => Pick<React.HTMLAttributes<HTMLDivElement>, 'onPointerEnter' | 'onPointerLeave'>;
};

/** Keeps hover enters responsive while allowing pointer transitions between child meshes. */
export const createHoverStore = <T,>(leaveDelay = 40): HoverStore<T> => {
  let value: T | null = null;
  let key: string | null = null;
  let pendingFrame: number | null = null;
  let clearTimer: ReturnType<typeof setTimeout> | null = null;
  let retained = 0;
  const listeners = new Set<() => void>();

  const notify = (): void => listeners.forEach((listener) => listener());
  const set = (next: T | null, nextKey: string | null = null): void => {
    if (retained > 0) return;
    if (clearTimer) clearTimeout(clearTimer);
    if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
    pendingFrame = null;
    if (key === nextKey) return;
    pendingFrame = requestAnimationFrame(() => {
      pendingFrame = null;
      value = next;
      key = nextKey;
      notify();
    });
  };
  const clear = (): void => {
    if (retained > 0) return;
    if (pendingFrame !== null) {
      cancelAnimationFrame(pendingFrame);
      pendingFrame = null;
    }
    if (clearTimer) clearTimeout(clearTimer);
    clearTimer = setTimeout(() => set(null), leaveDelay);
  };

  return {
    set,
    clear,
    useRetention: () => {
      const holding = React.useRef(false);
      const release = React.useCallback(() => {
        if (!holding.current) return;
        holding.current = false;
        retained -= 1;
        clear();
      }, []);
      React.useEffect(() => release, [release]);
      return {
        onPointerEnter: () => {
          if (holding.current) return;
          holding.current = true;
          retained += 1;
          if (clearTimer) clearTimeout(clearTimer);
          if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
          pendingFrame = null;
        },
        onPointerLeave: release,
      };
    },
    useValue: () => React.useSyncExternalStore(
      (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      () => value,
      () => null,
    ),
  };
};
