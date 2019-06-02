import React, { Component } from 'react';

import { Button, Header, Icon, Text } from 'native-base';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Content } from './../../style';
import { theme } from './../../theme';

class Loading extends Component<any, any> {
  private constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <LinearGradient colors={ [theme.blueGray.main, theme.blueGray.secondary] } style={{ width: '100%', height: '100%' }}>
        <Header androidStatusBarColor={ theme.blueGray.secondary } style={{ height: 0 }} transparent />
        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Content>
            <Image source={ require('./../../assets/images/logo-light.png') } style={{ width: 260, height: 260 }} />
            <Text style={{ textAlign: 'center', fontSize: 32, lineHeight: 48, marginTop: 60, color: theme.white.main }}>
              Play With Friends{'\n'}Win Prizes
            </Text>
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
