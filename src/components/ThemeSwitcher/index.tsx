import React, { ChangeEvent, FC, useCallback } from 'react';
import APP from '../../constants/app';
import {
  Container,
  RadioButton,
  LightIcon,
  DarkIcon,
} from './styled';

interface IThemeSwitcherProps {
  theme: typeof APP.THEMES[keyof typeof APP.THEMES];
  onThemeChange: (theme: typeof APP.THEMES[keyof typeof APP.THEMES]) => void;
}

const ThemeSwitcher: FC<IThemeSwitcherProps> = props => {
  const { theme, onThemeChange } = props;
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => onThemeChange(e.target.value as typeof APP.THEMES[keyof typeof APP.THEMES]), [onThemeChange]);

  return (
    <Container>
      <RadioButton
        name="theme"
        value={APP.THEMES.LIGHT}
        checked={theme === APP.THEMES.LIGHT}
        onChange={onChange}
      >
        <LightIcon />
      </RadioButton>
      <RadioButton
        name="theme"
        value={APP.THEMES.DARK}
        checked={theme === APP.THEMES.DARK}
        onChange={onChange}
      >
        <DarkIcon />
      </RadioButton>
    </Container>
  );
};

export default ThemeSwitcher;