import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import Header from './Layout/Header';
import Content from './Layout/Content';
import Footer from './Layout/Footer';
import breadTable from './Images/breadTable.jpg'

const theme = createMuiTheme({
  palette: {
    primary: { 
      main: "#72da72",
      light: "#b6f5b6",
      dark: '#f50057',
    },
    secondary: {
      main: '#f50057'
    },
    background: {
      backgroundImage: `url(${breadTable})`
    }
  },
});
class App extends Component {

  render() {
   
    return (
      <div >
        <MuiThemeProvider theme={theme}>
          <Header/>
          <Content>{this.props.children}</Content>
          <Footer/>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
