import type { FC } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

import styles from './register.module.scss';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>; // Или UseFormRegister<FormData>, если тип известен
  error?: FieldError;
  className?: string;
  required?: boolean;
};

export const LabeledInput: FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  className = '',
  required = false,
}) => {
  const baseInputClass = styles['input-field'];
  const errorClass = styles['input-error'];
  const finalClassName = `${baseInputClass} ${error ? errorClass : ''} ${className}`;

  return (
    <div className={styles['labeled-input']}>
      <label htmlFor={name} className={styles['label']}>
        {label}
        {required && <span className={styles['required']}>*</span>}
      </label>
      <input id={name} type={type} placeholder={placeholder} {...register(name)} className={finalClassName} />
      {error && <p className={styles['error-message']}>{error.message}</p>}
    </div>
  );
};
