import React, { Component } from 'react';
import { connect } from 'react-redux';
import client from '../../utils/http';

import { Button, Card, CardItem, Container, Content, Footer, Header, Icon, Left, Right, Segment, Text } from 'native-base';
import { ActivityIndicator, Alert, Dimensions, ImageBackground, StatusBar, View } from 'react-native';

import { theme } from '../../theme';

import { phaseComplete } from '../../actions/gymkhanas';
import { IPhase, IResponse } from '../../shared';

const deviceHeight = Dimensions.get('window').height;

enum SEGMENTS {
  DESCRIPTION = 'Descripción',
  INFO = 'Información',
}

interface IStatePhase {
  segment: SEGMENTS;
  position?: string;
  loading?: boolean;
}

class Phase extends Component<any, IStatePhase> {
  public constructor(props: any) {
    super(props);
    this.state = {
      segment: SEGMENTS.DESCRIPTION,
      position: undefined,
      loading: false,
    };
  }

  public render() {
    const { phase } = this.props.navigation.state.params;
    const { segment } = this.state;
    return (
      <Container style={{ backgroundColor: theme.blue.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => this.props.navigation!.goBack() }>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Right />
        </Header>
        <Content style={{ backgroundColor: theme.white.main }}>
          <ImageBackground source={{ uri: this.props.cGymkhana.image }} style={{ height: 160, alignSelf: 'center',  width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', backgroundColor: theme.blue.main }}>
            <View style={{ alignSelf: 'center', backgroundColor: theme.blueGray.main, padding: 10, borderRadius: 10 }}>
              <Text style={{ color: theme.white.secondary, fontSize: 22, textAlign: 'center' }}>Fase { phase.phaseOrder }</Text>
              <Text style={{ color: theme.white.main, fontSize: 18, textAlign: 'center' }}>{ phase.name }</Text>
            </View>
          </ImageBackground>
          <Segment style={{ marginTop: 10 }}>
            <Button style={{ borderColor: theme.blueGray.main, backgroundColor: segment === SEGMENTS.DESCRIPTION ? theme.blue.secondary : theme.blueGray.secondary }} first onPress={ () => this.setState({ segment: SEGMENTS.DESCRIPTION }) }>
              <Text>{ SEGMENTS.DESCRIPTION }</Text>
            </Button>
            <Button style={{ borderColor: theme.blueGray.main, backgroundColor: segment === SEGMENTS.INFO ? theme.blue.secondary : theme.blueGray.secondary }} last onPress={ () => this.setState({ segment: SEGMENTS.INFO }) }>
              <Text>{ SEGMENTS.INFO }</Text>
            </Button>
          </Segment>
          { segment === SEGMENTS.DESCRIPTION ? (
          <React.Fragment>
              <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>{ phase.description }</Text>
          </React.Fragment>) : (
           <React.Fragment>
              <Card style={{ marginLeft: 20, marginRight: 20 }}>
                <CardItem cardBody>
                  <ImageBackground source={{ uri: phase.image }}  style={{ alignSelf: 'stretch', height: deviceHeight / 2.4, width: '100%', position: 'relative' }}>
                  <View style={{ backgroundColor: theme.blueGray.secondary, padding: 10, borderRadius: 10, margin: 20 }}>
                    <Text style={{ color: theme.white.secondary, fontSize: 16, textAlign: 'center' }}>Fase { phase.phaseOrder }</Text>
                  </View>
                  </ImageBackground>
                </CardItem>
              </Card>
           </React.Fragment>
          ) }
        </Content>
        <Footer style={{ backgroundColor: theme.white.main }}>
          { this.state.loading ? <View style={{ marginRight: 20, justifyContent: 'center', alignContent: 'center' }}><ActivityIndicator size="large" color={ theme.blue.main } /></View> : <React.Fragment /> }
          <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.verifyPosition(phase) }>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
            { /* 2 Spaces like Padding */ }
            <Text style={{ color: theme.white.main }}>Validar Posición</Text>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
          </Button>
        </Footer>
      </Container>
    );
  }

  private async verifyPosition(phase: IPhase) {
    this.setState({ loading: true });
    await navigator.geolocation.getCurrentPosition(position => this.setState({ position: `${position.coords.longitude}-${position.coords.latitude}` }),
    (e) => { this.setState({ loading: false }); Alert.alert('¡Error!', 'No se ha podido obtener tu localización', [{ text: 'Aceptar' }], { cancelable: false }); },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
    if (this.state.position === phase.position) {
      this.props.phaseComplete();
      await client.put<IResponse<boolean>>('/user/phase', { phase, user: this.props.user });
      Alert.alert('¡Correcto!', '¡A por la siguiente fase!', [{ text: 'Aceptar', onPress: () => this.props.navigation!.goBack() }], { cancelable: false });
    }
  }
}

const mapStateToProps = (state: any) => ({ cGymkhana: state.gymkhanas.currentGymkhana, user: state.users.user });
const mapDispatchToProps = (dispatch: any) => ({ phaseComplete: () => dispatch(phaseComplete()) });

export default connect(mapStateToProps, mapDispatchToProps)(Phase);
