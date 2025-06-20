import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { HEADER_ICONS as STATIC_ICONS, registerHeaderUpdater, updateHeaderIconCounters } from '../constants';

export const useHeaderData = () => {
  const [headerIcons, setHeaderIcons] = useState(STATIC_ICONS);
  const { pathname } = useLocation();
  const token = localStorage.getItem('refresh_token');

  useEffect(() => {
    registerHeaderUpdater(setHeaderIcons);

    const update = async () => {
      const updatedIcons = await updateHeaderIconCounters();

      const finalIcons = updatedIcons.map((icon) => {
        const isActive = pathname === icon.href;
        const isProfile = icon.href === '/profile';
        const disabled = isProfile && !token;

        return {
          ...icon,
          active: isActive,
          disabled,
        };
      });

      setHeaderIcons(finalIcons);
    };

    update();
  }, [pathname, token]);

  return { headerIcons, token };
};
