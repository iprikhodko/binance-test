import styled from 'styled-components';
import THEMES from '../../constants/themes';
import Icon from '../Icon';

export const Container = styled.div`
  background: ${THEMES.BACKGROUND_PRIMARY};
  display: inline-flex;
  flex-direction: column;
  height: 24px;
  position: relative;
`;

export const Control = styled.div`
  border: solid 1px ${THEMES.BORDER_PRIMARY};
  cursor: pointer;
  display: flex;
  height: 100%;

  &:hover {
    background: ${THEMES.BACKGROUND_SECONDARY};
  }
`;

export const ValueContainer = styled.div`
  flex: 1;
`;

export const Value = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  padding: 0 3px;
`;

export const Indicator = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  flex: 0 0 9px;
  padding: 4px 2px;

  &:hover {
    background: ${THEMES.BACKGROUND_SECONDARY};
  }
`;

export const ArrowIcon = styled(Icon)`
  height: 7px;
  width: 9px;
`;

export const MenuWrapper = styled.div`
  height: 0;
  position: relative;
`;

export const Menu = styled.div`
  border: solid 1px ${THEMES.BORDER_PRIMARY};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const MenuItem = styled.div`
  background: ${THEMES.BACKGROUND_PRIMARY};
  padding: 4px 3px;
  width: 100%;

  &:hover {
    cursor: pointer;
    color: ${THEMES.ACTIVE_PRIMARY};
  }
`;
