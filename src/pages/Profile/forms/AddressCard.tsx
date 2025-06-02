import type { Address } from '@commercetools/platform-sdk';

import { CommerceToolsService } from '../../../api/CommerceToolsService';
import { Button } from '../../../components/Ui';
import { countryCodeToName } from '../../../constants/countries';
import styles from './styles.module.scss';

type Props = {
  address: Address;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  canDelete: boolean;
  onEdit: () => void;
  onChange: () => void;
};

export const AddressCard = ({ address, isDefaultShipping, isDefaultBilling, canDelete, onEdit, onChange }: Props) => {
  const handleDelete = async () => {
    if (!address.id) return;

    await CommerceToolsService.updateMe([
      {
        action: 'removeAddress',
        addressId: address.id,
      },
    ]);
    onChange();
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
        <Button onClick={onEdit} className={styles.button}>
          Edit
        </Button>
        <Button onClick={handleDelete} disabled={!canDelete} className={styles.button}>
          Delete
        </Button>
      </div>
    </div>
  );
};
