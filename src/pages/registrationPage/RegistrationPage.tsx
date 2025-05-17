import { LoginRegistrationToggler } from '../parts/LoginRegistrationToggler';
import { RegistrationForm } from './registrationForm/RegistrationForm';
import styles from './regpage.module.scss';

export const RegistrationPage = () => {
  return (
    <div className={styles['registration-page']}>
      <LoginRegistrationToggler activeButton="register" />
      <RegistrationForm></RegistrationForm>
    </div>
  );
};
