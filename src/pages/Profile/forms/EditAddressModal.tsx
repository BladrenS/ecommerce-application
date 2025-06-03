import type { Address, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { countryCodeToName, countryNameToCode } from '../../../constants/countries';
import { incrementVersion } from '../../../store/versionSlice';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import { type addressFormData, addressSchema } from '../profile-validation';
import styles from './styles.module.scss';

interface Props {
  address: Address;
  modalCloseFunc: () => void;
  onUpdateSuccess: () => void;
}

export const EditAddressModal = ({ address, modalCloseFunc, onUpdateSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<addressFormData>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      street: address.streetName ?? '',
      city: address.city ?? '',
      country: '',
      postalCode: address.postalCode ?? '',
    },
  });

  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);

  const dispatch = useDispatch();

  const countryName = Object.entries(countryNameToCode).find(([, code]) => code === address.country)?.[0];
  if (countryName) {
    setValue('country', countryName);
  }

  const onSubmit: SubmitHandler<addressFormData> = async (data) => {
    if (!address.id) return;

    const actions: MyCustomerUpdateAction[] = [
      {
        action: 'changeAddress',
        addressId: address.id,
        address: {
          streetName: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: countryNameToCode[data.country],
        },
      },
    ];

    if (isDefaultShipping) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: address.id,
      });
    }

    if (isDefaultBilling) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: address.id,
      });
    }

    try {
      await CommerceToolsService.updateMe(actions);
      modalCloseFunc();
      onUpdateSuccess();
      toast.success('Address updated successfully', {
        position: 'bottom-left',
        autoClose: 2000,
        theme: 'dark',
      });
      dispatch(incrementVersion());
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabeledInput label="Street" name="street" register={register} error={errors.street} value={address.streetName} />
      <LabeledInput label="City" name="city" register={register} error={errors.city} value={address.city} />
      <LabeledInput
        label="Country"
        name="country"
        register={register}
        error={errors.country}
        value={countryCodeToName[address.country]}
      />
      <LabeledInput
        label="Postal Code"
        name="postalCode"
        register={register}
        error={errors.postalCode}
        value={address.postalCode}
      />

      <div className={styles.checkboxlabel}>
        <label>
          <input
            type="checkbox"
            checked={isDefaultShipping}
            onChange={(event) => setIsDefaultShipping(event.target.checked)}
            className={styles.checkbox}
          />
          Set as Default Shipping
        </label>
      </div>
      <div className={styles.checkboxlabel}>
        <label>
          <input
            type="checkbox"
            checked={isDefaultBilling}
            onChange={(event) => setIsDefaultBilling(event.target.checked)}
            className={styles.checkbox}
          />
          Set as Default Billing
        </label>
      </div>

      <Button disabled={!isValid} className={styles['submit-button']}>
        Save Changes
      </Button>
    </form>
  );
};
