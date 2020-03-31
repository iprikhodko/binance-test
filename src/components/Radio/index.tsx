import React, { ChangeEvent, FC, ReactNode } from 'react';
import styled from 'styled-components';
import THEMES from '../../constants/themes';

const RadioInput = styled.input.attrs(() => ({ type: 'radio' }))`
  height: 0;
  opacity: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  width: 0;
`;

const Circle = styled.div`
  background: ${THEMES.BACKGROUND_PRIMARY};
  border: solid 1px ${THEMES.BORDER_SECONDARY};
  border-radius: 50%;
  display: flex;
  height: 14px;
  width: 14px;
`;

const CheckboxWrapper = styled.div``;

const Container = styled.label`
  cursor: pointer;
  display: inline-flex;

  ${RadioInput}:checked + ${Circle} {
    background: ${THEMES.ACTIVE_PRIMARY};
    box-shadow: ${THEMES.BACKGROUND_PRIMARY} 0px 0px 0px 3px inset;
    border-color: #f0b90b;
  }

  &:hover ${RadioInput}:not(:checked) + ${Circle} {
    background: ${THEMES.BORDER_THIRD};
    box-shadow: ${THEMES.BACKGROUND_PRIMARY} 0px 0px 0px 3px inset;
  }
`;

type IRadioProps = {
  className?: string;
  children?: (node: ReactNode) => ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Radio: FC<IRadioProps> = props => {
  const { children, className, ...otherProps } = props;
  const checkbox = (
    <CheckboxWrapper>
      <RadioInput {...otherProps} />
      <Circle />
    </CheckboxWrapper>
  );

  return (
    <Container className={className}>
      {typeof children === 'function' ? children(checkbox) : checkbox}
    </Container>
  );
};

export default Radio;
