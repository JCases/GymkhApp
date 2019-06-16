import React, { Component } from 'react';
import Dialog from 'react-native-dialog';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Body, Button, CheckBox, Container, Content, Footer, FooterTab, Form, Header, Input, Label, ListItem, Text } from 'native-base';
import { Alert, Image, ScrollView, StatusBar, View } from 'react-native';

import { ItemForm } from './style';

import { IUser } from '../../shared';
import { theme } from './../../theme';

import { register, rehydrate, signIn } from '../../actions/users';

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
  city?: string;
  visible: boolean;
}

interface IPropsLogin {
  rehydrate?: () => void;
  signIn?: (email: string, password: string) => IUser;
  register?: (email: string, password: string, nick: string, city: string) => IUser;

  navigation: NavigationScreenProp<any, any>;
}

class Login extends Component<IPropsLogin, IStateLogin> {
  public constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordC: '',
      nick: '',
      check: false,
      mode: MODES.SIGN_IN,
      city: '',
      visible: false,
    };
  }

  public render() {
    const buttonColor = this.state.mode === MODES.SIGN_IN ? { backgroundColor: theme.blue.main } : { backgroundColor: theme.orange.main };
    return (
      <Container style={{ backgroundColor: theme.blueGray.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blueGray.secondary } style={{ height: 0 }} transparent />
        <Content>
        <View>
          <Dialog.Container visible={ this.state.visible }>
            <Dialog.Title>Localización para GymkhApp</Dialog.Title>
            <Dialog.Description>¿En que ciudad vives?</Dialog.Description>
            <Dialog.Input label="Ciudad" onChangeText={ (text) => this.setState({ city: text.toLowerCase() })}/>
            <Dialog.Button label="Aceptar" onPress={ () => this.setCity() }/>
          </Dialog.Container>
        </View>
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
              <Button style={ { ...buttonColor, width: '80%', alignSelf: 'center', marginTop: 4 } } large rounded onPress={ () => this.onClick() }>
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
              <Text>Sign Up</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  private async setCity() {
    const { email, password, nick, city } = this.state;
    if (city!.length > 0) {
      this.props.register!(email, password, nick!, city!);
      this.setState({ visible: false });
      this.props.navigation.navigate('Main');
    } else return;
  }

  private async onClick() {
    const { email, password, passwordC, nick, mode } = this.state;
    if (mode === MODES.SIGN_IN) {
      if (email.length > 0 && password.length > 0) this.props.signIn!(email, password);
      else { Alert.alert('Inicio de Sesión Fallido', 'Datos Incorrectos', [{ text: 'Aceptar' }], { cancelable: false }); return; }
      this.props.navigation.navigate('Main');
    } else if (mode === MODES.SIGN_UP) {
      if (email.length > 0 && password.length > 0 && passwordC === password && nick!.length > 0) this.setState({ visible: true });
      else { Alert.alert('Registro Fallido', 'Datos Incorrectos', [{ text: 'Aceptar' }], { cancelable: false }); return; }
    }
  }
}

const mapStateToProps = (state: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({
  rehydrate: () => dispatch(rehydrate()),
  signIn: (email: string, password: string) => dispatch(signIn(email, password)),
  register: (email: string, password: string, nick: string, city: string) => dispatch(register(email, password, nick, city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
