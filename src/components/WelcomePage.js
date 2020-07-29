import React from 'react';

import Login from './Login';
import  Main from "../components/main/main"
import regeneratorRuntime from "regenerator-runtime";
import { Auth } from "./redux/actions"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import { MainLoader } from "../components/loaders/MainLoader"

class WelcomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      email: '',
      password: '',
      _auth: false,
      token: (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') ? false : true
    }
  }

  onEmailChange = (e) =>{
    this.setState({
        email: e.target.value
    })
  }  
  onPasswordChahge = (e) =>{
    this.setState({
      password: e.target.value
    })
  }
 onSigninSubmit = async (e) =>{
    e.preventDefault();
    await this.props.Auth(this.state.email, this.state.password)

    this.setState({
      _auth: this.props.auth,
      token: (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') ? false : true
    })

    console.log(this.props.auth)
    console.log(this.state.token)
    console.log(localStorage.getItem('token'))
  }

  render() {
    // если аутентификация
    if (this.state._auth && this.state.token || true ) {
      return <Main/> 
    }
    else
    return(
      <div>
        <Login 
          onSigninSubmit={this.onSigninSubmit} 
          loading={this.props.showLoader}
          onEmailChange={this.onEmailChange}
          email={this.state.email}
          password={this.state.password}
          onPasswordChahge={this.onPasswordChahge} />
        </div>
    )
  }
}

const mapDispatchToProps = {
  Auth
}

const mapStateToProps = state => {
  return {
      auth: state.Auth.auth,
      showLoader: state.Auth.showLoader
  }
}


export default connect(mapStateToProps, mapDispatchToProps) (WelcomePage);