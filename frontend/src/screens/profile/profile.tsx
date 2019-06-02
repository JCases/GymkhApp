import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { FlatList, NavigationScreenProp } from 'react-navigation';

import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Thumbnail, Title } from 'native-base';
import { PermissionsAndroid, StatusBar, View } from 'react-native';

import CardGymkhana from '../../components/cardGymkhana';

import { theme } from '../../theme';

import { IUser } from '../../shared';

interface IPropsUser {
  user?: IUser;
  navigation?: NavigationScreenProp<any, any>;
}

interface IStateUser {
  avatar?: string;
  cameraPermissions: boolean;
  galleryPermissions: boolean;
}

class User extends Component<IPropsUser, IStateUser> {
  public constructor(props: IPropsUser) {
    super(props);
    this.state = {
      avatar: '',
      cameraPermissions: false,
      galleryPermissions: false,
    };
    // this.requestCameraPermission();
  }

  public render() {
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

    const cards = [<CardGymkhana />, <CardGymkhana />, <CardGymkhana />, <CardGymkhana />];
    return (
      <Container style={{ backgroundColor: theme.blue.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation!.goBack() }>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Perfil</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={{ height: 160, width: '100%', backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Thumbnail source={{ uri: this.state.avatar }} style={{ alignSelf: 'center', width: 140, height: 140, resizeMode: 'cover' }} />
          </View>
          <View style={{ backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 10, marginTop: 10 }}>NOMBRE</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginBottom: 10 }}>APELLIDO APELLIDO</Text>
            </View>
            <Button transparent style={{ alignSelf: 'center', marginRight: 10 }} onPress={ () => { ImagePicker.showImagePicker(options, (r: any) => { this.setState({ avatar: r.uri }); }); } }>
              <Icon type="FontAwesome5" name="camera-retro" style={{ color: theme.white.main }} />
            </Button>
          </View>
          <FlatList style={{ backgroundColor: theme.white.main, marginTop: 10 }} data={ cards } renderItem={({ item }: any) => item } />
        </Content>
      </Container>
    );
  }

  private async requestCameraPermission() {
    try {
      if (await !PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)) {
        const GRANTED = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'GymkhApp Permisos de la Cámara',
          message:
            'GymkhApp necesita acceso a tu camara ' +
            'para que puedas tomar fotos impresionantes.',
          buttonNeutral: 'Pregúntame Luego',
          buttonPositive: 'OK',
        });
        if (GRANTED === PermissionsAndroid.RESULTS.GRANTED) this.setState({ cameraPermissions: true });
        else this.setState({ cameraPermissions: false });
      } else this.setState({ cameraPermissions: true });
    } catch (e) {  this.setState({ cameraPermissions: false }); }
  }
}

export default User;
