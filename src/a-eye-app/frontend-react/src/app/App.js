import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline
} from '@material-ui/core';
import './App.css';
import Theme from "./Theme";
import AppRoutes from "./AppRoutes";
import Content from "../common/Content";
import Header from "../common/Header";
import Footer from "../common/Footer";
import DataService from '../services/DataService';


const App = (props) => {

  console.log("================================== App ======================================");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const options = [
    'English',
    'French',
    'Spanish',
    'Chinese',
  ];

  // Init Data Service
  DataService.Init();

  // Build App
  let view = (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <Router basename="/">
          <Header selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} options={options}></Header>
          <Content>
            <AppRoutes selectedIndex={selectedIndex} options={options}/>
          </Content>
          <Footer></Footer>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  )

  // Return View
  return view
}

export default App;
