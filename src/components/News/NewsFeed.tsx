import axios from 'axios';
import { useEffect, useState } from 'react';

import { Loader } from '../Ui';
import styles from './styles.module.scss';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

export const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Kawasaki Ninja OR yamaha r1',
            sortBy: 'popularity',
            language: 'en',
            apiKey: '71ab631bae824a6588800a679f9c5e4e',
            pageSize: 15,
          },
        });
        setArticles(response.data.articles);
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
              backgroundImage: `linear-gradient(rgb(0 0 0 / 70%), rgb(0 0 0 / 70%)), url(${article.urlToImage})`,
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
