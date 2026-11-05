import * as React from 'react';
import { readLocalStorage, writeLocalStorage } from '~/util/localStorage';

const DEBUG_STORAGE_KEY = 'monarchy.debug';

export const useDebug = (): [boolean, (enabled: boolean) => void] => {
  const [enabled, setEnabled] = React.useState(() => readLocalStorage(DEBUG_STORAGE_KEY, false));

  const update = React.useCallback((nextEnabled: boolean) => {
    setEnabled(nextEnabled);
    writeLocalStorage(DEBUG_STORAGE_KEY, nextEnabled);
  }, []);

  return [enabled, update];
};
