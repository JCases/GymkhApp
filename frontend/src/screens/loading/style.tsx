import styled from 'styled-components/native';

import { Image, Text } from 'react-native';

import { theme } from './../../theme';

export const Logo = styled(Image)`
  width: 260;
  height: 260;
`;

export const Label = styled(Text)`
  text-align: center;
  font-size: 32;
  line-height: 48;
  margin-top: 60;
  color: ${theme.white.main};
`;
