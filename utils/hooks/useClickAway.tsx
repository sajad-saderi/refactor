import React, { useEffect } from 'react';

const useClickAway = (
  ref: React.MutableRefObject<HTMLElement | null>,
  onClickAway: (e: MouseEvent) => void
): void => {
  useEffect(() => {
    const handleClickAway = (e: MouseEvent): void => {
      if (ref?.current && !ref.current.contains(e.target as Node))
        onClickAway(e);
    };
    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, [ref, onClickAway]);
};

export default useClickAway;
