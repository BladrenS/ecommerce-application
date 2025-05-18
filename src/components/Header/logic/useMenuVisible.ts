import { useEffect, useState } from 'react';

export const useMenuVisible = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useEffect(() => {
    if (isActiveMenu) {
      document.body.classList.add('scroll-hide');
    } else {
      document.body.classList.remove('scroll-hide');
    }

    return () => {
      document.body.classList.remove('scroll-hide');
    };
  }, [isActiveMenu]);

  return { isActiveMenu, setIsActiveMenu };
};
