import React, {
  ChangeEvent,
  ComponentProps,
  PureComponent,
  ReactNode,
} from 'react';
import { shallowEqual } from 'react-redux';
import { Trans } from 'react-i18next';
import BigNumber from 'bignumber.js';
import APP from '../../constants/app';
import { CURRENCIES } from '../../constants/currencies';
import { getSortNumbersFn, getSortStrings, loadLocalStorage, saveLocalStorage } from '../../libs/utils';
import Icon from '../Icon';
import SearchField from '../SearchField';
import Table from './Table';
import MARKET_WATCH from './utils';
import {
  Container,
  Header,
  Presets,
  FavoriteRadio,
  MarginRadio,
  SinglePreset,
  PresetsSelect,
  SettingsContainer,
  Search,
  Settings,
  SettingsRadio,
  SettingsLabel,
  Body,
} from './styled';

interface IMarketWatchProps extends Pick<ComponentProps<typeof Table>, 'data'>{
  isFetching: boolean;
  hasError: boolean;
  alts: string[];
  fiat: string[];
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

interface IMarketWatchState {
  group: string;
  category: string;
  alts: string;
  fiat: string;
  search: string;
  sortBy: string;
  sortOrder: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT];
  isVolumeShown: boolean;
  favorites: string[];
}

const ARTIFICIAL_GROUPS = {
  FAVORITE: 'favorite',
  MARGIN: 'margin',
};

class MarketWatch extends PureComponent<IMarketWatchProps, IMarketWatchState> {
  state: IMarketWatchState = {
    group: '',
    category: '',
    search: '',
    alts: APP.ALTS_MARKET_NAME,
    fiat: APP.FIAT_MARKET_NAME,
    sortBy: MARKET_WATCH.COLUMNS.INSTRUMENT_NAME,
    sortOrder: MARKET_WATCH.SORT.ASC,
    isVolumeShown: false,
    favorites: [],
  };

  componentDidMount(): void {
    this.props.onSubscribe();
    this.loadData(true);
  }

  componentDidUpdate(prevProps: IMarketWatchProps, prevState: IMarketWatchState) {
    const { isFetching } = this.props;
    const { isFetching: prevFetching } = prevProps;
    const { search, ...otherState } = this.state;
    const { search: prevSearch, ...prevOtherState } = prevState;

    if (!shallowEqual(otherState, prevOtherState)) {
      const fields = Object.keys(otherState) as (keyof Omit<IMarketWatchState, 'search'>)[];

      const savedData = fields.reduce((result, fieldName) => {
        if (otherState[fieldName] === prevOtherState[fieldName]) {
          return result;
        }

        return {
          ...result,
          [fieldName]: otherState[fieldName],
        };
      }, {});

      this.saveData(savedData);
    }

    if (prevFetching && !isFetching) {
      this.loadData();
    }
  }

  componentWillUnmount(): void {
    this.props.onUnsubscribe();
  }

  loadData = (isInitialized?: boolean) => {
    const { alts, fiat } = this.props;
    let {
      alts: altsValue,
      fiat: fiatValue,
      group = '',
      category = '',
      isVolumeShown = false,
      sortBy = this.state.sortBy,
      sortOrder = this.state.sortOrder,
      favorites = this.state.favorites,
    } = loadLocalStorage<Omit<IMarketWatchState, ''>>(MARKET_WATCH.STORAGE_NAME, {});
    const altsList = [APP.ALTS_MARKET_NAME, ...alts];
    const fiatList = [APP.FIAT_MARKET_NAME, ...fiat];

    if (!isInitialized && !altsList.includes(altsValue)) {
      altsValue = APP.ALTS_MARKET_NAME;
    }

    if (!isInitialized && !fiatList.includes(fiatValue)) {
      fiatValue = APP.FIAT_MARKET_NAME;
    }

    if (!(
      (group === APP.ALTS_MARKET_NAME && altsList.includes(category)) ||
      (group === APP.FIAT_MARKET_NAME && fiatList.includes(category)) ||
      ([CURRENCIES.BTC, CURRENCIES.BNB].includes(group) && [CURRENCIES.BTC, CURRENCIES.BNB].includes(category)) ||
      ([ARTIFICIAL_GROUPS.FAVORITE, ARTIFICIAL_GROUPS.MARGIN].includes(group) || [ARTIFICIAL_GROUPS.FAVORITE, ARTIFICIAL_GROUPS.MARGIN].includes(category))
    )) {
      group = '';
      category = '';
    }

    if (!Object.values(MARKET_WATCH.SORT).includes(sortOrder)) {
      sortOrder = MARKET_WATCH.SORT.ASC;
    }

    this.setState({
      group,
      category,
      alts: altsValue,
      fiat: fiatValue,
      sortBy,
      sortOrder,
      isVolumeShown: !!isVolumeShown,
      favorites,
    });
  };

