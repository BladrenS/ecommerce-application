import type { ChangeEvent } from 'react';
import { type FC, useState } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

import styles from './registerForm.module.scss';

type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>; // Или UseFormRegister<FormData>, если тип известен
  error?: FieldError;
  className?: string;
  required?: boolean;
  value?: string;
};

export const LabeledInput: FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  value = '',
  className = '',
  required = false,
}) => {
  const baseInputClass = styles['input-field'];
  const errorClass = styles['input-error'];
  const finalClassName = `${baseInputClass} ${error ? errorClass : ''} ${className}`;

  const [inputValue, setInputValue] = useState(value);

  const { onChange, ...rest } = register(name);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(event);
  };

  return (
    <div className={styles['labeled-input']}>
      <label htmlFor={name} className={styles['label']}>
        {label}
        {required && <span className={styles['required']}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...rest}
        className={finalClassName}
        value={inputValue}
        onChange={handleChange}
      />
      {error && <p className={styles['error-message']}>{error.message}</p>}
    </div>
  );
};
