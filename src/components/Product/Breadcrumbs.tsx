import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.scss';

type Breadcrumb = {
  label: string;
  path: string;
  isLast?: boolean;
  id?: string;
};

type BreadcrumbsProps = {
  category1?: string;
  category2?: string;
  id1?: string;
  id2?: string;
};

export const Breadcrumbs = ({ category1, category2, id1, id2 }: BreadcrumbsProps) => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(styles.breadcrumbs, { [styles.active]: isActive });

  const handleClick = (crumb: Breadcrumb) => {
    if (crumb.id) {
      localStorage.setItem('filter', crumb.id);
    }
    if (crumb.path === '/main' || (crumb.path === '/catalog' && !crumb.id)) {
      localStorage.removeItem('filter');
    }
  };

  const staticCrumbs: Breadcrumb[] = [
    { label: 'MAIN', path: '/main' },
    { label: 'CATALOG', path: '/catalog' },
  ];

  const dynamicCrumbs: Breadcrumb[] = [];

  if (category1) {
    dynamicCrumbs.push({ label: category1, path: '/catalog', id: id2 });
  }

  if (category2) {
    dynamicCrumbs.push({ label: category2, path: '/catalog', isLast: true, id: id1 });
  }

  const allCrumbs: Breadcrumb[] = [...staticCrumbs, ...dynamicCrumbs];

  return (
    <div className={styles.links}>
      {allCrumbs.map((crumb, index) => (
        <span key={index} className={styles.crumb}>
          <NavLink
            to={crumb.path}
            className={crumb.isLast ? styles.active : getNavLinkClass}
            onClick={() => handleClick(crumb)}
          >
            {crumb.label}
          </NavLink>
          {index < allCrumbs.length - 1 && <span className={styles.delimiter}>•</span>}
        </span>
      ))}
    </div>
  );
};
