import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, CardItem, Container, Content, Footer, Header, Icon, Left, Right, Segment, Text } from 'native-base';
import { Alert, Dimensions, ImageBackground, StatusBar, View } from 'react-native';

import { theme } from '../../theme';

const deviceHeight = Dimensions.get('window').height;

enum SEGMENTS {
  DESCRIPTION = 'Descripción',
  INFO = 'Información',
}

interface IStatePhase {
  segment: SEGMENTS;
  position?: string;
}

class Phase extends Component<any, IStatePhase> {
  public constructor(props: any) {
    super(props);
    this.state = {
      segment: SEGMENTS.DESCRIPTION,
      position: undefined,
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
          <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.verifyPosition(phase.position) }>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
            { /* 2 Spaces like Padding */ }
            <Text style={{ color: theme.white.main }}>Validar Posición</Text>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
          </Button>
        </Footer>
      </Container>
    );
  }

  private async verifyPosition(correctPosition: string) {
    await navigator.geolocation.getCurrentPosition(position => this.setState({ position: `${position.coords.longitude}-${position.coords.latitude}` }),
    () => Alert.alert('¡Error!', 'Problema al Localizar Posición', [{ text: 'Aceptar' }], { cancelable: false }),
    { enableHighAccuracy: true, timeout: 1000, maximumAge: 2000 });
    if (this.state.position === correctPosition) Alert.alert('¡Correcto!', '¡A por la siguiente fase!', [{ text: 'Aceptar', onPress: () => this.props.navigation!.goBack() }], { cancelable: false });
  }
}

const mapStateToProps = (state: any) => ({ cGymkhana: state.gymkhanas.currentGymkhana });
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Phase);
