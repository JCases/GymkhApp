import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { Body, Button, Footer, Header, Icon, Left, Right, Text, Thumbnail, Title } from 'native-base';
import { Image, View } from 'react-native';

import { theme } from '../../theme';

import { IGymkhana } from '../../shared';

interface IPropsGymkhana {
  gymkhana?: IGymkhana;
  navigation?: NavigationScreenProp<any, any>;
}

interface IStateGymkhana {
  modalVisible?: boolean;
}

class Gymkhana extends Component<IPropsGymkhana, IStateGymkhana> {
  public constructor(props: IPropsGymkhana) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  public render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation!.goBack() }>
              <Icon type="Ionicons" name="ios-arrow-back" />
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
          <Image source={ require('./../../assets/images/login.png') } style={{ height: 240, alignSelf: 'stretch', width: '100%', position: 'relative' }}/>
          <View style={{ backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'row',  flexWrap: 'nowrap', justifyContent: 'flex-start', paddingTop: 12, paddingBottom: 12 }}>
            <Thumbnail source={ require('./../../assets/images/logo-dark.png') } style={{ marginLeft: 14 }} />
            <View style={{ marginLeft: 20, alignSelf: 'center' }}>
              <Text style={{ color: theme.blueGray.secondary }}>NativeBase</Text>
              <Text style={{ color: theme.white.main }}>April 15, 2016</Text>
            </View>
          </View>
          <View style={{ height: '48%', justifyContent: 'space-between' }}>
            <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
              <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit cupiditate ea doloremque cum quibusdam, omnis voluptatibus quia, fuga enim inventore nam deserunt. Adipisci magni eligendi optio temporibus, ipsam totam consectetur.</Text>
            </View>
            <Footer style={{ backgroundColor: 'transparent', marginLeft: 20, marginRight: 20 }}>
              <Left>
                <Button transparent>
                  <Icon style={{ color: theme.blueGray.secondary }} name="ios-people" />
                  <Text style={{ color: theme.blueGray.secondary }}>1,926</Text>
                </Button>
              </Left>
              <Right>
                <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.props.navigation!.navigate('Gymkhana', this.props.gymkhana) }>
                  <Icon type="MaterialIcons" name="add-circle" color={ theme.white.main } />
                  { /* 2 Spaces like Padding */ }
                  <Text style={{ color: theme.white.main }}>Inscribirse  </Text>
                </Button>
              </Right>
            </Footer>
          </View>
        </View>
      </View>
    );
  }
}

export default Gymkhana;
