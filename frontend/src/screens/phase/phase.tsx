import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';

import { Button, Card, CardItem, Container, Content, Footer, Header, Icon, Left, Right, Segment, Text } from 'native-base';
import { Dimensions, ImageBackground, StatusBar, View } from 'react-native';

import { theme } from '../../theme';

import { IPhase } from '../../shared';

const deviceHeight = Dimensions.get('window').height;

enum SEGMENTS {
  DESCRIPTION = 'Descripción',
  INFO = 'Información',
}

interface IPropsPhase {
  phase?: IPhase;
  navigation?: NavigationScreenProp<any, any>;
}

interface IStatePhase {
  segment: SEGMENTS;
}

class Phase extends Component<IPropsPhase, IStatePhase> {
  public constructor(props: IPropsPhase) {
    super(props);
    this.state = {
      segment: SEGMENTS.DESCRIPTION,
    };
  }

  public render() {
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
          <ImageBackground source={ require('./../../assets/images/login.png') } style={{ height: 280, alignSelf: 'stretch', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center', backgroundColor: theme.blueGray.main, padding: 10, borderRadius: 10 }}>
              <Text style={{ color: theme.white.secondary, fontSize: 22, textAlign: 'center' }}>Phase X</Text>
              <Text style={{ color: theme.white.main, fontSize: 18, textAlign: 'center' }}>Name of Phase</Text>
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
              <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>¡MAXIMO 400 CARACTERES. RECOMENDADO 280! {'\n'}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Velit cupiditate ea doloremque cum quibusdam, omnis voluptatibus quia, fuga enim inventore nam deserunt.
                Adipisci magni eligendi optio temporibus, ipsam totam consectetur.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </Text>
          </React.Fragment>) : (
           <React.Fragment>
              <Card style={{ marginLeft: 20, marginRight: 20 }}>
                <CardItem cardBody>
                  <ImageBackground source={ require('./../../assets/images/login.png') }  style={{ alignSelf: 'stretch', height: deviceHeight / 4, width: '100%', position: 'relative' }}>
                  <View style={{ backgroundColor: theme.blueGray.secondary, padding: 10, borderRadius: 10, margin: 20 }}>
                    <Text style={{ color: theme.white.secondary, fontSize: 16, textAlign: 'center' }}>Phase X</Text>
                  </View>
                  </ImageBackground>
                </CardItem>
              </Card>
           </React.Fragment>
          ) }
        </Content>
        <Footer style={{ backgroundColor: theme.white.main }}>
          <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => {  } }>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
            { /* 2 Spaces like Padding */ }
            <Text style={{ color: theme.white.main }}>Validar Posición</Text>
            <Icon type="MaterialIcons" name="gps-fixed" color={ theme.white.main } />
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default Phase;
