import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: blue[900] },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
