import axios from 'axios';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Article = {
  title: string;
  description: string;
  url: string;
  image: string;
};

export const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: 'motorcycles OR yamaha OR kawasaki OR motoGP',
            lang: 'en',
            country: 'any',
            max: 25,
            apikey: 'af607d434e29d1cf96d13223350b456b',
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.news}>
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            <p>{article.description}</p>
            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
/*type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
};

export const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'yamaha OR kawasaki OR motoGP',
            sortBy: 'popularity',
            language: 'en',
            apiKey: '71ab631bae824a6588800a679f9c5e4e',
            pageSize: 15,
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.news}>
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            <p>{article.description}</p>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};*/
