import React, { Component } from 'react';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import { Body, Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail } from 'native-base';
import { Image, View } from 'react-native';

import { theme } from '../../theme';

import { IGymkhana } from '../../shared';

interface IPropsCardGymkhana {
  gymkhana?: IGymkhana;
  navigation?: NavigationScreenProp<any, any>;
}

class CardGymkhana extends Component<any, IPropsCardGymkhana> {
  public constructor(props: IPropsCardGymkhana) {
    super(props);
  }

  public render() {
    return (
      <View style={{ marginLeft: 4, marginRight: 4 }}>
        <Card>
          <CardItem header>
            <Left>
              <Thumbnail source={ require('./../../assets/images/logo-dark.png') } />
              <Body>
                <Text>NativeBase</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Body>
              <Image source={ require('./../../assets/images/login.png') } style={{ height: 140, alignSelf: 'stretch', width: '100%', position: 'relative' }}/>
              <Text style={{ marginTop: 12, marginLeft: 20, marginRight: 20 }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis reprehenderit culpa illo distinctio rerum nam veniam explicabo saepe voluptatem? At nulla asperiores optio ipsum! Blanditiis veniam mollitia dolores veritatis officia.
              </Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button transparent>
                <Icon style={{ color: theme.blueGray.secondary }} name="ios-people" />
                <Text style={{ color: theme.blueGray.secondary }}>1,926 Participantes</Text>
              </Button>
            </Left>
            <Right>
              <Button rounded style={{ backgroundColor: theme.blue.main }} onPress={ () => this.props.navigation!.navigate('Gymkhana', this.props.gymkhana) }>
                <Icon type="MaterialIcons" name="add-circle" color={ theme.white.main } />
                { /* 2 Spaces like Padding */ }
                <Text>Ver Más  </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
}

export default withNavigation(CardGymkhana);
