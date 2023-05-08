import React from 'react';
import styled from 'styled-components';
import { ModalTemplatePropsType } from '..';

const ModalTemplateComp = ({ className, showDim, children, close }: ModalTemplatePropsType) => {
  return (
    <div className={className}>
      {!!showDim && (
        <div tabIndex={-1} role="button" aria-label="modal-dim" className="dim" onClick={close} />
      )}
      <div className="modal-cont">
        {children}
      </div>
    </div>
  );
};

const ModalTemplate = styled(ModalTemplateComp)`
  position: fixed; top: 0; left:0; bottom: 0; right: 0; z-index: 1; display: flex; justify-content: center; align-items: center;
  button{ cursor:pointer; border: none; background-color: transparent; }
  .dim{ position: absolute; top: 0; left:0; bottom: 0; right: 0; z-index: 1; background-color: rgba(0,0,0,0.5); }
  .modal-cont{ position: relative; z-index: 2;  width: 500px; height: 500px;  padding: 20px; border-radius: 8px; background-color: white;  }

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
