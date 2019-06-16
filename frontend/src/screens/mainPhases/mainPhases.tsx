import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Body, Button, Container, Content, Header, Icon, Left, Title } from 'native-base';
import { ActivityIndicator, FlatList, StatusBar, View } from 'react-native';

import CardPhase from '../../components/cardPhase';

import { theme } from './../../theme';

import { IGymkhana, IPhase, IUser, StatesPhase } from './../../shared';

import { getLastPhase, getPhases, removePhases } from '../../actions/gymkhanas';

interface IStateMainPhases {
  loading?: boolean;
}

interface IPropsMainPhases {
  cGymkhanas?: IGymkhana;
  phases?: IPhase[];
  lastPhase?: number;
  user?: IUser;

  getPhases?: (gymkhana: IGymkhana) => void;
  removePhases?: () => void;
  getLastPhase: (user: IUser, ids: string[]) => void;

  navigation: NavigationScreenProp<any, any>;
}

class MainPhases extends Component<IPropsMainPhases, IStateMainPhases> {
  public constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  public componentWillReceiveProps(nextProps: any) {
    if (!this.props.lastPhase) {
      this.props.getLastPhase(nextProps.user, nextProps.phases!.map((p: IPhase) => p.id!));
      this.setState({ loading: false });
    } return;
  }

  public render() {
    if (this.state.loading) {
      this.props.getPhases!(this.props.cGymkhanas!);
    }

    return (
      <Container style={{ backgroundColor: theme.white.main, marginTop: StatusBar.currentHeight }}>
        <Header androidStatusBarColor={ theme.blue.secondary } style={{ backgroundColor: theme.blue.main }}>
          <Left>
            <Button transparent onPress={ () => { this.props.removePhases!(); this.props.navigation!.goBack(); } }>
              <Icon type="Ionicons" name="ios-arrow-back"  />
            </Button>
          </Left>
          <Body>
            <Title>Fases</Title>
          </Body>
        </Header>
        <Content>
          { this.props.phases && this.props.lastPhase ?
            <FlatList data={ this.props.phases!.map((p: IPhase) => <CardPhase key={ p.id } state={ p.phaseOrder! > this.props.lastPhase! ? StatesPhase.AWAIT : (p.phaseOrder! < this.props.lastPhase! ? StatesPhase.COMPLETE : StatesPhase.ACTIVATE) } phase={ p } image={ this.props.cGymkhanas!.image }/>) } renderItem={({ item }: any) => item } />
          :
           <View style={{ marginTop: 40, justifyContent: 'center', alignContent: 'center' }}><ActivityIndicator size="large" color={ theme.blue.main } /></View>
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.users.user,
  phases: state.gymkhanas.phases,
  lastPhase: state.gymkhanas.lastPhase,
  cGymkhanas: state.gymkhanas.currentGymkhana,
});
const mapDispatchToProps = (dispatch: any) => ({
  getPhases: (gymkhana: IGymkhana) => dispatch(getPhases(gymkhana)),
  removePhases: () => dispatch(removePhases()),
  getLastPhase: (user: IUser, ids: string[]) => dispatch(getLastPhase(user, ids)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPhases);
