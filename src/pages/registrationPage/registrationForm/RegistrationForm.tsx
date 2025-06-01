import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { NavLink, useNavigate } from 'react-router-dom';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { createCustomer } from '../../../api/request';
import { cross } from '../../../assets';
import { Button } from '../../../components/Ui';
import { Loader } from '../../../components/Ui/Loader/Loader';
import { baseModalStyle } from '../../../constants/modal';
import { LabeledInput } from './LabeledInput';
import styles from './registerForm.module.scss';
import type { RegistrationFormData } from './validation';
import { registrationSchema } from './validation';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      shippingAsBilling: false,
    },
  });
  Modal.setAppElement('#root');
  const [activeLoader, setActiveLoader] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const shippingAsBilling = watch('shippingAsBilling');

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    try {
      setActiveLoader(true);
      await createCustomer(data);
      const values = {
        email: data.email,
        password: data.password,
      };

      const response = await CommerceToolsService.authCustomer(values);
      localStorage.setItem('refresh_token', response.refresh_token);
      navigate('/main');
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      openModal();
      setError('root', {
        message: `${error}`,
      });
    } finally {
      setActiveLoader(false);
    }
  };

  const onError = (errors: unknown): void => {
    console.error('Form errors:', errors);
  };

  return (
    <div className={styles['page-wrapper']}>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={baseModalStyle} contentLabel="Example Modal">
        <div>
          <img src={cross} onClick={closeModal} className={styles.cross} alt="cross" />
          {errorMessage}
        </div>
      </Modal>
      {activeLoader && <Loader />}
      <form className={styles['registration-form']} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className={styles['registration-form-wrapper']}>
          <div className={styles['form-group']}>
            <h3 className={styles['form-group-name']}>Credentials</h3>

            <LabeledInput
              label="Email"
              name="email"
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
              placeholder="Donald"
              register={register}
              error={errors.firstName}
              required
            />

            <LabeledInput
              label="Last Name"
              name="lastName"
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
              placeholder="Street"
              register={register}
              error={errors.street_shipping}
              required
            />

            <LabeledInput
              label="City"
              name="city_shipping"
              placeholder="City"
              register={register}
              error={errors.city_shipping}
              required
            />

            <LabeledInput
              label="Country"
              name="country_shipping"
              placeholder="Country"
              register={register}
              error={errors.country_shipping}
              required
            />

            <LabeledInput
              label="Postal Code"
              name="postalCode_shipping"
              placeholder="Postal Code"
              register={register}
              error={errors.postalCode_shipping}
              required
            />

            <div className={styles['checkbox-container']}>
              <input type="checkbox" id="cbx-default-shipping" {...register('defaultShipping')} />
              <span className={styles.checkbox}>Use as default for shipping</span>
            </div>

            <div className={styles['checkbox-container']}>
              <input type="checkbox" id="cbx-shipping-as-billing" {...register('shippingAsBilling')} />
              <span className={styles.checkbox}>Use shipping address as billing</span>
            </div>
          </div>

          {!shippingAsBilling && (
            <div className={styles['form-group']}>
              <h3 className={styles['form-group-name']}>Billing Address</h3>

              <LabeledInput
                label="Street"
                name="street_billing"
                placeholder="Street"
                register={register}
                error={errors.street_billing}
                required
              />

              <LabeledInput
                label="City"
                name="city_billing"
                placeholder="City"
                register={register}
                error={errors.city_billing}
                required
              />

              <LabeledInput
                label="Country"
                name="country_billing"
                placeholder="Country"
                register={register}
                error={errors.country_billing}
                required
              />

              <LabeledInput
                label="Postal Code"
                name="postalCode_billing"
                placeholder="Postal Code"
                register={register}
                error={errors.postalCode_billing}
                required
              />

              <div className={styles['checkbox-container']}>
                <input type="checkbox" id="cbx-default-billing" {...register('defaultBilling')} />
                <span className={styles.checkbox}>Use as default for billing</span>
              </div>
            </div>
          )}
        </div>

        <Button disabled={isSubmitting || !isValid} className={styles['submit-button']}>
          {isSubmitting ? 'Loading...' : 'Register'}
        </Button>

        <div className={styles['desc-under']}>
          Already have an account?
          <NavLink className={styles['desc-under-span']} to={'/login'}>
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};
