import axios from 'axios';
import { useEffect, useState } from 'react';

import { Loader } from '../Ui';
import styles from './styles.module.scss';

type Article = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const isValidImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'Yamaha OR motoGP OR Kawasaki OR motorcycle',
            lang: 'en',
            sortby: 'relevance',
            max: 8,
            token: 'af607d434e29d1cf96d13223350b456b',
          },
        });
        const articles = response.data.articles;

        const validatedArticles = await Promise.all(
          articles.map(async (article: Article) => {
            const isValid = await isValidImage(article.image);
            return isValid ? article : null;
          }),
        );
        setArticles(validatedArticles.filter(Boolean));
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className={styles['news-container']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles['news-container']}>
      <div className={styles['news-inner']}>
        {articles.map((article, index) => (
          <a
            key={index}
            className={styles['news-item']}
            href={article.url}
            target="_blank"
            style={{
              backgroundImage: `linear-gradient(rgb(0 0 0 / 70%), rgb(0 0 0 / 70%)), url(${article.image})`,
              backgroundSize: 'cover',
            }}
          >
            <h3 className={styles['news-item-header']}>{article.title}</h3>
            <p className={styles['news-item-text']}>{article.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
