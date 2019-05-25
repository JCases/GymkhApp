import styled from 'styled-components/native';

import { Item } from 'native-base';
import { Image } from 'react-native';

export const ItemForm = styled(Item)`
  margin-left: 40;
  margin-right: 40;
  background-color: transparent;
  border-bottom-color: white;
`;

export const Logo = styled(Image)`
  width: 140;
  height: 140;
  align-self: center;
  margin-top: 20;
`;
