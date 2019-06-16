import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import moment from 'moment';

import { Body, Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail } from 'native-base';
import { Image, View } from 'react-native';

import { theme } from '../../theme';

interface IStateCardGymkhana {
  participants?: number;
}

class CardGymkhana extends Component<any, IStateCardGymkhana> {
  public constructor(props: any) {
    super(props);
    this.state = {
      participants: Math.floor(Math.random() * (1500 - 10) + 10),
    };
  }

  public render() {
    const { gymkhana, active } = this.props;
    const start = moment(gymkhana!.start);

    return (
      <View style={{ marginLeft: 4, marginRight: 4 }}>
        <Card>
          <CardItem header>
            <Left>
              { active ? <Thumbnail source={{ uri: gymkhana!.company!.image }} /> : <React.Fragment /> }
              <Body>
                <Text>{ gymkhana!.name }</Text>
                <Text note>{ start.format('MMMM DD, YYYY - HH:mm') }</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Image source={{ uri: gymkhana!.image }} style={{ height: 140, alignSelf: 'stretch', width: '100%', position: 'relative' }}/>
              <Text style={{ marginTop: 12, marginLeft: 20, marginRight: 20 }}>{ gymkhana!.description }</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button transparent>
                <Icon style={{ color: theme.blueGray.secondary }} name="ios-people" />
                <Text style={{ color: theme.blueGray.secondary }}>{ this.state.participants } Participantes</Text>
              </Button>
            </Left>
            { active ?
            <Right>
              <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.props.navigation!.navigate('Gymkhana', { gymkhana: { ...gymkhana } }) }>
                <Icon type="MaterialIcons" name="add-circle" color={ theme.white.main } />
                { /* 2 Spaces like Padding */ }
                <Text>Ver Más  </Text>
              </Button>
            </Right>
             :
             <Right />}
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default withNavigation(CardGymkhana);
