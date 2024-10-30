import copy from 'copy-to-clipboard';
import { useCallback, useEffect, useState } from 'react';

type UseCopy = (options?: {
  resetInterval?: number | null;
}) => [boolean, (value: string | number) => void];

export const useCopy: UseCopy = (
  { resetInterval = null } = {},
) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback((text: string | number) => {
    copy(text.toString());
    setIsCopied(true);
  }, []);

  useEffect(() => {
    let timeout: number;

    if (isCopied && resetInterval) {
      // change milliseconds in seconds
      setTimeout(() => setIsCopied(false), resetInterval * 1000);
    }
    return () => clearTimeout(timeout);
  }, [isCopied, resetInterval]);

  return [isCopied, handleCopy];
};