  saveData = (savedData: Partial<Omit<IMarketWatchState, 'search'>>) => {
    const loadedData = loadLocalStorage<Omit<IMarketWatchState, ''>>(MARKET_WATCH.STORAGE_NAME, {});

    saveLocalStorage(MARKET_WATCH.STORAGE_NAME, {
      ...loadedData,
      ...savedData,
    });
  };

  changeGroup = (args: {
    group: string;
    category: string;
  }) => this.setState(args);

  onRadioChange = (e: ChangeEvent<HTMLInputElement>, group: string) => this.changeGroup({
    group,
    category: e.target.value,
  });

  onFavoriteChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, ARTIFICIAL_GROUPS.FAVORITE);

  onMarginChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, ARTIFICIAL_GROUPS.FAVORITE);

  onBtcChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, CURRENCIES.BTC);

  onBnbChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, CURRENCIES.BNB);

  onAltsRadioChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, APP.ALTS_MARKET_NAME);

  onFiatRadioChange = (e: ChangeEvent<HTMLInputElement>) =>
    this.onRadioChange(e, APP.FIAT_MARKET_NAME);

  onAltsChange = ({ id: category }: { id: string; name: string }) => {
    this.setState({ alts: category });
    this.changeGroup({
      group: APP.ALTS_MARKET_NAME,
      category,
    });
  };

  onFiatChange = ({ id: category }: { id: string; name: string }) => {
    this.setState({ fiat: category });
    this.changeGroup({
      group: APP.FIAT_MARKET_NAME,
      category,
    });
  };

  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({
    search: e.target.value,
  });

  onColumnChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({
    isVolumeShown: e.target.value === MARKET_WATCH.COLUMNS.VOLUME,
  });

  onFavoriteToggle = (instrumentName: string) => {
    const { favorites } = this.state;
    const index = favorites.indexOf(instrumentName);
    let newFavorites = [];

    if (index === -1) {
      newFavorites = [...favorites, instrumentName];
    } else {
      newFavorites = [
        ...favorites.slice(0, index),
        ...favorites.slice(index + 1),
      ];
    }

    this.setState({
      favorites: newFavorites,
    });
  };

  onSort = (args: {
    sortBy: string;
    sortOrder: typeof MARKET_WATCH.SORT[keyof typeof MARKET_WATCH.SORT];
  }) => this.setState(args);

  // ToDo add memoization
  getPreparedData = () => {
    const { data, isFetching, hasError } = this.props;

    if (isFetching || hasError) {
      return [];
    }

    const {
      favorites,
      search,
      group,
      category,
      sortBy,
      sortOrder,
    } = this.state;
    const preparedSearch = (search || '').trim().toLowerCase();

    return data.filter(instrument => {
      const isSearch = !preparedSearch || instrument.instrumentName.toLowerCase().includes(preparedSearch);
      let isPreset;

      switch (group) {
        case ARTIFICIAL_GROUPS.FAVORITE: {
          isPreset = favorites.includes(instrument.rawInstrumentName);
          break;
        }
        case CURRENCIES.BNB: {
          isPreset = instrument.group === CURRENCIES.BNB && instrument.subGroup === CURRENCIES.BNB;
          break;
        }
        case CURRENCIES.BTC: {
          isPreset = instrument.group === CURRENCIES.BTC && instrument.subGroup === CURRENCIES.BTC;
          break;
        }
        case APP.ALTS_MARKET_NAME: {
          const isGroup = instrument.group === APP.ALTS_MARKET_NAME;
          let isSubGroup = false;

          if (category === APP.ALTS_MARKET_NAME) {
            isSubGroup = isGroup;
          } else {
            isSubGroup = instrument.subGroup === category;
          }

          isPreset = isGroup && isSubGroup;
          break;
        }
        case APP.FIAT_MARKET_NAME: {
          const isGroup = instrument.group === APP.FIAT_MARKET_NAME;
          let isSubGroup = false;

          if (category === APP.FIAT_MARKET_NAME) {
            isSubGroup = isGroup;
          } else {
            isSubGroup = instrument.subGroup === category;
          }

          isPreset = isGroup && isSubGroup;
          break;
        }
        default: {
          isPreset = true;
        }
      }

      return isSearch && isPreset;
    }).sort((instrument1, instrument2) => {
      const preparedSort = sortBy as keyof typeof instrument1;
      const preparedSortOrder = sortOrder === MARKET_WATCH.SORT.ASC ? 1 : -1;
      const v1 = instrument1[preparedSort];
      const v2 = instrument2[preparedSort];

      if (sortBy === MARKET_WATCH.COLUMNS.INSTRUMENT_NAME) {
        return getSortStrings(preparedSortOrder)(v1 as string, v2 as string);
      }

      if ([MARKET_WATCH.COLUMNS.LAST_PRICE, MARKET_WATCH.COLUMNS.CHANGE, MARKET_WATCH.COLUMNS.VOLUME].includes(sortBy as any)) {
        return getSortNumbersFn(preparedSortOrder)(v1 as BigNumber.Value, v2 as BigNumber.Value);
      }

      return getSortNumbersFn(1)(instrument1[MARKET_WATCH.COLUMNS.LAST_PRICE], instrument2[MARKET_WATCH.COLUMNS.LAST_PRICE]);
    });
  };

  // ToDo add memoization
  getAltsOptions = (alts: string[]) => {
    const options = alts.map((instrumentName) => ({
      id: instrumentName,
      name: instrumentName,
    }));

    return [{
      id: APP.ALTS_MARKET_NAME,
      name: 'ALTS',
    }, ...options];
  };

  // ToDo add memoization
  getFiatOptions = (fiat: string[]) => {
    const options = fiat.map((instrumentName) => ({
      id: instrumentName,
      name: instrumentName,
    }));

    return [{
      id: APP.FIAT_MARKET_NAME,
      name: 'FIAT',
    }, ...options];
  };

  render() {
    const { isFetching, hasError, onSubscribe } = this.props;
    const {
      search,
      category,
      alts: altsValue,
      fiat: fiatValue,
      sortBy,
      sortOrder,
      isVolumeShown,
      favorites,
    } = this.state;
    const data = this.getPreparedData();
    const altsOptions = this.getAltsOptions(this.props.alts);
    const fiatOptions = this.getFiatOptions(this.props.fiat);

    return (
      <Container>
        <Header>
          <Presets>
            <FavoriteRadio
              name="presets"
              value={ARTIFICIAL_GROUPS.FAVORITE}
              checked={category === ARTIFICIAL_GROUPS.FAVORITE}
              onChange={this.onFavoriteChange}
            >
              <Icon name="starFilled" />
            </FavoriteRadio>
            <MarginRadio
              name="presets"
              value={ARTIFICIAL_GROUPS.MARGIN}
              checked={category === ARTIFICIAL_GROUPS.MARGIN}
              onChange={this.onMarginChange}
            >
              M
            </MarginRadio>
            <SinglePreset
              name="presets"
              value={CURRENCIES.BNB}
              checked={category === CURRENCIES.BNB}
              onChange={this.onBnbChange}
            >
              {CURRENCIES.BNB}
            </SinglePreset>
            <SinglePreset
              name="presets"
              value={CURRENCIES.BTC}
              checked={category === CURRENCIES.BTC}
              onChange={this.onBtcChange}
            >
              {CURRENCIES.BTC}
            </SinglePreset>
            <PresetsSelect
              name="presets"
              value={altsValue}
              radioValue={category}
              options={altsOptions}
              onChange={this.onAltsChange}
              onRadioChange={this.onAltsRadioChange}
            />
            <PresetsSelect
              name="presets"
              value={fiatValue}
              radioValue={category}
              options={fiatOptions}
              onChange={this.onFiatChange}
              onRadioChange={this.onFiatRadioChange}
            />
          </Presets>
          <SettingsContainer>
            <Search>
              <SearchField
                value={search}
                onChange={this.onSearchChange}
              />
            </Search>
            <Settings>
              <SettingsRadio
                name="column"
                value={MARKET_WATCH.COLUMNS.CHANGE}
                checked={!isVolumeShown}
                onChange={this.onColumnChange}
              >
                {(checkbox: ReactNode) => (
                  <>
                    {checkbox}
                    <SettingsLabel>
                      <Trans>Change</Trans>
                    </SettingsLabel>
                  </>
                )}
              </SettingsRadio>
              <SettingsRadio
                name="column"
                value={MARKET_WATCH.COLUMNS.VOLUME}
                checked={isVolumeShown}
                onChange={this.onColumnChange}
              >
                {(checkbox: ReactNode) => (
                  <>
                    {checkbox}
                    <SettingsLabel>
                      <Trans>Volume</Trans>
                    </SettingsLabel>
                  </>
                )}
              </SettingsRadio>
            </Settings>
          </SettingsContainer>
        </Header>
        <Body>
          <Table
            data={data}
            isFetching={isFetching}
            hasError={hasError}
            onFetch={onSubscribe}
            favorites={favorites}
            isVolumeShown={isVolumeShown}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={this.onSort}
            onFavoriteToggle={this.onFavoriteToggle}
          />
        </Body>
      </Container>
    );
  }
}

export default MarketWatch;
