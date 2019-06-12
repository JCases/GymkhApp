import React, { Component } from 'react';

import { Body, Button, CheckBox, Container, Content, Footer, FooterTab, Form, Header, Input, Label, ListItem, Text } from 'native-base';
import { Image, ScrollView, StatusBar, View } from 'react-native';

import { ItemForm } from './style';

import { theme } from './../../theme';

enum MODES {
  SIGN_IN = 'SIGN IN',
  SIGN_UP = 'SIGN UP',
}

interface IStateLogin {
  email: string;
  password: string;
  passwordC?: string;
  nick?: string;
  check: boolean;
  mode: MODES;
}

class Login extends Component<any, IStateLogin> {
  private constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      check: false,
      mode: MODES.SIGN_IN,
    };
  }

  public render() {
    const buttonColor = this.state.mode === MODES.SIGN_IN ? { backgroundColor: theme.blue.main } : { backgroundColor: theme.orange.main };
    return (
      <Container style={{ backgroundColor: theme.blueGray.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blueGray.secondary } style={{ height: 0 }} transparent />
        <Content>
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
              <Image source={ require('./../../assets/images/logo-light.png') } style={{ width: 140, height: 140, alignSelf: 'center', marginTop: 20 }} />
              { this.state.mode === MODES.SIGN_IN ? (
                <Form>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Email</Label>
                    <Input style={{ color: theme.white.main }} value={ this.state.email } onChangeText={ (text) => this.setState({ email: text }) }/>
                  </ItemForm>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Password</Label>
                    <Input secureTextEntry={ true } style={{ color: theme.white.main }} value={ this.state.password } onChangeText={ (text) => this.setState({ password: text }) }/>
                  </ItemForm>
                  <ListItem style={{  marginLeft: 40, marginRight: 40, marginTop: 14, borderBottomColor: 'transparent' }}>
                    <CheckBox color={ theme.blue.main } checked={ this.state.check } onPress={ () => this.setState({ check: !this.state.check }) } />
                    <Body>
                      <Text style={{ color: theme.white.main }}>Mantener sesión iniciada</Text>
                    </Body>
                  </ListItem>
                </Form>
              ) : (
                <Form>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Email</Label>
                    <Input style={{ color: theme.white.main }} value={ this.state.email } onChangeText={ (text) => this.setState({ email: text }) } />
                  </ItemForm>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Nick</Label>
                    <Input style={{ color: theme.white.main }} value={ this.state.nick } onChangeText={ (text) => this.setState({ nick: text }) } />
                  </ItemForm>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Password</Label>
                    <Input secureTextEntry={ true } style={{ color: theme.white.main }} value={ this.state.password } onChangeText={ (text) => this.setState({ password: text }) } />
                  </ItemForm>
                  <ItemForm floatingLabel>
                    <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Confirm Password</Label>
                    <Input secureTextEntry={ true } style={{ color: theme.white.main }} value={ this.state.passwordC } onChangeText={ (text) => this.setState({ passwordC: text }) } />
                  </ItemForm>
                  <ListItem style={{  marginLeft: 40, marginRight: 40, marginTop: 14, borderBottomColor: 'transparent' }}>
                    <CheckBox color={ buttonColor.backgroundColor } checked={ this.state.check } onPress={ () => this.setState({ check: !this.state.check }) } />
                    <Body>
                      <Text style={{ color: theme.white.main }}>Aceptar Términos y Condiciones</Text>
                    </Body>
                  </ListItem>
                </Form>
              ) }
              <Button style={ { ...buttonColor, width: '80%', alignSelf: 'center', marginTop: 4 } } large rounded onPress={ () => this.props.navigation.navigate('Main') }>
                <Text style={ { fontSize: 14,  width: '100%', textAlign: 'center' } }>{ this.state.mode }</Text>
              </Button>
            </ScrollView>
          </View>
        </Content>
        <Footer style={{ backgroundColor: 'transparent' }}>
          <FooterTab>
            <Button style={ { backgroundColor: theme.blue.main } } active={ this.state.mode === MODES.SIGN_IN ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_IN, check: false, email: '', password: '', nick: '', passwordC: '' }) }>
              <Text>Sign In</Text>
            </Button>
            <Button style={ { backgroundColor: theme.orange.main } } active={ this.state.mode === MODES.SIGN_UP ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_UP, check: false, email: '', password: '', nick: '', passwordC: '' }) }>
              <Text>Sing Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Login;
