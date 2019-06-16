import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import { Body, Button, Card, CardItem, Icon, Text } from 'native-base';
import { Image, View } from 'react-native';

import { theme } from '../../theme';

import { StatesPhase } from '../../shared';

// interface IPropsCardPhase {
//   phase?: IPhase;
//   state?: StatesPhase;

//   navigation?: NavigationScreenProp<any, any>;
// }

class CardPhase extends Component<any, any> {
  public constructor(props: any) {
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
                <Image source={{ uri: this.props.phase.image }} style={{ width: '100%', height: 120, alignSelf: 'stretch', position: 'relative' }}/>
                <View style={{ margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase { this.props.phase.phaseOrder }</Text>
                <Text style={{ marginTop: 10 }}>{ this.props.phase.description }</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem footer style={{ justifyContent: 'center' }}>
              <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.props.navigation!.navigate('Phase', { phase: this.props.phase }) }>
                <Icon type="MaterialCommunityIcons" name="information-outline" color={ theme.white.main } />
                <Text>Ver Información</Text>
              </Button>
            </CardItem>
          </React.Fragment>
          ) : (this.props.state === StatesPhase.AWAIT ? (
            <CardItem cardBody>
              <Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase { this.props.phase.phaseOrder }</Text>
                <Text style={{ color: theme.red.main, alignSelf: 'center' }}>BLOQUEADA</Text>
              </Body>
            </CardItem>
          ) : (
            <CardItem cardBody>
              <Body style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', margin: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Fase { this.props.phase.phaseOrder }</Text>
                <Text style={{ color: theme.green.main, alignSelf: 'center' }}>COMPLETADA</Text>
              </Body>
            </CardItem>
          ))}
        </Card>
      </View>
    );
  }
}

export default withNavigation(CardPhase);
