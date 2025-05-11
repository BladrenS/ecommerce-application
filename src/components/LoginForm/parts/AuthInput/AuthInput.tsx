import type { ComponentProps, FC } from 'react';
import { useState } from 'react';

import { eyeImg, eyeOffImg } from '../../../../assets';
import { AuthFieldName } from '../../../../types';
import { AuthIcon } from '../';
import styles from './styles.module.scss';

interface AuthInputProps extends ComponentProps<'input'> {
  error?: string;
}

export const AuthInput: FC<AuthInputProps> = ({ error, name, type, ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordVisibleToggle = (): void => {
    setPasswordVisible((previous) => !previous);
  };

  return (
    <label className={styles.label}>
      <div className={styles.name}>{name}</div>
      <div className={styles.wrapper}>
        <input
          name={name}
          type={passwordVisible && name === AuthFieldName.PASSWORD ? 'text' : type}
          className={styles.input}
          {...props}
        />
        {name === AuthFieldName.PASSWORD && (
          <AuthIcon
            src={passwordVisible ? eyeImg : eyeOffImg}
            onClick={passwordVisibleToggle}
            alt="show or hide password"
          />
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </label>
  );
};
