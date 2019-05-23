import styled from 'styled-components/native';

import { Tab } from 'native-base';
import { TextInput, View } from 'react-native';

/* -- View -- */

export const Content = styled(View)`
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 10%;
`;

/* -- Inputs - */

export const Input = styled(TextInput)`
  width: 80%;

  background-color: white;

  border-radius: 20;
  padding-left: 2%;
  margin: 2%;
`;

/* -- Tabs -- */

export const TabItem = styled(Tab)`
  background-color: transparent;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
