import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '../../../components/Ui';
import { LabeledInput } from '../../registrationPage/registrationForm/LabeledInput';
import type { personalFormData } from '../profile-validation';
import { personalSchema } from '../profile-validation';
import styles from './styles.module.scss';

interface PersonalProps {
  name: string;
  lastName: string;
  email: string;
  date: string;
}

export const PersonalModalForm = (props: PersonalProps) => {
  const {
    register,
    //handleSubmit,
    //setError,
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
    (dateOfBirth instanceof Date && props.date ? dateOfBirth.getTime() !== new Date(props.date).getTime() : false);

  return (
    <div>
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
    </div>
  );
};
