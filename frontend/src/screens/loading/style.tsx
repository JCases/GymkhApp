import styled from 'styled-components/native';

import { Image, Text } from 'react-native';

import { theme } from './../../theme';

export const Logo = styled(Image)`
  width: 280;
  height: 280;
  margin-left: 10;
`;

export const Label = styled(Text)`
  text-align: center;
  font-size: 32;
  line-height: 48;
  margin-top: 40;
  color: ${theme.white.main};
`;
