import React, { FC, useCallback } from 'react';
import { MenuItem as BaseMenuItem } from './styled';

interface IMenuItemProps {
  data: {
    [prop: string]: any;
  };
  onChange: (data?: {
    [prop: string]: any;
  }) => void;
}

const MenuItem: FC<IMenuItemProps> = props => {
  const { data, onChange: onBaseChange, ...otherProps } = props;
  const onChange = useCallback(() => onBaseChange(data), [data, onBaseChange]);

  return (
    <BaseMenuItem {...otherProps} onClick={onChange} />
  );
};

export default MenuItem;