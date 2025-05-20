import { useEffect, useState } from 'react';

export const useMenuVisible = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useEffect(() => {
    if (isActiveMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isActiveMenu]);

  return { isActiveMenu, setIsActiveMenu };
};
