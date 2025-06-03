import type { Address } from '@commercetools/platform-sdk';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CommerceToolsService } from '../../api/CommerceToolsService/CommerceToolsService';
import { cross } from '../../assets';
import { Button, Loader } from '../../components/Ui';
import { baseModalStyle } from '../../constants/modal';
import { setVersion } from '../../store/versionSlice';
import { AddressesList } from './forms/AddressesList';
import { PasswordModalForm } from './forms/PasswordModalForm';
import { PersonalModalForm } from './forms/PersonalModalForm';
import styles from './styles.module.scss';

export const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [modalErrorIsOpen, setmodalIsOpen] = useState(false);
  const [modalPasswordIsOpen, setmodalPasswordIsOpen] = useState(false);
  const [modalPersonalIsOpen, setmodalPersonalIsOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [shippingId, setShippingId] = useState('');
  const [billingId, setBillingId] = useState('');

  const dispatch = useDispatch();

  Modal.setAppElement('#root');

  function openErrorModal() {
    setmodalIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeErrorModal() {
    setmodalIsOpen(false);
    document.body.style.overflow = '';
  }

  function openPersonalModal() {
    setmodalPersonalIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closePersonalModal() {
    setmodalPersonalIsOpen(false);
    document.body.style.overflow = '';
  }

  function openPasswordModal() {
    setmodalPasswordIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closePasswordModal() {
    setmodalPasswordIsOpen(false);
    document.body.style.overflow = '';
  }

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/main');
      return;
    }
    CommerceToolsService.getMe()
      .then((data) => {
        setName(data.firstName || '');
        setLastName(data.lastName || '');
        setEmail(data.email);
        setDate(data.dateOfBirth?.toString() || '');
        setAddresses(data.addresses || []);
        setShippingId(data.defaultShippingAddressId || '');
        setBillingId(data.defaultBillingAddressId || '');
        dispatch(setVersion(data.version));
      })
      .catch((error) => {
        setError(error.message || 'Failed to load data');
        openErrorModal();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className={styles.main}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <Modal isOpen={modalErrorIsOpen} onRequestClose={closeErrorModal} style={baseModalStyle}>
        <div>
          <img src={cross} onClick={closeErrorModal} className={styles.cross} alt="cross" />
          {error}
        </div>
      </Modal>

      <div className={styles.form}>
        <div className={styles.name}>Personal</div>
        <div className={styles.firstname}>
          <span className={styles['personal-span']}>Firstname: </span>
          {name}
        </div>
        <div>
          <span className={styles['personal-span']}>Lastname: </span>
          {lastName}
        </div>
        <div>
          <span className={styles['personal-span']}>Email: </span>
          {email}
        </div>
        <div>
          <span className={styles['personal-span']}>Date of Birth: </span>
          {date}
        </div>
        <div className={styles['many-buttons']}>
          <Button className={styles.button} type="button" onClick={openPersonalModal}>
            Edit
          </Button>
          <Button className={styles.button} type="button" onClick={openPasswordModal}>
            Change Password
          </Button>
        </div>
      </div>

      <Modal isOpen={modalPersonalIsOpen} onRequestClose={closePersonalModal} style={baseModalStyle}>
        <div>
          <img src={cross} onClick={closePersonalModal} className={styles.cross} alt="cross" />
          <PersonalModalForm
            name={name}
            lastName={lastName}
            email={email}
            date={date}
            modalCloseFunc={closePersonalModal}
            onUpdateSuccess={() => {
              CommerceToolsService.getMe()
                .then((data) => {
                  setName(data.firstName || '');
                  setLastName(data.lastName || '');
                  setEmail(data.email);
                  setDate(data.dateOfBirth?.toString() || '');
                  dispatch(setVersion(data.version));
                })
                .catch((error) => {
                  setError(error.message || 'Failed to refresh user data');
                  openErrorModal();
                });
            }}
          />
        </div>
      </Modal>

      <Modal isOpen={modalPasswordIsOpen} onRequestClose={closePasswordModal} style={baseModalStyle}>
        <div>
          <img src={cross} onClick={closePasswordModal} className={styles.cross} alt="cross" />
          <PasswordModalForm modalCloseFunc={closePasswordModal} />
        </div>
      </Modal>

      <div className={styles.form}>
        <div className={clsx(styles.name, styles['address-name'])}>Addresses</div>
        <AddressesList addresses={addresses} defaultShipping={shippingId} defaultBilling={billingId} />
      </div>
    </div>
  );
};
