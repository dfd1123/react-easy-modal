import React from 'react';
import styled from 'styled-components';
import { AnimationOptions } from '../index';
import useModalAnimation from '../hooks/useModalAnimation';

interface PropsType {
  className?: string;
  children: React.ReactNode;
  subject?: string;
  showCloseBtn?: boolean;
  animation?: AnimationOptions;
  close?: () => void;
}

const ModalTemplateComp = ({ className, children, subject, showCloseBtn, animation, close }: PropsType) => {
  const { transitionClass, animationClassName, closeModal } = useModalAnimation({ animation, close });

  return (
    <div className={`${className} ${transitionClass} ${animationClassName}`}>
      <div tabIndex={-1} role="button" aria-label="modal-dim" className="dim" onClick={closeModal} />
      <div className="modal-cont">
        <div className="hd">
          {showCloseBtn && (
            <div className="btn-close-cont">
              <button className="btn-modal-close" onClick={() => closeModal()}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5826 10.0743L19.9257 17.4174L17.3816 19.9616L10.0384 12.6184L2.65683 20L0 17.3432L7.3816 9.96158L0.038424 2.6184L2.58257 0.0742578L9.92574 7.41743L17.3432 0L20 2.65683L12.5826 10.0743Z" fill="#323232" />
                </svg>
              </button>
            </div>
          )}
          {subject && (<h6 className="subject">{subject}</h6>)}
        </div>
        {children}
      </div>
    </div>
  );
};

const ModalTemplate = styled(ModalTemplateComp)`
  position: fixed; top: 0; left:0; bottom: 0; right: 0; z-index: 1; display: flex; justify-content: center; align-items: center;
  transition-duration: ${props => `${props.animation?.duration || 250}ms`} !important;
  button{ cursor:pointer; border: none; background-color: transparent; }
  .dim{ position: absolute; top: 0; left:0; bottom: 0; right: 0; z-index: 1; background-color: rgba(0,0,0,0.5); }
  .modal-cont{ position: relative; z-index: 2;  width: 500px; height: 500px;  padding: 20px; border-radius: 8px; background-color: white;  }
  .hd{ 
    .btn-close-cont{ text-align: right; }
    .subject{ margin-top: 8px; margin-bottom: 12px; font-size: 24px; font-weight: bold; color:black; text-align: center; }
  }

  &.fade{  opacity: 0; transition-property: opacity;
    &.enter{ opacity: 1; }
    &.leave{ opacity: 0; }
  }

  @keyframes fade {
    0%{ opacity: 0; }
    100%{ opacity: 1;}
  }
`;

export default ModalTemplate;
