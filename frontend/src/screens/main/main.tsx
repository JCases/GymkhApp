import React, { Component } from 'react';

import { Body, Button, Drawer, Header, Icon, Input, Item, Left, Right, Text, Title } from 'native-base';
import { ScrollView, View } from 'react-native';

import SideBar from './../../components/sidebar';

import { theme } from './../../theme';

class Main extends Component<any, any> {
  private drawer: any;

  private constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Drawer type="displace" ref={ (ref) => { this.drawer = ref; } } content={ <SideBar /> } onClose={ () => this.drawer._root.close() }>
        <View style={{ height: '100%', width: '100%' }}>
          <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
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
          <View>
            <View style={{ backgroundColor: theme.blue.main, paddingTop: 8, paddingBottom: 8 }}>
              <Item style={{ width: '80%', alignSelf: 'center' }}>
                <Icon name="ios-search" style={{ color: theme.white.main }} />
                <Input placeholder="Buscar" placeholderTextColor={ theme.white.main } style={{ color: theme.white.main }}/>
                <Button style={{ paddingBottom: 2, paddingTop: 2, backgroundColor: theme.blueGray.main }}>
                  <Text>Buscar</Text>
                </Button>
              </Item>
            </View>
            <ScrollView>
              { /* CODE HERE */ }
            </ScrollView>
          </View>
        </View>
      </Drawer>
    );
  }
}

export default Main;
