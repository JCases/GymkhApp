import React, { Component } from 'react';

import { Body, Button, CheckBox, Footer, FooterTab, Form, Input, Label, ListItem, Text } from 'native-base';
import { Dimensions, ScrollView, View } from 'react-native';

import { ItemForm } from './style';

import { theme } from './../../theme';

enum MODES {
  SIGN_IN = 'SIGN IN',
  SIGN_UP = 'SIGN UP',
}

interface IPropsLogin {
  isAuth: boolean;
  // signIn: (user: User) => void;
}

interface IStateLogin {
  email: string;
  password: string;
  passwordC?: string;
  nick?: string;
  check: boolean;
  mode: MODES;
}

class Login extends Component<IPropsLogin, IStateLogin> {
  private constructor(props: IPropsLogin) {
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
      <View style={ { width: '100%', height: '100%' } }>
        <ScrollView contentContainerStyle={{ justifyContent: 'flex-end', height: Dimensions.get('window').height - 120, width: Dimensions.get('window').width }} keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
          { this.state.mode === MODES.SIGN_IN ? (
            <Form style={{ marginBottom: 10 }}>
              <ItemForm floatingLabel>
                <Label>Email</Label>
                <Input/>
              </ItemForm>
              <ItemForm floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={ true }/>
              </ItemForm>
              <ListItem style={{  marginLeft: 40, marginRight: 40, marginTop: 20, borderBottomColor: 'transparent' }}>
                <CheckBox color={ theme.blue.main } checked={ this.state.check } onPress={ () => this.setState({ check: !this.state.check }) } />
                <Body>
                  <Text>Mantener sesión iniciada</Text>
                </Body>
              </ListItem>
            </Form>
          ) : (
            <Form style={{ marginBottom: 10 }}>
              <ItemForm floatingLabel>
                <Label>Email</Label>
                <Input />
              </ItemForm>
              <ItemForm floatingLabel>
                <Label>Nick</Label>
                <Input />
              </ItemForm>
              <ItemForm floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry={ true }/>
              </ItemForm>
              <ItemForm floatingLabel>
                <Label>Confirm Password</Label>
                <Input secureTextEntry={ true }/>
              </ItemForm>
              <ListItem style={{  marginLeft: 40, marginRight: 40, marginTop: 20, borderBottomColor: 'transparent' }}>
                <CheckBox color={ theme.blue.main } checked={ this.state.check } onPress={ () => this.setState({ check: !this.state.check }) } />
                <Body>
                  <Text>Aceptar Terminos y Condiciones</Text>
                </Body>
              </ListItem>
            </Form>
          ) }
          <Button style={ { ...buttonColor, marginTop: 20, width: '80%', alignSelf: 'center' } } large rounded>
            <Text style={ { fontSize: 14,  width: '100%', textAlign: 'center' } }>{ this.state.mode }</Text>
          </Button>
        </ScrollView>
        <Footer style={{ marginTop: 20 }}>
          <FooterTab>
            <Button style={ { backgroundColor: theme.blue.main } } active={ this.state.mode === MODES.SIGN_IN ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_IN, check: false }) }>
              <Text>Sign In</Text>
            </Button>
            <Button style={ { backgroundColor: theme.orange.main } } active={ this.state.mode === MODES.SIGN_UP ? true : false } onPress={ () => this.setState({ mode: MODES.SIGN_UP, check: false }) }>
              <Text>Sing Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      </View>
    );
  }
}

export default Login;
