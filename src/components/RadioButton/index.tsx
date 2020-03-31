import React, { ComponentProps, FC } from 'react';
import styled from 'styled-components';
import THEMES from '../../constants/themes';

export const Radio = styled.input.attrs(() => ({ type: 'radio' }))`
  height: 0;
  opacity: 0;
  padding: 0;
  pointer-events: none;
  position: absolute;
  width: 0;
`;

export const Content = styled.div`
  align-items: center;
  border: solid 1px ${THEMES.BORDER_PRIMARY};
  background: ${THEMES.BACKGROUND_PRIMARY};
  display: inline-flex;
  justify-content: center;
  height: 100%;
  padding: 4px 5px;
  width: 100%;
`;

const Container = styled.label`
  cursor: pointer;
  height: 24px;
  position: relative;

  ${Radio}:checked + ${Content} {
    background: ${THEMES.ACTIVE_SECONDARY};
    border-color: ${THEMES.ACTIVE_PRIMARY};
    color: ${THEMES.ACTIVE_PRIMARY};
  }

  ${Radio}:not(:checked) + ${Content}:hover {
    background: ${THEMES.BACKGROUND_SECONDARY};
  }
`;

type IRadioButtonProps = ComponentProps<typeof Container> &
  Pick<ComponentProps<typeof Radio>, 'name' | 'value' | 'onChange'> &
  Partial<Pick<ComponentProps<typeof Radio>, 'checked'>>;

const RadioButton: FC<IRadioButtonProps> = props => {
  const {
    children,
    name,
    value,
    checked,
    onChange,
    ...otherProps
  } = props;

  return (
    <Container {...otherProps}>
      <Radio
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default RadioButton;
