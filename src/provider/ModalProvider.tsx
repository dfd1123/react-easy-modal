import React, { MutableRefObject, createContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimationOptions, ModalContextType, ModalType } from '../index';
import styled from 'styled-components';
import ModalComponent from '../components/ModalComponent';

interface PropsType {
  children: React.ReactNode;
  className?: string;
  showDim?: boolean;
  animation?: AnimationOptions;
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

const ModalProvider = ({ className = '', showDim, animation, children, backActionControl, scrollRelease, scrollFreeze }: PropsType) => {
  const modalList = useRef<ModalType[]>([]);
  const [modals, setModals] = useState<ModalType[]>([]);

  const value = useMemo(() => ({
    ...initialValue,
    className,
    showDim,
    animation,
    modals: modalList,
    setModals,
    scrollRelease,
    scrollFreeze,
  }), [className, showDim, animation, scrollRelease, scrollFreeze]);

  useEffect(() => {
    backActionControl && backActionControl.func({ modals: modalList });
  }, [...(backActionControl?.deps || []), backActionControl]);

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
