import '@babel/polyfill';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import configuration from './store';
import theme from './theme';

const { store, persistor } = configuration();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
