import React, { ComponentProps, FC, useCallback } from 'react';
import styled from 'styled-components';
import THEMES from '../../constants/themes';
import RadioButton from '../RadioButton';
import BaseSelect, { SelectControl, SelectIndicator } from '../Select';

const Value: FC<ComponentProps<typeof RadioButton>> = ({ data, ...otherProps }) => {
  const stopPropagation = useCallback((e: MouseEvent) => e.stopPropagation(), []);

  return (
    <RadioButton {...otherProps} onClick={stopPropagation}>
      {!!data && data.name}
    </RadioButton>
  );
};

const Select = styled(BaseSelect)`
  ${SelectControl} {
    border: none;
  }

  ${SelectIndicator} {
     border: solid 1px ${THEMES.BORDER_PRIMARY};
     border-left: none;
  }
`;

type IRadioButtonSelectProps = ComponentProps<typeof Select> & {
  radioValue?: string | null;
  onRadioChange: ComponentProps<typeof RadioButton>['onChange'];
};

const RadioButtonSelect: FC<IRadioButtonSelectProps> = props => {
  const { name, value, radioValue, onRadioChange, ...otherProps } = props;

  const renderValue = useCallback((props: ComponentProps<ComponentProps<typeof Select>['Value']>) => (
    <Value
      {...props}
      name={name}
      value={value}
      checked={radioValue === value}
      onChange={onRadioChange}
    />
  ), [name, value, radioValue, onRadioChange]);

  return (
    <Select
      {...otherProps}
      value={value}
      Value={renderValue}
    />
  );
};

export default RadioButtonSelect;
