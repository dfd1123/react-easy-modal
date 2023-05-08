import { ModalPropsType, ModalTemplate } from 'react-easy-modal';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

interface PropsType extends ModalPropsType {
  className?: string;
  text: string;
}

const TestModalComp = ({ className, text, close, resolve }: PropsType) => {
  const router = useRouter();

  return (
    <ModalTemplate className={className} showDim close={close}>
      TestModal {text}
      <button onClick={() => router.push('/test')}>ddd</button>
      <div className="btn-cont">
        <button onClick={close}>취소</button>
        <button onClick={() => resolve && resolve(true)}>확인</button>
      </div>
    </ModalTemplate>
  );
};

// noinspection LessResolvedByNameOnly
const TestModal = styled(TestModalComp)`

`;

export default TestModal;
