import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Accordion, Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text, Thumbnail } from 'native-base';

const instructions = Platform.select({
  android:
    'Double tap R on your keyboard to reload,\n Shake or press menu button for dev menu',
  ios: 'Press Cmd+R to reload,\n Cmd+D or shake for dev menu',
});

const dataArray = [
  { title: 'First Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Second Element', content: 'Lorem ipsum dolor sit amet' },
  { title: 'Third Element', content: 'Lorem ipsum dolor sit amet' },
];

export class Test extends Component<any, any> {
  public render() {
    return (
      <Container>
        <Header />
        <View />
          <Content padder>
          <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: 'Image URL' }} />
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
          <Accordion dataArray={dataArray} headerStyle={{ backgroundColor: '#b7daf8' }} contentStyle={{ backgroundColor: '#ddecf8' }} />
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to React Native!</Text>
            <Text style={styles.instructions}>To get started, edit App.tsx</Text>
            <Text style={styles.instructions}>{instructions}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
});
