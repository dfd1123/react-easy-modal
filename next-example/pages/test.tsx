import React from 'react';
import styled from 'styled-components';

export interface PropsType {
  className?: string;
}

// noinspection LessResolvedByNameOnly
const TestStyle = styled.div`
    // style
`;

const test = ({ className }: PropsType) => {
  // logic

  return (
    <TestStyle>test</TestStyle>
  );
};

export default test;
