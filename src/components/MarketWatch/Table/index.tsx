import React, { ComponentProps, PureComponent, ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { Table as BaseTable, AutoSizer, Column, TableCellRenderer } from 'react-virtualized';
import BigNumber from 'bignumber.js';
import { getFormattedNumber } from '../../../libs/utils';
import MARKET_WATCH from '../utils';
import FavoriteCell from './FavoriteCell';
import HeadCell from './HeadCell';
import {
  Container,
  EmptyRow,
  BodyCell,
  InstrumentName,
  InstrumentMarginLeverage,
  ChangeCell,
  SpinnerWrapper,
  Spinner,
} from './styled';

type IDataItem = {
  isFavorite: boolean;
  rawInstrumentName: string;
  instrumentName: string;
  lastPrice: string;
  volume: string;
  change: string;
  group: string;
  subGroup: string;
}

interface IMarketWatchTableProps {
  data: IDataItem[];
  favorites: string[];
  isVolumeShown: boolean;
  sortBy?: string;
  sortOrder: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT];
  isFetching: boolean;
  onSort: ComponentProps<typeof HeadCell>['onSort'];
  onFavoriteToggle: ComponentProps<typeof FavoriteCell>['onToggle'];
}

class MarketWatchTable extends PureComponent<IMarketWatchTableProps> {
  renderFavoriteCell: TableCellRenderer = ({ rowData }: { rowData: IDataItem }) => {
    const { favorites } = this.props;

    return (
      <FavoriteCell
        name={rowData.rawInstrumentName}
        isFavorite={favorites.includes(rowData.rawInstrumentName)}
        onToggle={this.props.onFavoriteToggle}
      />
    );
  };

  renderInstrumentNameCell: TableCellRenderer = ({ rowData }: { rowData: IDataItem }) => {
    return (
      <BodyCell>
        <InstrumentName>
          {rowData.instrumentName}
        </InstrumentName>
        <InstrumentMarginLeverage />
      </BodyCell>
    );
  };

  renderLastPriceCell: TableCellRenderer = ({ rowData }: { rowData: IDataItem }) => {
    return (
      <BodyCell>
        {rowData.lastPrice}
      </BodyCell>
    );
  };

  renderChangeCell: TableCellRenderer = ({ rowData }: { rowData: IDataItem }) => {
    const preparedValue = new BigNumber(rowData.change);
    const isUp = preparedValue.gt(0);
    const isDown = preparedValue.lt(0);

    return (
      <ChangeCell
        isUp={isUp}
        isDown={isDown}
      >
        {preparedValue.toFixed(2)}%
      </ChangeCell>
    );
  };

  renderVolumeCell: TableCellRenderer = ({ rowData }: { rowData: IDataItem }) => {
    return (
      <BodyCell>
        {getFormattedNumber(new BigNumber(rowData.volume).toFixed(0))}
      </BodyCell>
    );
  };

  rowGetter = ({ index }: { index: number }) => this.props.data[index];

  noRowsRenderer = () => {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      );
    }

    return (
      <EmptyRow>
        <Trans>
          No symbols found
        </Trans>
      </EmptyRow>
    );
  };

  getColumns = ({ isVolumeShown }: { isVolumeShown: boolean }): {
    dataKey: string;
    width: number;
    header?: ReactNode;
    render: TableCellRenderer;
    isHidden?: boolean;
  }[] => [{
    dataKey: MARKET_WATCH.COLUMNS.FAVORITE,
    width: 30,
    render: this.renderFavoriteCell,
  }, {
    dataKey: MARKET_WATCH.COLUMNS.INSTRUMENT_NAME,
    width: 100,
    render: this.renderInstrumentNameCell,
    header: <Trans>Symbol</Trans>,
  }, {
    dataKey: MARKET_WATCH.COLUMNS.LAST_PRICE,
    width: 100,
    render: this.renderLastPriceCell,
    header: <Trans>Last price</Trans>,
  }, {
    dataKey: MARKET_WATCH.COLUMNS.VOLUME,
    width: 100,
    render: this.renderVolumeCell,
    header: <Trans>Volume</Trans>,
    isHidden: !isVolumeShown,
  }, {
    dataKey: MARKET_WATCH.COLUMNS.CHANGE,
    width: 100,
    render: this.renderChangeCell,
    header: <Trans>Change</Trans>,
    isHidden: isVolumeShown,
  }];

  render() {
    const { data, isVolumeShown, sortBy, sortOrder, onSort } = this.props;

    const columns = this.getColumns({ isVolumeShown });

    return (
      <Container>
        <AutoSizer>
          {({ width, height }) => (
            <BaseTable
              headerHeight={20}
              width={width}
              height={height}
              rowCount={data.length}
              rowHeight={20}
              rowGetter={this.rowGetter}
              noRowsRenderer={this.noRowsRenderer}
            >
              {columns.map(column => {
                const { render, header, isHidden, ...otherColumnProps } = column;
                let label;

                if (isHidden) {
                  return null;
                }

                if (header) {
                  const headerProps: ComponentProps<typeof HeadCell> = {
                    sortBy: column.dataKey,
                    isSortShown: false,
                    onSort,
                  };

                  if (sortBy === column.dataKey) {
                    headerProps.isSortShown = true;
                    headerProps.sortOrder = sortOrder;
                  }

                  label = (
                    <HeadCell {...headerProps}>
                      {header}
                    </HeadCell>
                  );
                }

                return (
                  <Column
                    key={otherColumnProps.dataKey}
                    {...otherColumnProps}
                    label={label}
                    cellRenderer={render}
                  />
                );
              })}
            </BaseTable>
          )}
        </AutoSizer>
      </Container>
    );
  }
}

export default MarketWatchTable;