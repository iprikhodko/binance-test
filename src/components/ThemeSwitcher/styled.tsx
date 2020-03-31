import styled from 'styled-components';
import THEMES from '../../constants/themes';
import Icon from '../Icon';
import BaseRadioButton, { Content, Radio } from '../RadioButton';

export const RadioButton = styled(BaseRadioButton)`
  ${Radio}:checked + ${Content} {
    background: ${THEMES.BACKGROUND_SECONDARY};
    border-color: ${THEMES.BORDER_PRIMARY};
  }
`;

export const LightIcon = styled(Icon).attrs(() => ({ name: 'sun' }))`
  height: 14px;
  width: 14px;
`;

export const DarkIcon = styled(Icon).attrs(() => ({ name: 'moon' }))`
  height: 14px;
  width: 14px;
`;

export const Container = styled.div`
  display: flex;
  
  ${RadioButton} + ${RadioButton} {
    ${Content} {
      border-left: none;
    }
  }
`;
