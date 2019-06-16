import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Body, Button, Container, Content, Drawer, Header, Icon, Input, Item, Left, Right, Text, Title } from 'native-base';
import { ActivityIndicator, Alert, FlatList, StatusBar, View } from 'react-native';

import CardGymkhana from './../../components/cardGymkhana';
import SideBar from './../../components/sidebar';

import { theme } from './../../theme';

import { getGymkhanas } from '../../actions/gymkhanas';
import { IGymkhana, IUser } from '../../shared';

interface IPropsMain {
  user?: IUser;
  gymkhanas?: IGymkhana[];

  getGymkhanas?: (city: string) => IGymkhana[];

  navigation: NavigationScreenProp<any, any>;
}

interface IStateMain {
  filter?: string;
  loading?: boolean;
}

class Main extends Component<IPropsMain, IStateMain> {
  private drawer: any;

  public constructor(props: IPropsMain) {
    super(props);
    this.state = {
      filter: '',
      loading: true,
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    if (this.state.loading) {
      this.props.getGymkhanas!(nextProps.user!.city!);
      this.setState({ loading: false });
      if (Object.keys(nextProps.user).length === 0) {
        Alert.alert('Registro o Inicio de Sesión Fallido', 'Datos Incorrectos', [{ text: 'Aceptar', onPress: () => this.props.navigation.goBack() }], { cancelable: false });
      }
    }
  }

  public render() {
    const { filter } = this.state;

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
            <Right />
          </Header>
          <Content style={{ backgroundColor: theme.white.main }} >
            <View style={{ backgroundColor: theme.blue.main, paddingTop: 8, paddingBottom: 8 }}>
              <Item style={{ width: '80%', alignSelf: 'center' }}>
                <Icon name="ios-search" style={{ color: theme.white.main }} />
                <Input placeholder="Buscar" placeholderTextColor={ theme.white.main } style={{ color: theme.white.main }} onChangeText={ (text) => this.setState({ filter: text }) } />
                <Button rounded active={ false } style={{ paddingBottom: 2, paddingTop: 2, backgroundColor: theme.blueGray.main }} onPress={ () => this.props.getGymkhanas!(this.props.user!.city!) }>
                  <Icon name="reload1" type="AntDesign" style={{ color: theme.white.main }} />
                </Button>
              </Item>
            </View>
            { this.props.gymkhanas! ? (
              <FlatList style={{ backgroundColor: theme.white.main }} data={
                filter!.length > 0 ? this.props.gymkhanas!.filter(i => i.name!.toLowerCase().includes(filter!.toLowerCase())).map(i => (<CardGymkhana key={ i.id! } gymkhana={ i } active={ true }/>))
                :
                this.props.gymkhanas!.map(i => (<CardGymkhana key={ i.id } gymkhana={ i } active={ true }/>))
              } renderItem={({ item }: any) => item } />
            ) : <View style={{ marginTop: 40, justifyContent: 'center', alignContent: 'center' }}><ActivityIndicator size="large" color={ theme.white.main } /></View> }
          </Content>
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  gymkhanas: state.gymkhanas.gymkhanas,
});
const mapDispatchToProps = (dispatch: any) => ({ getGymkhanas: (city: string) => dispatch(getGymkhanas(city)) });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
