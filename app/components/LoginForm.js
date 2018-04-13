import React, { Component } from 'react';
import { connect } from 'react-redux';
import autobind from 'react-autobind';
import { View, Text } from 'react-native';

import { emailChanged, passwordChanged, loginUser } from '../actions';

import { Button, Card, CardSection, Input, Spinner } from './common';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }
  componentDidMount() {}

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress}>Login</Button>;
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange}
              value={this.props.email}
            />
          </CardSection>
          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange}
              value={this.props.password}
            />
          </CardSection>
          {this.renderError()}
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
