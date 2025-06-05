import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CommerceToolsAuth } from '../../../api/CommerceToolsService';
import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import type { passwordFormData } from '../profile-validation';
import { passwordSchema } from '../profile-validation';
import styles from './styles.module.scss';

interface PasswordFormProps {
  modalCloseFunc: () => void;
}

export const PasswordModalForm = ({ modalCloseFunc }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<passwordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  });

  const onSubmit: SubmitHandler<passwordFormData> = async (data) => {
    try {
      await CommerceToolsService.changePassword(data.password, data.newPassword);

      toast.success('Your password has been successfully updated', {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });

      await CommerceToolsAuth.authCustomer({ email: localStorage.getItem('user_login')!, password: data.newPassword });

      modalCloseFunc();
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password. Please check your current password.', {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const onError = (errors: unknown): void => {
    console.error('Form errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <LabeledInput
        label="Current password"
        name="password"
        register={register}
        error={errors.password}
        type="password"
      />
      <LabeledInput
        label="New password"
        name="newPassword"
        register={register}
        error={errors.newPassword}
        type="password"
      />
      <LabeledInput
        label="Confirm new password"
        name="newPasswordRepeat"
        register={register}
        error={errors.newPasswordRepeat}
        type="password"
      />
      <Button disabled={!isValid} className={styles['submit-button']}>
        Change password
      </Button>
    </form>
  );
};
