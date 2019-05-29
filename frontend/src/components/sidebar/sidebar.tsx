import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import { Badge, Container, Content, Icon, Left, List, ListItem, Right, Text } from 'native-base';
import { Dimensions, Image, Platform, View } from 'react-native';

import { theme } from '../../theme';

interface IStateSideBar {
  shadowOffsetWidth?: number;
  shadowRadius?: number;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class SideBar extends Component<any, IStateSideBar> {
  private datas = [{
    name: 'Inicio', route: 'Login', icon: 'home', type:'FontAwesome5', bg: theme.green.main,
  }, {
    name: 'Gymkhanas', route: 'Phase', icon: 'history', type:'FontAwesome5', bg:  theme.blue.main, types: '11',
  }, {
    name: 'Perfil', route: 'MainPhases', icon: 'face-profile', type:'MaterialCommunityIcons', bg:  theme.yellow.main,
  }];

  public constructor(props: any) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  public render() {
    return (
      <Container style={{ backgroundColor: theme.white.main, height: '100%' }}>
        <Content style={{ top: -1 }} >
          <Image source={ require('./../../assets/images/login.png') } style={{ alignSelf: 'stretch', height: deviceHeight / 3.5, width: '100%', position: 'relative', marginBottom: 10 }} />
          <Image source={ require('./../../assets/images/logo-dark.png') } style={{ position: 'absolute', left: Platform.OS === 'android' ? (deviceWidth / 4.4) : (deviceWidth / 2.4), top: Platform.OS === 'android' ? deviceHeight / 22 : deviceHeight / 20, width: 140, height: 140, resizeMode: 'cover' }} />
          <List
            dataArray={ this.datas }
            renderRow={ data =>
              <ListItem button noBorder onPress={ () => this.props.navigation.navigate(data.route) }>
                <Left>
                  <Icon type={data.type} active name={data.icon} style={{ color: theme.blueGray.main, fontSize: 26, width: 30 }} />
                  <Text style={{ fontWeight: Platform.OS === 'ios' ? '500' : '400', fontSize: 16, marginLeft: 20 }}>
                    { data.name }
                  </Text>
                </Left>
                { data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }}>
                      <Text style={{ fontSize: Platform.OS === 'ios' ? 13 : 11, fontWeight: '400', textAlign: 'center', marginTop: Platform.OS === 'android' ? -3 : undefined }}>
                        { `${data.types} Types` }
                      </Text>
                    </Badge>
                  </Right>}
              </ListItem> }
          />
        </Content>
        <View style={{ justifyContent: 'flex-end' }}>
          <ListItem button noBorder onPress={ () => this.props.navigation.navigate('Login') }>
            <Left>
              <Icon active type="FontAwesome5" name="power-off" style={{ color: theme.red.main, fontSize: 26, width: 30 }} />
              <Text style={{ fontWeight: Platform.OS === 'ios' ? '500' : '400', fontSize: 16, marginLeft: 20 }}>
                Cerrar Sesión
              </Text>
            </Left>
          </ListItem>
        </View>
      </Container>
    );
  }
}

export default withNavigation(SideBar);
