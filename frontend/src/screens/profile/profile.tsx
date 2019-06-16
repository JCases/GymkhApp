import React, { Component } from 'react';
import Dialog from 'react-native-dialog';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { ActionSheet, Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import { ActivityIndicator, FlatList, Image, StatusBar, View } from 'react-native';

import CardGymkhana from '../../components/cardGymkhana';

import { theme } from '../../theme';

import { getGymkhanas, updateUser } from '../../actions/users';
import { IGymkhana, IUser } from '../../shared';

interface IStateUser {
  cards: IGymkhana[];
  loading: boolean;
  user?: IUser;
  visible?: boolean;
  attModify?: string;
  changed?: string;
}

interface IPropsUser {
  user?: IUser;
  gymkhanas: IGymkhana[];

  getGymkhanas?: (user: IUser) => IGymkhana[];
  updateUser?: (user: IUser) => IUser;

  navigation: NavigationScreenProp<any, any>;
}

class User extends Component<IPropsUser, IStateUser> {
  public constructor(props: any) {
    super(props);
    this.state = {
      cards: [],
      loading: true,
      user: undefined,
      visible: false,
      attModify: '',
      changed: '',
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    if (this.state.loading) {
      this.setState({ loading: false, cards: nextProps.gymkhanas, user: this.props.user! });
    } else return;
  }

  public render() {
    const { user } = this.state;

    if (this.state.loading) this.props.getGymkhanas!(this.props.user!);

    return (
      <Container style={{ backgroundColor: theme.white.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation!.goBack() }>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Perfil</Title>
          </Body>
          <Right>
            <Button transparent onPress={ () => ActionSheet.show({
              options: ['Modificar Nombre', 'Modificar Apellidos', 'Modificar Ciudad', 'Cancelar'],
              cancelButtonIndex: 3,
              title: 'Modificar Perfil',
            },
              (buttonIndex: any) => this.setState({ visible: true, attModify: buttonIndex === 0 ? 'Nombre' : (buttonIndex === 1 ? 'Apellidos' : 'Ciudad') })) }>
              <Icon type="Ionicons" name="md-options"  />
            </Button>
          </Right>
        </Header>
        <Content>
        <View>
          <Dialog.Container visible={ this.state.visible }>
            <Dialog.Title>Modificar Perfil</Dialog.Title>
            <Dialog.Description>{ `¿${this.state.attModify!}?` }</Dialog.Description>
            <Dialog.Input label="Introduce aquí la modificación" onChangeText={ (text) => this.setState({ changed: text })}/>
            <Dialog.Button label="Aceptar" onPress={ () => this.modifyUser(this.state.attModify!) }/>
          </Dialog.Container>
        </View>
          {user ?
            <React.Fragment>
              <View style={{ height: 160, width: '100%', backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Image source={{ uri: this.state.user!.image }} style={{ alignSelf: 'center', width: '100%', height: '100%', resizeMode: 'cover' }} />
              </View>
              <View style={{ backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 10, marginTop: 10, marginBottom: 10, color: theme.white.main }}>{ user!.nick }</Text>
                  { (user!.firstName && user!.lastName) ? <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginBottom: 10, color: theme.white.main }}>{ `${user!.firstName} ${user!.lastName}` }</Text> : <React.Fragment /> }
                </View>
                <Button transparent style={{ alignSelf: 'center', marginRight: 10 }} onPress={ () => this.requestCameraPermission() }>
                  <Icon type="FontAwesome5" name="camera-retro" style={{ color: theme.white.main }} />
                </Button>
              </View>
          <FlatList style={{ backgroundColor: theme.white.main, marginTop: 10 }} data={ this.state.cards.map(i => (<CardGymkhana key={ i.id } gymkhana={ i } active={ false }/>)) } renderItem={({ item }: any) => item } />
            </React.Fragment>
           : <View style={{ marginTop: 40, justifyContent: 'center', alignContent: 'center' }}><ActivityIndicator size="large" color={ theme.white.main } /></View>}
        </Content>
      </Container>
    );
  }

  private async modifyUser(attribute: string) {
    const nUser: IUser = { ...this.props.user, [attribute === 'Nombre' ? 'firstName' : (attribute === 'Apellidos' ? 'lastName' : 'city')]: this.state.changed };
    this.props.updateUser!(nUser);
    this.setState({ attModify: '', changed: '', visible: false });
  }

  private async requestCameraPermission() {
    const options = {
      title: 'Selecciona Imagen de Perfil',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Abrir Cámara',
      chooseFromLibraryButtonTitle: 'Elegir en Dispositivo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    await ImagePicker.showImagePicker(options, (r: ImagePickerResponse) => {
      if (!r.didCancel) {
        this.setState({ user: { ...this.state.user, image: r.uri } });
        this.props.updateUser!(this.state.user!);
      }
    });
  }
}

const mapStateToProps = (state: any) => ({ user: state.users.user, gymkhanas: state.users.gymkhanas });
const mapDispatchToProps = (dispatch: any) => ({
  getGymkhanas: (user: IUser) => dispatch(getGymkhanas(user)),
  updateUser: (user: IUser) => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
