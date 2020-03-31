import { css } from 'styled-components';
import theme from 'styled-theming';
import APP from './app';
import COLORS from './colors';

const THEMES = {
  BACKGROUND_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BACKGROUND_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.BACKGROUND_PRIMARY,
  }),
  BACKGROUND_SECONDARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BACKGROUND_SECONDARY,
    [APP.THEMES.LIGHT]: COLORS.BACKGROUND_SECONDARY,
  }),
  BACKGROUND_THIRD: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BACKGROUND_THIRD,
    [APP.THEMES.LIGHT]: COLORS.BACKGROUND_THIRD,
  }),
  TEXT_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.TEXT_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.TEXT_PRIMARY,
  }),
  TEXT_SECONDARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.TEXT_SECONDARY,
    [APP.THEMES.LIGHT]: COLORS.TEXT_SECONDARY,
  }),
  BORDER_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BORDER_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.BORDER_PRIMARY,
  }),
  BORDER_SECONDARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BORDER_SECONDARY,
    [APP.THEMES.LIGHT]: COLORS.BORDER_SECONDARY,
  }),
  BORDER_THIRD: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.BORDER_THIRD,
    [APP.THEMES.LIGHT]: COLORS.BORDER_THIRD,
  }),
  ACTIVE_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.ACTIVE_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.ACTIVE_PRIMARY,
  }),
  ACTIVE_SECONDARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.ACTIVE_SECONDARY,
    [APP.THEMES.LIGHT]: COLORS.ACTIVE_SECONDARY,
  }),
  UP_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.UP_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.UP_PRIMARY,
  }),
  DOWN_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.DOWN_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.DOWN_PRIMARY,
  }),
  PLACEHOLDER_PRIMARY: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: COLORS.PLACEHOLDER_PRIMARY,
    [APP.THEMES.LIGHT]: COLORS.PLACEHOLDER_PRIMARY,
  }),
  ROOT: theme(APP.THEME_PROP_NAME, {
    [APP.THEMES.DARK]: css`
      :root {
        --active-primary: #f5bc00;
        --active-secondary: #523e00;
        --border-primary: #333333;
        --border-secondary: #888888;
        --border-third: #888888;
        --text-primary: #d4d4d4;
        --text-secondary: #999999;
        --up-primary: #70a800;
        --down-primary: #ea0070;
        --placeholder-primary: #fff;
        --background-primary: #1d1d1d;
        --background-secondary: #262626;
        --background-third: #616161;
      }
    `,
    [APP.THEMES.LIGHT]: css`
      :root {
        --active-primary: #f0b90b;
        --active-secondary: #fff9e7;
        --border-primary: #d4d4d4;
        --border-secondary: #dddddd;
        --border-third: #888888;
        --text-primary: #333333;
        --text-secondary: #999999;
        --up-primary: #70a800;
        --down-primary: #ea0070;
        --placeholder-primary: #fff;
        --background-primary: #fff;
        --background-secondary: #f7f7f7;
        --background-third: #a1a1a1;
      }
    `,
  })
};

export default THEMES;
