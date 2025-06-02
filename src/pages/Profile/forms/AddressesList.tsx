import type { Address } from '@commercetools/platform-sdk';
import { useState } from 'react';
import Modal from 'react-modal';

import { CommerceToolsService } from '../../../api/CommerceToolsService/CommerceToolsService';
import { cross } from '../../../assets';
// import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Ui';
import { baseModalStyle } from '../../../constants/modal';
import { AddAddressModal } from './AddAdressModal';
import { AddressCard } from './AddressCard';
import styles from './styles.module.scss';

type Props = {
  addresses: Address[];
  defaultShipping: string;
  defaultBilling: string;
};

export const AddressesList = ({ addresses, defaultShipping, defaultBilling }: Props) => {
  // const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressesState, setAddressesState] = useState<Address[]>(addresses);
  const [AddModalIsOpen, setAddModalIsOpen] = useState(false);
  const [EditModalIsOpen, setEditModalIsOpen] = useState(false);

  //const dispatch = useDispatch();

  function openAddModal() {
    setAddModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeAddModal() {
    setAddModalIsOpen(false);
    document.body.style.overflow = '';
  }

  function openEditModal() {
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
    } catch (error) {
      console.error('Failed to fetch updated addresses:', error);
    }
  };

  return (
    <div>
      <div className={styles['addresses-list']}>
        {addressesState.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            isDefaultShipping={address.id === defaultShipping}
            isDefaultBilling={address.id === defaultBilling}
            canDelete={addresses.length > 1}
            editorOpener={openEditModal}
            onDeleteSuccess={handleAddSuccess}
          />
        ))}
      </div>
      <Button onClick={openAddModal} className={styles.button}>
        Add New Address
      </Button>

      <Modal isOpen={AddModalIsOpen} onRequestClose={closeAddModal} style={baseModalStyle}>
        <img src={cross} onClick={closeAddModal} className={styles.cross} alt="cross" />
        <AddAddressModal modalCloseFunc={closeAddModal} onUpdateSuccess={handleAddSuccess}></AddAddressModal>
      </Modal>

      <Modal isOpen={EditModalIsOpen} onRequestClose={closeEditModal} style={baseModalStyle}>
        <img src={cross} onClick={closeEditModal} className={styles.cross} alt="cross" />
        <div></div>
      </Modal>
    </div>
  );
};
