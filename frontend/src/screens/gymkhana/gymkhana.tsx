import React, { Component } from 'react';
import { connect } from 'react-redux';
import client from '../../utils/http';

import moment from 'moment';

import { Body, Button, Container, Content, Footer, Header, Icon, Left, Right, Text, Thumbnail, Title } from 'native-base';
import { Alert, Image, StatusBar, View } from 'react-native';

import { theme } from '../../theme';

import { IGymkhana, IResponse } from '../../shared';

import { selectGymkhana, unselectGymkhana } from '../../actions/gymkhanas';

class Gymkhana extends Component<any, any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    const { gymkhana } = this.props.navigation.state.params;
    const start = moment(gymkhana.start);

    return (
      <Container style={{ backgroundColor: theme.white.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => { this.props.unselectGymkhana(); this.props.navigation!.goBack(); } }>
              <Icon type="Ionicons" name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>GymkhApp</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Image source={{ uri: gymkhana.image }} style={{ height: 240, alignSelf: 'stretch', width: '100%', position: 'relative' }}/>
          <View style={{ backgroundColor: theme.blue.main, display: 'flex', flexDirection: 'row',  flexWrap: 'nowrap', justifyContent: 'flex-start', paddingTop: 12, paddingBottom: 12 }}>
            <Thumbnail source={{ uri: gymkhana.company.image }} style={{ marginLeft: 14 }} />
            <View style={{ marginLeft: 20, alignSelf: 'center' }}>
              <Text style={{ color: theme.white.main }}>{ gymkhana.name }</Text>
              <Text style={{ color: theme.white.main }}>{ start.format('MMMM DD, YYYY - HH:mm') }</Text>
            </View>
          </View>
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
            <Text>{ gymkhana.description }</Text>
          </View>
        </Content>
        <Footer style={{ backgroundColor: 'transparent' }}>
          <Left />
          <Right>
            <Button rounded style={{ backgroundColor: theme.blue.main, marginRight: 20 }} onPress={ () => this.selectGymkhana(gymkhana) }>
              <Icon type="Entypo" name="add-to-list" color={ theme.white.main } />
              { /* 2 Spaces like Padding */ }
              <Text style={{ color: theme.white.main }}>{ (moment().isAfter(gymkhana.start!) && moment().isBefore(gymkhana.end!)) ? '¡Jugar!' : 'Inscribirse'  }  </Text>
            </Button>
          </Right>
        </Footer>
      </Container>
    );
  }

  private async selectGymkhana(gymkhana: IGymkhana) {
    await client.put<IResponse<boolean>>('user/gymkhana/', { gymkhana, user: this.props.user }).then(r => {
      if (r.data.error) { return; }
      if (r.data.result) Alert.alert('¡Ya estás Inscrito!', 'Inscrito correctamente', [{ text: 'Aceptar' }], { cancelable: false });
      else Alert.alert('¡Ya estás Inscrito!', 'Ya estabas inscrito a esta Gymkhana', [{ text: 'Aceptar' }], { cancelable: false });
      if (moment().isAfter(gymkhana.start!) && moment().isBefore(gymkhana.end!)) {
        this.props.selectGymkhana(gymkhana);
        this.props.navigation!.navigate('MainPhases', gymkhana);
      }
    });
  }
}

const mapStateToProps = (state: any) => ({ user: state.users.user });
const mapDispatchToProps = (dispatch: any) => ({
  selectGymkhana: (gymkhana: IGymkhana) => dispatch(selectGymkhana(gymkhana)),
  unselectGymkhana: () => dispatch(unselectGymkhana()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gymkhana);
