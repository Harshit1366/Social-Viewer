import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Navbars from './Components/Navbars';
import Auth0Lock from 'auth0-lock';
const keys = require('./config/keys');

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {

      }
    };
  }

  static defaultProps={
    clientID: keys.clientID,
    domain: keys.domain
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        console.log(profile);
        this.setProfile(authResult.accessToken, profile);
      });
    });
    this.getProfile();
  }

  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, ()=>{
        console.log(this.state);
      });
    }
  }

  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({
      idToken:'',
      profile:''
    }, ()=>{
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  render() {
    let gitty;
    if(this.state.idToken){
        gitty = <Github/>
    }else{
      gitty = "Click on login to view Github viewer"
    }

    return (
      <div className="App">
       <Navbars
         lock={this.lock}
         idToken={this.state.idToken}
         onLogout = {this.logout.bind(this)}
         onLogin = {this.showLock.bind(this)}/>
       {gitty}
      </div>
    );
  }
}

export default App;
