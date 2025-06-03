import type { Address } from '@commercetools/platform-sdk';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { countryCodeToName } from '../../../constants/countries';
import { incrementVersion } from '../../../store/versionSlice';
import styles from './styles.module.scss';

type Props = {
  address: Address;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  editorOpener: () => void;
  onDeleteSuccess: () => void;
};

export const AddressCard = ({ address, isDefaultShipping, isDefaultBilling, editorOpener, onDeleteSuccess }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!address.id) return;

    await CommerceToolsService.updateMe([
      {
        action: 'removeAddress',
        addressId: address.id,
      },
    ]);
    onDeleteSuccess();
    dispatch(incrementVersion());
    toast.success('The address has been successfully deleted.', {
      position: 'bottom-left',
      autoClose: 2000,
      theme: 'dark',
    });
  };

  return (
    <div className={styles['address-card']}>
      <div>
        <span className={styles['address-span']}>Street: </span>
        {address.streetName}
      </div>
      <div>
        <span className={styles['address-span']}>City: </span>
        {address.city}
      </div>
      <div>
        <span className={styles['address-span']}>Country: </span>
        {countryCodeToName[address.country]}
      </div>
      <div>
        <span className={styles['address-span']}>Postal code: </span>
        {address.postalCode}
      </div>
      <div className={styles['many-buttons']}>
        {isDefaultShipping && <span className={styles.badge}>✓ Default Shipping</span>}
        {isDefaultBilling && <span className={styles.badge}>✓ Default Billing</span>}
      </div>
      <div className={styles['many-buttons']}>
        <Button className={styles.button} onClick={editorOpener}>
          Edit
        </Button>
        <Button onClick={handleDelete} className={styles.button}>
          Delete
        </Button>
      </div>
    </div>
  );
};
