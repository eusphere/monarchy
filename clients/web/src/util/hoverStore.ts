import * as React from 'react';

type HoverStore<T> = {
  set: (value: T | null, key?: string | null) => void;
  clear: () => void;
  useValue: () => T | null;
};

/** Keeps hover enters responsive while allowing pointer transitions between child meshes. */
export const createHoverStore = <T,>(leaveDelay = 40): HoverStore<T> => {
  let value: T | null = null;
  let key: string | null = null;
  let pendingFrame: number | null = null;
  let clearTimer: ReturnType<typeof setTimeout> | null = null;
  const listeners = new Set<() => void>();

  const notify = (): void => listeners.forEach((listener) => listener());
  const set = (next: T | null, nextKey: string | null = null): void => {
    if (clearTimer) clearTimeout(clearTimer);
    if (key === nextKey) return;
    if (pendingFrame !== null) cancelAnimationFrame(pendingFrame);
    pendingFrame = requestAnimationFrame(() => {
      pendingFrame = null;
      value = next;
      key = nextKey;
      notify();
    });
  };
  const clear = (): void => {
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
