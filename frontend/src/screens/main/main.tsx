import React, { Component } from 'react';

import { Body, Button, Container, Content, Drawer, Header, Icon, Input, Item, Left, Right, Text, Title } from 'native-base';
import { FlatList, StatusBar, View } from 'react-native';

import CardGymkhana from './../../components/cardGymkhana';
import SideBar from './../../components/sidebar';

import { theme } from './../../theme';

interface IStateMain {
  filter?: string;
}

class Main extends Component<any, IStateMain> {
  private drawer: any;

  private constructor(props: any) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  public render() {
    // const { filter } = this.state;
    const cards = [<CardGymkhana />, <CardGymkhana />, <CardGymkhana />, <CardGymkhana />];
    // FIXME: Need put a Interface in Props
    const cardsFilter = cards; // cards.filter(i => i.props.name.toLowerCase().includes(this.state.filter!.toLowerCase()));

    return (
      <Drawer type="overlay" ref={ (ref) => { this.drawer = ref; } } content={ <SideBar /> } onClose={ () => this.drawer._root.close() }>
        <Container>
          <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main, marginTop: StatusBar.currentHeight }}>
            <Left>
              <Button transparent onPress={ () => this.drawer._root.open() }>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>GymkhApp</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="more" />
              </Button>
            </Right>
          </Header>
          <Content style={{ backgroundColor: theme.blue.main }} >
            <View style={{ backgroundColor: theme.blue.main, paddingTop: 8, paddingBottom: 8 }}>
              <Item style={{ width: '80%', alignSelf: 'center' }}>
                <Icon name="ios-search" style={{ color: theme.white.main }} />
                <Input placeholder="Buscar" placeholderTextColor={ theme.white.main } style={{ color: theme.white.main }}/>
                <Button rounded style={{ paddingBottom: 2, paddingTop: 2, backgroundColor: theme.blueGray.main }}>
                  <Text>Buscar</Text>
                </Button>
              </Item>
            </View>
            <FlatList style={{ backgroundColor: theme.white.main }} data={ cardsFilter } renderItem={({ item }: any) => item } />
          </Content>
        </Container>
      </Drawer>
    );
  }
}

export default Main;
