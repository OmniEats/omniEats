import React from 'react'
import Popup from 'reactjs-popup'
import Login from './Login'
import SignUp from './SignUp'


const MainLogin = () => {
return (
  <div id="homeContainer">
    <div>
    <h1>Hello And Welcome To Ombi Eats </h1>
    <h3>Please Sign In or Create An Account</h3>
    <Popup trigger={<button>Login</button>} position="right center" >
      <Login />
    </Popup>
    <p>Dont Have An Account!! Thats OK!! Sign Up Below</p>
    <Popup trigger={<button>Sign Up</button>} position="right center">
      <SignUp />
    </Popup>
    </div>
  </div>
)
}

export default MainLogin
