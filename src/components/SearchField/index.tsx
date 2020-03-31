import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Container = styled.div`
  position: relative;
`;

const SearchIcon = styled(Icon)`
  height: 14px;
  left: 12px;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
`;

const Input = styled.input`
  padding: 2px 10px 2px 24px;
  width: 100%;
`;

const SearchField: FC<ComponentProps<typeof Input>> = props => {
  const { className, ...otherProps } = props;

  return (
    <Container className={className}>
      <SearchIcon name="search" />
      <Input {...otherProps} />
    </Container>

  );
};

export default SearchField;
