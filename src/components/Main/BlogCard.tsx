import type { FC } from 'react';
import { NavLink } from 'react-router-dom';

import type { BlogItem } from '../../constants';
import styles from './styles.module.scss';

type BlogCardProps = BlogItem & {
  index: number;
};

export const BlogCard: FC<BlogCardProps> = ({ date, title, text, image, index, link }) => {
  const content = (
    <>
      <img className={styles['blog-img']} src={image} alt={title} />
      <div className={styles['blog-info']}>
        <span className={styles['info-date']}>{date}</span>
        <span className={styles['info-header']}>{title}</span>
        <span className={styles['info-text']}>{text}</span>
      </div>
    </>
  );

  return (
    <NavLink to={link ? `${link}` : `/article/${index}`} className={styles['blog-item']}>
      {content}
    </NavLink>
  );
};
