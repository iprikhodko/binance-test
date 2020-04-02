import styled from 'styled-components';
import THEMES from '../../../constants/themes';
import Icon from '../../Icon';
import BaseSpinner from '../../Spinner';

export const Cell = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

export const HeadCellContainer = styled(Cell)`
  display: flex;
  color: ${THEMES.TEXT_SECONDARY};
  cursor: pointer;
`;

export const HeadCellName = styled(Cell)``;

export const HeadCellSort = styled.div`
  margin-left: 3px;
`;

export const HeadCellSortIcon = styled(Icon)`
  height: 6px;
  width: 8px;
`;

export const BodyCell = styled(Cell)``;

export const FavoriteContainer = styled(BodyCell)`
  cursor: pointer;
  width: 100%;
`;

export const FavoriteIcon = styled(Icon)<{ isFavorite: boolean }>`
  color: ${({ isFavorite }) => isFavorite ? THEMES.ACTIVE_PRIMARY : 'inherit'};
  height: 14px;
  width: 14px;
`;

export const InstrumentName = styled.div``;

export const InstrumentMarginLeverage = styled.div``;

export const ChangeCell = styled(BodyCell)<{
  isUp: boolean;
  isDown: boolean;
}>`
  color: ${({ isUp, isDown }) => {
    if (isUp) {
      return THEMES.UP_PRIMARY;
    }
    
    if (isDown) {
      return THEMES.DOWN_PRIMARY;
    }

    return 'inherit';
  }};
  text-align: right;
`;

export const EmptyRow = styled.div`
  color: ${THEMES.TEXT_SECONDARY};
  padding: 10px;
  text-align: center;
`;

export const RetryButton = styled.button.attrs(() => ({ type: 'button' }))`
  display: inline-block;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SpinnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const Spinner = styled(BaseSpinner)``;

export const Container = styled.div`
  height: 100%;

  .ReactVirtualized__Table__headerRow {
    display: flex;
  }

  .ReactVirtualized__Table__row {
    display: flex;
  }

  .ReactVirtualized__Table__headerRow {
    border-bottom: solid 1px ${THEMES.BORDER_PRIMARY};
  }
  
  .ReactVirtualized__Table__headerColumn, .ReactVirtualized__Table__rowColumn {
    align-items: center;
    display: flex;
    padding: 4px 3px;
    white-space: nowrap;

    &:first-child {
      padding-left: 6px;
    }

    &:last-child {
      padding-right: 6px;
    }

    &:nth-child(4) {
      justify-content: flex-end;
    }
  }
`;
