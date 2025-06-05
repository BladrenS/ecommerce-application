import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { countryNameToCode } from '../../../constants/countries';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import { type addressFormData, addressSchema } from '../profile-validation';
import styles from './styles.module.scss';

interface AddressProps {
  street?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  modalCloseFunc: () => void;
  onUpdateSuccess: () => void;
}

export const AddAddressModal = (props: AddressProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<addressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
  });

  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);

  const onSubmit: SubmitHandler<addressFormData> = async (data) => {
    const actions: MyCustomerUpdateAction[] = [];
    const randomKey = window.crypto.randomUUID();

    actions.push({
      action: 'addAddress',
      address: {
        key: randomKey,
        streetName: data.street,
        city: data.city,
        postalCode: data.postalCode,
        country: countryNameToCode[data.country],
      },
    });

    if (isDefaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressKey: randomKey,
      });
    }

    if (isDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressKey: randomKey,
      });
    }

    try {
      await CommerceToolsService.updateMe(actions);
      props.modalCloseFunc();
      props.onUpdateSuccess();

      toast.success('New address added successfully', {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error response:', error.response.data);
        toast.error(`Something went wrong :(`, {
          position: 'bottom-left',
          autoClose: 2000,
          theme: 'dark',
        });
      } else {
        console.error(error);
      }
    }
  };

  const onError = (errors: unknown): void => {
    console.error('Form errors:', errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <LabeledInput label="Street" name="street" register={register} error={errors.street} value={props.street} />
      <LabeledInput label="City" name="city" register={register} error={errors.city} value={props.city} />
      <LabeledInput label="Country" name="country" register={register} error={errors.country} value={props.country} />
      <LabeledInput
        label="PostalCode"
        name="postalCode"
        register={register}
        error={errors.postalCode}
        value={props.postalCode}
      />
      <div className={styles.checkboxlabel}>
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={(event) => setIsDefaultShipping(event.target.checked)}
          />
          Set as Default Shipping
        </label>
      </div>
      <div className={styles.checkboxlabel}>
        <label>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={(event) => setIsDefaultBilling(event.target.checked)}
          />
          Set as Default Billing
        </label>
      </div>
      <Button disabled={!isValid} className={styles['submit-button']}>
        Add new Address
      </Button>
    </form>
  );
};
