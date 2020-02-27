import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import orange from "@material-ui/core/colors/orange";
import amber from "@material-ui/core/colors/amber"

// Create a theme instance.  
// https://material-ui.com/zh/customization/color/#color-tool
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main:  amber[500],
    },
    secondary: {
      main: orange[400]
    },
    error: {
      main: red.A400
    },
    info:{
      main: amber[100]
    },
    background: {
      default: grey[50]
    }
  }
});

export default theme;
