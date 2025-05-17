import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { LabeledInput } from './LabeledInput';
import styles from './registerForm.module.scss';
import type { RegistrationFormData } from './validation';
import { registrationSchema } from './validation';

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError('root', {
        message: `Something went wrong. Please try again later. Error: ${error}`,
      });
    }
  };
  const onError = (errors: unknown): void => {
    console.error('Form errors:', errors);
  };
  return (
    <div className={styles['page-wrapper']}>
      <form className={styles['registration-form']} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles['registration-form-wrapper']}>
          <div className={styles['form-group']}>
            <h3 className={styles['form-group-name']}>Credentials</h3>
            <LabeledInput
              label="Email"
              name="email"
              type="text"
              placeholder="user@example.com"
              register={register}
              error={errors.email}
              required={true}
            />
            <LabeledInput
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              register={register}
              error={errors.password}
              required={true}
            />
          </div>

          <div className={styles['form-group']}>
            <h3 className={styles['form-group-name']}>Personal</h3>
            <LabeledInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Donald"
              register={register}
              error={errors.firstName}
              required={true}
            />
            <LabeledInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Trump"
              register={register}
              error={errors.lastName}
              required={true}
            />
            <LabeledInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              register={register}
              error={errors.dateOfBirth}
              required={true}
            />
          </div>

          <div className={styles['form-group']}>
            <h3 className={styles['form-group-name']}>Shipping Adress</h3>
            <LabeledInput
              label="Street"
              name="street"
              type="text"
              placeholder="Street"
              register={register}
              error={errors.street}
              required={true}
            />
            <LabeledInput
              label="City"
              name="city"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city}
              required={true}
            />
            <LabeledInput
              label="Postal Code"
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              register={register}
              error={errors.postalCode}
              required={true}
            />
            <LabeledInput
              label="Country"
              name="country"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country}
              required={true}
            />
          </div>
        </div>

        <button disabled={isSubmitting || !isValid} type="submit" className={styles['submit-button']}>
          {isSubmitting ? 'Loading...' : 'Register'}
        </button>
        {errors.root && <div className="error-message">{errors.root.message}</div>}
      </form>
    </div>
  );
};
