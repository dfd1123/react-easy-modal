import { ModalPropsType } from 'react-easy-modal';
import React from 'react';
import styled from 'styled-components';

interface PropsType extends ModalPropsType {
  className?: string;
}

const TestModalComp = ({ className, close, resolve }: PropsType) => {
  return (
    <div className={className}>
      TestModal
      <div className="btn-cont">
        <button onClick={close}>취소</button>
        <button onClick={() => resolve && resolve(true)}>확인</button>
      </div>
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TestModal = styled(TestModalComp)`

`;

export default TestModal;
