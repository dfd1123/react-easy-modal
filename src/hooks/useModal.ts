import { AddModalType, CheckModalType, CloseModalType, ModalType, OpenModalType, ResolveModalType } from '../index';
import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../provider/ModalProvider';
import { useRouter } from 'next/router';

const useModal = () => {
  const nextPastPathname = useRef('');
  const router = useRouter();
  const { pathname } = router;
  const { modals, setModals, scrollRelease, scrollFreeze } = useContext(ModalContext);

  const checkModal : CheckModalType = (
    component,
    onlyLastCheck = false,
  ) => {
    const modalList = modals.current;

    if (onlyLastCheck) {
      return modalList.length > 0
        ? modalList[modalList.length - 1].component.name === component.name
        : false;
    }
    return modalList.some(m => m.component.name === component.name);
  };

  const addModal : AddModalType = ({ component, props, duplicateCheck, isScrollFreeze }) => {
    return new Promise((resolve, reject) => {
      const modal: ModalType = {
        id: -1,
        props,
        component,
        resolve,
        reject,
      };

      if (isScrollFreeze && scrollFreeze) scrollFreeze();

      const modalList = modals.current;

      let duplicate = checkModal(modal.component, true);
      if (duplicateCheck) duplicate = checkModal(modal.component);
      if (duplicate) return;

      modal.id = (modalList[modalList.length - 1]?.id ?? -1) + 1;

      setModals([...modalList, modal]);
    });
  };

  const openModal : OpenModalType = async (
    component,
    props,
    duplicateCheck = false,
  ) => {
    return addModal({ component, props, duplicateCheck, isScrollFreeze: true });
  };

  const openScrollFreeModal : OpenModalType = async (
    component,
    props,
    duplicateCheck = false,
  ) => {
    return addModal({ component, props, duplicateCheck, isScrollFreeze: false });
  };

  const closeModal : CloseModalType = id => {
    const newModalList = modals.current.filter(m => m.id !== id);

    setModals(newModalList);
    if (!newModalList.length && scrollRelease) scrollRelease();
  };

  const resolveModal : ResolveModalType = (modal, result) => {
    modal.resolve(result);
    closeModal(modal.id);
  };

  const resetModal = () => {
    setModals([]);
    scrollRelease && scrollRelease();
  };

  useEffect(() => {
    if (nextPastPathname.current !== pathname) nextPastPathname.current = pathname;
    return () => {
      if (nextPastPathname.current !== pathname) {
        resetModal();
      }
    };
  }, [pathname]);

  return {
    modals,
    modal: openModal,
    scrollModal: openScrollFreeModal,
    closeModal,
    resolveModal,
    checkModal,
    resetModal,
    scrollRelease,
  };
};

export default useModal;
