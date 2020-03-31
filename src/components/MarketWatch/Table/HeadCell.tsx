import React, { ComponentProps, FC, useCallback } from 'react';
import MARKET_WATCH from '../utils';
import {
  HeadCellContainer,
  HeadCellName,
  HeadCellSort,
  HeadCellSortIcon,
} from './styled';

type IHeadCellProps = {
  sortBy: string;
  sortOrder?: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT];
  isSortShown: boolean;
  onSort?: (args: { sortBy: string; sortOrder: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT] }) => void;
};

const HeadCell: FC<IHeadCellProps> = props => {
  const { children, sortBy, isSortShown, onSort } = props;
  const sortOrder = props.isSortShown ? props.sortOrder : undefined;
  let iconName: ComponentProps<typeof HeadCellSortIcon>['name'];

  if (props.isSortShown) {
    iconName = props.sortOrder === MARKET_WATCH.SORT.ASC ? 'arrowUp' : 'arrowDown';
  }

  let onClick = useCallback(() => {
    if (!onSort) {
      return;
    }

    let newSortOrder: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT];

    if (!sortOrder || sortOrder === MARKET_WATCH.SORT.DESC) {
      newSortOrder = MARKET_WATCH.SORT.ASC;
    } else {
      newSortOrder = MARKET_WATCH.SORT.DESC;
    }

    onSort({
      sortBy,
      sortOrder: newSortOrder,
    });
  }, [sortBy, sortOrder, onSort]);

  return (
    <HeadCellContainer onClick={onClick}>
      <HeadCellName>
        {children}
      </HeadCellName>
      {isSortShown && (
        <HeadCellSort>
          <HeadCellSortIcon name={iconName} />
        </HeadCellSort>
      )}
    </HeadCellContainer>
  );
};

export default HeadCell;
