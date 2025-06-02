import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { countryNameToCode } from '../../../constants/countries';
import { incrementVersion } from '../../../store/versionSlice';
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

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<addressFormData> = async (data) => {
    const actions: MyCustomerUpdateAction[] = [];

    actions.push({
      action: 'addAddress',
      address: {
        streetName: data.street,
        city: data.city,
        postalCode: data.postalCode,
        country: countryNameToCode[data.country],
      },
    });

    try {
      await CommerceToolsService.updateMe(actions);
      props.modalCloseFunc();
      props.onUpdateSuccess();

      toast.success('Your data has been successfully updated', {
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
      <Button disabled={!isValid} className={styles['submit-button']}>
        Add new Address
      </Button>
    </form>
  );
};
