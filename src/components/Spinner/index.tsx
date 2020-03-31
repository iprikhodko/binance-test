import styled, { keyframes } from 'styled-components';
import THEMES from '../../constants/themes';

const loadKeyframes = keyframes`
  to { transform: rotate(360deg) }
`;

const Spinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: -20px;
  margin-top: -20px;
  border: 2px solid ${THEMES.BORDER_PRIMARY};
  border-radius: 50%;
  border-top-color: ${THEMES.ACTIVE_PRIMARY};
  animation: ${loadKeyframes} 1s ease-in-out infinite;
`;

export default Spinner;
