import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { fetchLogin } from '../../actions/loginActions';

import { LoginInterface, LoginPropsInterface } from './Login.interface';

class Login extends React.Component<LoginPropsInterface, LoginInterface> {
  constructor(props: LoginPropsInterface) {
    super(props);

    this.state = { username: '', password: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.FormEvent<HTMLInputElement>) {
    const elementName: string = event.currentTarget.name;
    const elementValue: string = event.currentTarget.value;
    this.setState((current: LoginInterface) => ({ ...current, [elementName]: elementValue }));
  }

  render() {
    return (
      <form>
        Username: <input type="text" name={'username'} onChange={this.onChange} />
        <br />
        Password: <input type="text" name={'password'} onChange={this.onChange} />
        <br />
        <NavLink to="/products">
          <input
            type="submit"
            value="Submit"
            onClick={() => {
              if (this.props.fetchLogin) {
                this.props.fetchLogin({ username: this.state.username, password: this.state.password });
              }
            }}
          />
        </NavLink>
      </form>
    );
  }
}

const mapStateToProps = (store: any) => {
  return { loginDetails: store.loginDetails };
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ fetchLogin }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
