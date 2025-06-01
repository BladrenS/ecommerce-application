import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '../../../components/Ui';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import type { passwordFormData } from '../profile-validation';
import { passwordSchema } from '../profile-validation';
import styles from './styles.module.scss';

export const PasswordModalForm = () => {
  const {
    register,
    //handleSubmit,
    //setError,
    //watch,
    formState: { errors, isValid },
  } = useForm<passwordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  });

  return (
    <div>
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
        Change
      </Button>
    </div>
  );
};
