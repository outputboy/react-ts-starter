import TextField from '@material-ui/core/TextField';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { fetchLogin } from '../../actions/loginActions';

import Button from '@material-ui/core/Button';
import { LoginInterface, LoginPropsInterface } from './Login.interface';

const styles = {
  linkStyles: {
    textDecoration: 'none',
    color: 'white',
  },
};

class Login extends React.Component<LoginPropsInterface, LoginInterface> {
  constructor(props: LoginPropsInterface) {
    super(props);

    this.state = { username: '', password: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const elementName: string = event.currentTarget.name;
    const elementValue: string = event.currentTarget.value;
    this.setState((current: LoginInterface) => ({ ...current, [elementName]: elementValue }));
  }

  render() {
    return (
      <form>
        <TextField
          label={'Username'}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            this.onChange(event)
          }
          name={'username'}
          placeholder={'username'}
          type={'text'}
          required
        />
        <br />
        <TextField
          label={'Password'}
          onChange={(event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            this.onChange(event)
          }
          name={'password'}
          placeholder={'password'}
          type={'password'}
          required
        />
        <br />
        <Link to="/products" style={styles.linkStyles}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (this.props.fetchLogin) {
                this.props.fetchLogin({ username: this.state.username, password: this.state.password });
              }
            }}
            style={{ marginTop: 10 }}
          >
            Submit
          </Button>
        </Link>
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
