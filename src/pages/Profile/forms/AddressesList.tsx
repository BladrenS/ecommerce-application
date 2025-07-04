import type { Address } from '@commercetools/platform-sdk';
import clsx from 'clsx';
import { useState } from 'react';
import Modal from 'react-modal';

import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { cross } from '../../../assets';
import { Button } from '../../../components/Ui';
import { baseModalStyle } from '../../../constants/modal';
import { AddAddressModal } from './AddAdressModal';
import { AddressCard } from './AddressCard';
import { EditAddressModal } from './EditAddressModal';
import styles from './styles.module.scss';

type Props = {
  addresses: Address[];
  defaultShipping: string;
  defaultBilling: string;
};

export const AddressesList = ({ addresses, defaultShipping, defaultBilling }: Props) => {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [defaultShippingId, setDefaultShippingId] = useState(defaultShipping);
  const [defaultBillingId, setDefaultBillingId] = useState(defaultBilling);
  const [addressesState, setAddressesState] = useState<Address[]>(addresses);
  const [AddModalIsOpen, setAddModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);

  function openAddModal() {
    setAddModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
    document.body.style.overflow = '';
  }

  function openEditModal(address: Address) {
    setEditingAddress(address);
    setEditModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeEditModal() {
    setEditModalIsOpen(false);
    document.body.style.overflow = '';
  }

  const handleAddSuccess = async () => {
    try {
      const me = await CommerceToolsService.getMe();
      setAddressesState(me.addresses ?? []);
      setDefaultShippingId(me.defaultShippingAddressId ?? '');
      setDefaultBillingId(me.defaultBillingAddressId ?? '');
    } catch (error) {
      console.error('Failed to fetch updated addresses:', error);
    }
  };

  return (
    <div className={styles['addresses-wrapper']}>
      <div className={styles['addresses-list']}>
        {addressesState.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isDefaultShipping={address.id === defaultShippingId}
            isDefaultBilling={address.id === defaultBillingId}
            editorOpener={() => openEditModal(address)}
            onDeleteSuccess={handleAddSuccess}
          />
        ))}
      </div>
      <Button onClick={openAddModal} className={clsx(styles.button)}>
        Add New Address
      </Button>

      <Modal isOpen={AddModalIsOpen} onRequestClose={closeAddModal} style={baseModalStyle}>
        <img src={cross} onClick={closeAddModal} className={styles.cross} alt="cross" />
        <AddAddressModal modalCloseFunc={closeAddModal} onUpdateSuccess={handleAddSuccess}></AddAddressModal>
      </Modal>

      <Modal isOpen={EditModalIsOpen} onRequestClose={closeEditModal} style={baseModalStyle}>
        <img src={cross} onClick={closeEditModal} className={styles.cross} alt="cross" />
        {editingAddress && (
          <EditAddressModal
            address={editingAddress}
            modalCloseFunc={closeEditModal}
            onUpdateSuccess={handleAddSuccess}
          />
        )}
      </Modal>
    </div>
  );
};
