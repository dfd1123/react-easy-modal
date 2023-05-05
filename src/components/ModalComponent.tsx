import React, { ComponentClass, FunctionComponent, Suspense, useContext, useEffect } from 'react';
import { DEFAULT_ANIMATION_DURATION, ModalTemplate, ModalType, useModalAnimation } from '../index';
import useModal from '../hooks/useModal';
import styled from 'styled-components';
import { ModalContext } from '../provider/ModalProvider';

interface PropsType {
  className?: string;
  modal: ModalType;
}

const Component = <P extends {}>({ is, props } : { is?: FunctionComponent<P> | ComponentClass<P> | string, props?: any }) : JSX.Element => {
  if (is) return (<Suspense>{React.createElement(is, props)}</Suspense>);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
};

const ModalComponentComp = ({ className, modal }: PropsType) => {
  const { className: modalClassName, showDim } = useContext(ModalContext);
  const { closeModal, resolveModal, scrollRelease } = useModal();
  const { transitionClass, animationClassName, closeModal: closeAnimationModal } = useModalAnimation(modal, closeModal);

  const close = (modal: ModalType) => {
    if (animationClassName) closeAnimationModal();
    else closeModal(modal.id);
  };

  const resolve = <T extends unknown>(modal: ModalType, result: T) => {
    resolveModal(modal, result);
  };

  useEffect(() => {
    return () => {
      scrollRelease && scrollRelease();
    };
  }, []);

  return (
    <ModalTemplate className={`${className} ${modalClassName} ${transitionClass}`} showDim={showDim} close={() => close(modal)}>
      <Component
        is={modal.component}
        key={modal.id}
        props={{
          ...modal.props,
          close: () => close(modal),
          resolve: <T extends unknown>(result: T) => resolve(modal, result),
        }}
      />
    </ModalTemplate>

  );
};

const ModalComponent = styled(ModalComponentComp)`
  visibility: hidden;
  
  >.dim{
    transition: opacity 0.1s;
  }

  &.enter, &.leave{ 
    visibility: visible; 
    
    >.dim{
      opacity: 1;
    }
    &-done{
      visibility: visible; 
    }
  }
  &.enter{
    .modal-cont{
      animation-name: ${({ modal }) => (modal.props?.animation?.name ? `modal-${modal.props?.animation?.name}` : 'none')};
      animation-duration: ${({ modal }) => (modal.props?.animation?.duration ? `${modal.props?.animation?.duration}ms` : `${DEFAULT_ANIMATION_DURATION}ms`)};
      animation-timing-function: ${({ modal }) => (modal.props?.animation?.timingFunction ? `${modal.props?.animation?.timingFunction}` : 'ease-in-out')};
      animation-direction: normal;
    }
  }
  &.leave{
    .modal-cont{
      animation-name: ${({ modal }) => (modal.props?.animation?.name ? `modal-${modal.props?.animation?.name}` : 'none')};
      animation-duration: ${({ modal }) => (modal.props?.animation?.duration ? `${modal.props?.animation?.duration}ms` : `${DEFAULT_ANIMATION_DURATION}ms`)};
      animation-timing-function: ${({ modal }) => (modal.props?.animation?.timingFunction ? `${modal.props?.animation?.timingFunction}` : 'ease-in-out')};
      animation-direction: reverse;
    }
  }

  @keyframes modal-fade {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100%{
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default React.memo(ModalComponent);
