import { AxiosError } from 'axios';
import { useState } from 'react';
import type { SubmitHandler, UseFormSetError } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { ErrorCodeResponse } from '../../../types';
import type { LoginField } from '../schemas/loginSchemas';

interface SubmitHandling {
  submit: SubmitHandler<LoginField>;
  loading: boolean;
}

export const useLoginSubmitting = (setError: UseFormSetError<LoginField>): SubmitHandling => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  return { submit, loading };
};
