import { createContext } from 'react';

export const PlayerColorPreviewContext = createContext<{
  color?: string;
  setColor: (color: string | undefined) => void;
}>({ setColor: () => {} });
