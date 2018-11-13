import React, { Component } from 'react';
import './App.css';
import Header from './Layout/Header';
import Content from './Layout/Content';
import Footer from './Layout/Footer';


class App extends Component {
 

  // componentDidMount (){
  //  if(localStorage.jwt !== undefined){
  //   fetch("http://localhost:3001/api/v1/profile", {
  //     method: "GET",
  //     credentials: "same-origin",
  //     headers: {
  //       "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     }
  //   }).then(res => res.json())
  //   .then(user => {
  //     console.log("user", user);
  //     this.setState({
  //       currentUser: user
  //     })}
      
  //   )}
  // }  
  

  render() {
   
    return (
      <div >
        <Header/>
        <Content>{this.props.children}</Content>
        <Footer/>
      </div>
    );
  }
}

export default App;
