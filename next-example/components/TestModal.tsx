import React from 'react';
import styled from 'styled-components';

interface PropsType {
    className?: string;
}

const TestModalComp = ({className}: PropsType) => {
  return (
    <div className={className}>
      TestModal
    </div>
  );
};

// noinspection LessResolvedByNameOnly
const TestModal = styled(TestModalComp)`

`;

export default TestModal;
