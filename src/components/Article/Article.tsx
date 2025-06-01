import { useParams } from 'react-router-dom';

import { articleItems } from './articles';
import styles from './styles.module.scss';

export const Article = () => {
  const { id } = useParams();
  const index = Number(id);
  const article = articleItems[index];

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{article.header}</h1>
      <img src={article.image} alt="article" className={styles.image} />
      <div className={styles.text}>{article.text}</div>
    </div>
  );
};
