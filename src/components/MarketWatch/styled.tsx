import styled from 'styled-components';
import THEMES from '../../constants/themes';
import Radio from '../Radio';
import RadioButton from '../RadioButton';
import RadioButtonSelect from '../RadioButtonSelect';

export const Container = styled.div`
  border: solid 1px ${THEMES.BORDER_PRIMARY};
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 270px;
`;

export const Header = styled.div``;

export const Presets = styled.div`
  background: ${THEMES.BACKGROUND_SECONDARY};
  display: flex;
  padding: 4px;

  & > * + * {
    margin-left: 2px;
  } 
`;

export const FavoriteRadio = styled(RadioButton)`
  flex: 0 0 26px;
`;

export const MarginRadio = styled(RadioButton)`
  flex: 0 0 26px;
`;

export const SinglePreset = styled(RadioButton)``;

export const PresetsSelect = styled(RadioButtonSelect)`
  flex: 1;
`;

export const SettingsContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 4px;
`;

export const Search = styled.div``;

export const SettingsRadio = styled(Radio)`
  align-items: center;
  display: inline-flex;
`;

export const Settings = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-left: 8px;

  ${SettingsRadio} + ${SettingsRadio} {
    margin-left: 8px;
  }
`;

export const SettingsLabel = styled.div`
  margin-left: 4px;
  white-space: nowrap;
`;

export const Body = styled.div`
  flex: 1;
`;
