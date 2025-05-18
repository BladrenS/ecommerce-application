import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, useState } from 'react';
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
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      shippingAsBilling: true,
    },
  });

  const [isShippingEqualBilling, setIsShippingEqualBilling] = useState(false);

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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsShippingEqualBilling(checked);
    setValue('shippingAsBilling', checked); // обновляем значение формы вручную
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
              required
            />
            <LabeledInput
              label="Password"
              name="password"
              type="password"
              placeholder="********"
              register={register}
              error={errors.password}
              required
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
              required
            />
            <LabeledInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Trump"
              register={register}
              error={errors.lastName}
              required
            />
            <LabeledInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              placeholder="Date of Birth"
              register={register}
              error={errors.dateOfBirth}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <h3 className={styles['form-group-name']}>Shipping Address</h3>
            <LabeledInput
              label="Street"
              name="street_shipping"
              type="text"
              placeholder="Street"
              register={register}
              error={errors.street_shipping}
              required
            />

            <LabeledInput
              label="City"
              name="city_shipping"
              type="text"
              placeholder="City"
              register={register}
              error={errors.city_shipping}
              required
            />

            <LabeledInput
              label="Country"
              name="country_shipping"
              type="text"
              placeholder="Country"
              register={register}
              error={errors.country_shipping}
              required
            />

            <LabeledInput
              label="Postal Code"
              name="postalCode_shipping"
              type="text"
              placeholder="Postal Code"
              register={register}
              error={errors.postalCode_shipping}
              required
            />

            <div className={styles['checkbox-container']}>
              <input type="checkbox" name="default-shipping" id="cbx-default-shipping" />
              <span className={styles.checkbox}>Use as default for shipping</span>
            </div>

            <div className={styles['checkbox-container']}>
              <input
                type="checkbox"
                id="cbx-shipping-as-billing"
                checked={isShippingEqualBilling}
                onChange={handleCheckboxChange}
              />
              <span className={styles.checkbox}>Use shipping address as billing</span>
            </div>
          </div>

          {!isShippingEqualBilling && (
            <div className={styles['form-group']}>
              <h3 className={styles['form-group-name']}>Billing Address</h3>

              <LabeledInput
                label="Street"
                name="street_billing"
                type="text"
                placeholder="Street"
                register={register}
                error={errors.street_billing}
                required
              />

              <LabeledInput
                label="City"
                name="city_billing"
                type="text"
                placeholder="City"
                register={register}
                error={errors.city_billing}
                required
              />

              <LabeledInput
                label="Country"
                name="country_billing"
                type="text"
                placeholder="Country"
                register={register}
                error={errors.country_billing}
                required
              />

              <LabeledInput
                label="Postal Code"
                name="postalCode_billing"
                type="text"
                placeholder="Postal Code"
                register={register}
                error={errors.postalCode_billing}
                required
              />

              <div className={styles['checkbox-container']}>
                <input type="checkbox" name="default-shipping" id="cbx-default-billing" />
                <span className={styles.checkbox}>Use as default for billing</span>
              </div>
            </div>
          )}
        </div>

        <button disabled={isSubmitting || !isValid} type="submit" className={styles['submit-button']}>
          {isSubmitting ? 'Loading...' : 'Register'}
        </button>

        <div className={styles['desc-under']}>
          Already have an account?
          <span className={styles['desc-under-span']}>Login</span>
        </div>
        {errors.root && <div className="error-message">{errors.root.message}</div>}
      </form>
    </div>
  );
};
