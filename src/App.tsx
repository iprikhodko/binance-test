import React, { FC, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { Trans } from 'react-i18next';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from './components/GlobalStyle';
import MARKET_WATCH from './components/MarketWatch/utils';
import APP from './constants/app';
import LanguageSelectContainer from './containers/LanguageSelect';
import MarketWatchContainer from './containers/MarketWatch';
import ThemeSwitcherContainer from './containers/ThemeSwitcher';
import { IState } from './redux/reducers';
import { imitateServerClosing } from './redux/reducers/streams/actions';

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  padding: 30px;
`;

const Settings = styled.div`
  margin-right: 50px;
`;

const SettingsItem = styled.div`
  align-items: center;
  display: flex;
  
  & + & {
    margin-top: 10px;
  }
`;

const SettingsLabel = styled.div`
  margin-right: 5px;
`;

const SettingsValue = styled.div``;

const App: FC<{ theme: string; disconnect: () => void }> = props => {
  const { theme, disconnect } = props;
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const onComponentToggle = useCallback(() => setIsHidden(prevIsHidden => !prevIsHidden), []);

  return (
    <ThemeProvider theme={{ [APP.THEME_PROP_NAME]: theme } as { theme: typeof APP.THEMES[keyof typeof APP.THEMES] }}>
      <Container>
        <GlobalStyle />
        {!isHidden && <MarketWatchContainer />}
        <Settings>
          <SettingsItem>
            <SettingsLabel>
              <Trans>Change theme</Trans>
            </SettingsLabel>
            <SettingsValue>
              <ThemeSwitcherContainer />
            </SettingsValue>
          </SettingsItem>
          <SettingsItem>
            <SettingsLabel>
              <Trans>Change language</Trans>
            </SettingsLabel>
            <SettingsValue>
              <LanguageSelectContainer />
            </SettingsValue>
          </SettingsItem>
          <SettingsItem>
            <button onClick={disconnect}>
              <Trans>Imitate disconnection</Trans>
            </button>
          </SettingsItem>
          <SettingsItem>
            <button onClick={onComponentToggle}>
              {isHidden ?
                <Trans>Show component</Trans> :
                <Trans>Hide component</Trans>}
            </button>
          </SettingsItem>
        </Settings>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState) => ({
  theme: state.ui.theme,
  language: state.ui.language,
});

const mapDispatchToProps = {
  disconnect: () => imitateServerClosing({ stream: MARKET_WATCH.STREAM_NAME }),
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
