import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { queryProduct } from '../../api/request';
import { Loader } from '../../components/Ui';
import styles from './styles.module.scss';

export const Catalog: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async (id: string) => {
    await queryProduct(id);
    navigate(`/product/${id}`);
  };
  return (
    <main className={styles.wrapper}>
      {loading && <Loader />}
      <Link
        to={`#`}
        className={styles.link}
        onClick={(event) => {
          event.preventDefault();
          setLoading(true);
          handleClick('8e904636-722c-46fc-99e0-aea88ddead97');
        }}
      >
        Линка на товар
      </Link>
    </main>
  );
};
