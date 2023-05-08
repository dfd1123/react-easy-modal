import React, { MutableRefObject, createContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimationOptions, ModalContextType, ModalType } from '../index';
import styled from 'styled-components';
import ModalComponent from '../components/ModalComponent';

interface PropsType {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationOptions;
  pathname: string;
  backActionControl?: {
    func: (value: { modals: MutableRefObject<ModalType[]> }) => void;
    deps?: any[];
  },
  scrollRelease?: () => void;
  scrollFreeze?: () => void;
}

const initialValue: ModalContextType = {
  modals: { current: [] },
  setModals: () => {},
};

const ModalContainerStyle = styled.div`
  position: absolute; left:0; top: 0; z-index: 9999;
  > button { position: fixed; left:0; top: 0; z-index: 9999; }
`;

export const ModalContext = createContext(initialValue);

const ModalProvider = ({ className = 'jw-modal', animation, children, backActionControl, pathname, scrollRelease, scrollFreeze }: PropsType) => {
  const modalList = useRef<ModalType[]>([]);
  const [modals, setModals] = useState<ModalType[]>([]);

  const value = useMemo(() => ({
    ...initialValue,
    className,
    animation,
    modals: modalList,
    setModals,
    scrollRelease,
    scrollFreeze,
  }), [className, animation, scrollRelease, scrollFreeze]);

  useEffect(() => {
    backActionControl && backActionControl.func({ modals: modalList });
  }, [...(backActionControl?.deps || []), backActionControl]);

  useEffect(() => {
    setModals([]);
    scrollRelease && scrollRelease();
  }, [pathname]);

  return (
    <ModalContext.Provider
      value={value}
    >
      <ModalContainerStyle>
        {modals.map(modal => (
          <ModalComponent key={modal.id} modal={modal} />
        ))}
      </ModalContainerStyle>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
