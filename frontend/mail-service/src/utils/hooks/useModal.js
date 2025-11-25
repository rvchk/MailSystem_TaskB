import { useState } from 'react';

export const useModal = (initialModals = {}) => {
  const [modals, setModals] = useState(initialModals);

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  return {
    modals,
    openModal,
    closeModal
  };
};