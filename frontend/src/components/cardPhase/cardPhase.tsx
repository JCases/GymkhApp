import React, { Component } from 'react';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import { Body, Button, Card, CardItem, Icon, Text } from 'native-base';
import { Image, View } from 'react-native';

import { theme } from '../../theme';

import { IPhase, StatesPhase } from '../../shared';

interface IPropsCardPhase {
  phase?: IPhase;
  state?: StatesPhase;
  navigation?: NavigationScreenProp<any, any>;
}

class CardPhase extends Component<any, IPropsCardPhase> {
  public constructor(props: IPropsCardPhase) {
    super(props);
  }

  public render() {
    return (
      <View style={{ marginLeft: 4, marginRight: 4 }}>
        <Card>
          { this.props.state === StatesPhase.ACTIVATE ? (
          <React.Fragment>
            <CardItem cardBody>
              <Body>
                <Image source={ require('./../../assets/images/login.png') } style={{ width: '100%', height: 120, alignSelf: 'stretch', position: 'relative' }}/>
                <View style={{ margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase X</Text>
                <Text style={{ marginTop: 10 }}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis reprehenderit culpa illo distinctio rerum nam veniam explicabo saepe voluptatem? At nulla asperiores optio ipsum! Blanditiis veniam mollitia dolores veritatis officia.
                </Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'center' }}>
              <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.props.navigation!.navigate('Phase', this.props.phase) }>
                <Icon type="MaterialCommunityIcons" name="information-outline" color={ theme.white.main } />
                <Text>Ver Información</Text>
              </Button>
            </CardItem>
          </React.Fragment>
          ) : (this.props.state === StatesPhase.AWAIT ? (
            <CardItem cardBody>
              <Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase X</Text>
                <Text style={{ color: theme.red.main, alignSelf: 'center' }}>BLOQUEADA</Text>
              </Body>
            </CardItem>
          ) : (
            <CardItem cardBody>
              <Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase X</Text>
                <Text style={{ color: theme.green.main, alignSelf: 'center' }}>COMPLETADA</Text>
              </Body>
            </CardItem>
          ))}
        </Card>
      </View>
    );
  }
}

export default withNavigation<IPropsCardPhase>(CardPhase);
