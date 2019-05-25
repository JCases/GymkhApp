import React, { Component } from 'react';

import { Button, Header, Icon, Text } from 'native-base';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Label, Logo } from './style';

import { Content } from './../../style';
import { theme } from './../../theme';

class Loading extends Component<any, any> {
  private constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <LinearGradient colors={ [theme.blueGray.main, theme.blueGray.secondary] } style={{ width: '100%', height: '100%' }}>
        <Header androidStatusBarColor={ theme.blueGray.secondary } style={{ height: 0 }} transparent />
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Content>
            <Logo source={ require('./../../assets/images/logo-light.png') }/>
            <Label>
              Play With Friends{'\n'}Win Prizes
            </Label>
          </Content>
          <Content>
            <Button onPress={ () => this.props.navigation.navigate('Login') } large rounded style={ { backgroundColor: theme.violet.main, alignSelf: 'center' } }>
              {/* Empty Text for Paddings */}
              <Text>        </Text>
              <Icon type="AntDesign" name="forward" style={ { fontSize: 32, color: theme.white.main } } />
              <Text>        </Text>
            </Button>
          </Content>
        </View>
      </LinearGradient>
    );
  }
}

export default Loading;
