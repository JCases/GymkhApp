import React, { Component } from 'react';

import { Body, Button, Container, Content, Header, Icon, Left, Title } from 'native-base';
import { FlatList, StatusBar } from 'react-native';

import CardPhase from '../../components/cardPhase';

import { theme } from './../../theme';

import { StatesPhase } from './../../shared';

class MainPhases extends Component<any, any> {
  private constructor(props: any) {
    super(props);
  }

  public render() {
    const cards = [<CardPhase state={ StatesPhase.ACTIVATE }/>, <CardPhase state={ StatesPhase.AWAIT }/>, <CardPhase state={ StatesPhase.COMPLETE }/>];

    return (
      <Container style={{ backgroundColor: theme.white.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation!.goBack() }>
              <Icon type="Ionicons" name="ios-arrow-back"  />
            </Button>
          </Left>
          <Body>
            <Title>Fases</Title>
          </Body>
        </Header>
        <Content>
          <FlatList data={ cards } renderItem={({ item }: any) => item } />
        </Content>
      </Container>
    );
  }
}

export default MainPhases;
