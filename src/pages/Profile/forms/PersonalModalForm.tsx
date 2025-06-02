import type { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { incrementVersion } from '../../../store/versionSlice';
import { formatDate } from '../../../utils/formatDate';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import type { personalFormData } from '../profile-validation';
import { personalSchema } from '../profile-validation';
import styles from './styles.module.scss';

interface PersonalProps {
  name: string;
  lastName: string;
  email: string;
  date: string;
  modalCloseFunc: () => void;
  onUpdateSuccess: () => void;
}

export const PersonalModalForm = (props: PersonalProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<personalFormData>({
    resolver: zodResolver(personalSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      firstName: props.name,
      lastName: props.lastName,
      email: props.email,
      dateOfBirth: props.date ? new Date(props.date) : undefined,
    },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<personalFormData> = async (data) => {
    const actions: MyCustomerUpdateAction[] = [];

    if (data.firstName !== props.name) {
      actions.push({
        action: 'setFirstName',
        firstName: data.firstName,
      });
    }
    if (data.lastName !== props.lastName) {
      actions.push({
        action: 'setLastName',
        lastName: data.lastName,
      });
    }
    if (data.email !== props.email) {
      actions.push({
        action: 'changeEmail',
        email: data.email,
      });
    }

    const dateToCompare = new Date(props.date);
    if (
      (data.dateOfBirth && !dateToCompare) ||
      (!data.dateOfBirth && dateToCompare) ||
      (data.dateOfBirth && dateToCompare && data.dateOfBirth.getTime() !== dateToCompare.getTime())
    ) {
      actions.push({
        action: 'setDateOfBirth',
        dateOfBirth: data.dateOfBirth.toLocaleDateString('en-CA'),
      });
    }

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

  const [firstName, lastName, email, dateOfBirth] = watch(['firstName', 'lastName', 'email', 'dateOfBirth'], {
    firstName: props.name,
    lastName: props.lastName,
    email: props.email,
    dateOfBirth: props.date ? new Date(props.date) : undefined,
  });

  const isDirty =
    firstName !== props.name ||
    lastName !== props.lastName ||
    email !== props.email ||
    formatDate(dateOfBirth) !== formatDate(props.date);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <LabeledInput
        label="Firstname"
        name="firstName"
        register={register}
        error={errors.firstName}
        value={props.name}
      />
      <LabeledInput
        label="Lastname"
        name="lastName"
        register={register}
        error={errors.lastName}
        value={props.lastName}
      />
      <LabeledInput label="Email" name="email" register={register} error={errors.email} value={props.email} />
      <LabeledInput
        label="Date of birth"
        name="dateOfBirth"
        register={register}
        error={errors.dateOfBirth}
        value={props.date}
        type="date"
      />
      <Button disabled={!isValid || !isDirty} className={styles['submit-button']}>
        Update
      </Button>
    </form>
  );
};
