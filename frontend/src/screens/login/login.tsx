import React, { Component } from 'react';

import { Body, Button, CheckBox, Container, Content, Footer, FooterTab, Form, Header, Input, Label, ListItem, Text } from 'native-base';
import { Dimensions, ScrollView } from 'react-native';

import { ItemForm, Logo } from './style';

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
      <Container style={{ backgroundColor: theme.blueGray.main }}>
        <Header androidStatusBarColor={ theme.blueGray.secondary } style={{ height: 0 }} transparent />
        <Content>
          <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
            <Logo source={ require('./../../assets/images/logo-light.png') }/>
            { this.state.mode === MODES.SIGN_IN ? (
              <Form>
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Email</Label>
                  <Input/>
                </ItemForm>
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Password</Label>
                  <Input secureTextEntry={ true }/>
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
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Email</Label>
                  <Input />
                </ItemForm>
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Nick</Label>
                  <Input />
                </ItemForm>
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Password</Label>
                  <Input secureTextEntry={ true }/>
                </ItemForm>
                <ItemForm floatingLabel style={{ paddingBottom: 4 }}>
                  <Label style={{ color: theme.white.main, padding: 10, alignSelf: 'center' }}>Confirm Password</Label>
                  <Input secureTextEntry={ true }/>
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
        </Content>
        <Footer style={{ backgroundColor: 'transparent' }}>
          <FooterTab>
            <Button style={ { backgroundColor: theme.blue.main } } active={ this.state.mode === MODES.SIGN_IN ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_IN, check: false }) }>
              <Text>Sign In</Text>
            </Button>
            <Button style={ { backgroundColor: theme.orange.main } } active={ this.state.mode === MODES.SIGN_UP ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_UP, check: false }) }>
              <Text>Sing Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Login;
