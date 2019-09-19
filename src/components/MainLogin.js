import React from 'react'
import Popup from 'reactjs-popup'
import Login from './Login'
import SignUp from './SignUp'


const MainLogin = () => {
return (
  <div id="homeContainer" style={{marginTop: 90}}>
    <div>
    <h1>Hello and Welcome To OmniEats! </h1>
    <h3>Please Sign In or Create An Account</h3>
    <Popup trigger={<button>Login</button>} position="right center" >
      <Login />
    </Popup>
    <p>Don't Have An Account? That's OK! Sign Up Below</p>
    <Popup trigger={<button>Sign Up</button>} position="right center">
      <SignUp />
    </Popup>
    </div>
  </div>
)
}

export default MainLogin
