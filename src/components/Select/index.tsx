import React, { ComponentType, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MenuItem from './MenuItem';
import {
  Container,
  Control,
  ValueContainer,
  Value,
  Indicator,
  ArrowIcon,
  MenuWrapper,
  Menu,
} from './styled';

interface ISelectProps {
  value: number | string;
  fieldValueName?: string;
  options: {
    [prop: string]: any;
  }[];
  Value?: ComponentType<{
    data?: {
      [prop: string]: any;
    };
  } & { [prop: string]: any }>
  Option?: ComponentType<{
    data?: {
      [prop: string]: any;
    };
  } & { [prop: string]: any }>;
  onChange: (data?: {
    [prop: string]: any;
  }) => void;
}

export {
  Indicator as SelectIndicator,
  Control as SelectControl,
};

const Select: FC<ISelectProps> = props => {
  const {
    value,
    options,
    fieldValueName,
    Value,
    Option,
    onChange,
    ...otherProps
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);

  const optionsMap = useMemo(() => options.reduce((result, item) => ({
    ...result,
    [item[fieldValueName as string]]: item,
  }), {} as ISelectProps['options'][number]), [options, fieldValueName]);

  const selectedItem = optionsMap[value];

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      // @ts-ignore
      if (ref.current && e.target && ref.current.contains(e.target)) {
        return;
      }

      setIsOpen(false);
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [isOpen]);

  return (
    <Container
      ref={ref}
      {...otherProps}
      onClick={onToggle}
    >
      <Control>
        <ValueContainer>
          {Value && <Value data={selectedItem} />}
        </ValueContainer>
        <Indicator>
          <ArrowIcon name={isOpen ? 'arrowUp' : 'arrowDown'} />
        </Indicator>
      </Control>
      {isOpen && (
        <MenuWrapper>
          <Menu>
            {options.map(data => (
              <MenuItem
                key={data[fieldValueName as string]}
                data={data}
                onChange={onChange}
              >
                {Option && <Option data={data} />}
              </MenuItem>
            ))}
          </Menu>
        </MenuWrapper>
      )}
    </Container>
  );
};

Select.defaultProps = {
  fieldValueName: 'id',
  Value: ({ data }) => <Value>{data ? (data.name || null) : null}</Value>,
  Option: ({ data }) => <Value>{data ? (data.name || null) : null}</Value>,
};

export default Select;
