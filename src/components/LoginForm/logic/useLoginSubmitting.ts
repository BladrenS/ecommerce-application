import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import type { FormEvent } from 'react';
import { useState } from 'react';
import type { FieldErrors, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { ErrorCodeResponse } from '../../../types';
import { type LoginField, schema } from '../schemas/loginSchemas';

interface SubmitHandling {
  register: UseFormRegister<LoginField>;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  errors: FieldErrors<LoginField>;
  isValid: boolean;
  loading: boolean;
}

export const useLoginSubmitting = (): SubmitHandling => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<LoginField>({ mode: 'onChange', resolver: zodResolver(schema) });

  const submit: SubmitHandler<LoginField> = async (values) => {
    try {
      setLoading(true);
      const isCorrectEmail = await CommerceToolsService.checkEmail(values.email);

      if (!isCorrectEmail) {
        setError('email', { message: 'Invalid email address' });
        return;
      }

      const response = await CommerceToolsService.authCustomer(values);

      localStorage.setItem('refresh_token', response.refresh_token);

      navigate('/main');
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const { statusCode, message } = error.response.data;

        if (statusCode && statusCode === ErrorCodeResponse.BAD_REQUEST) {
          setError('password', { message: 'Wrong password' });
        } else {
          setError('root', { message });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, submit: handleSubmit(submit), loading, errors, isValid };
};
