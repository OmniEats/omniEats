import React from 'react';
import {connect} from 'react-redux';
import {createUser} from '../store'

class SignUp extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev){
    this.setState({[ev.target.name] : ev.target.value});
  }

  render(){
    const {firstName, lastName, email, password, passwordConfirm} = this.state;
    const {onChange} = this;
    const {error, handleCreate} = this.props;

    return(
      <div style={{
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'top',
        flexDirection: 'column'}}>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          handleCreate(firstName, lastName, email, password)
        }}>
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" required onChange={onChange}/>
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" required onChange={onChange}/>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" required onChange={onChange}/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" required onChange={onChange}/>
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" name="passwordConfirm" required onChange={onChange}/>
            {(password !== passwordConfirm) ? <div><font color="red">PASSWORDS DONT MATCH! 🤪</font></div>: ''}
          </div>
          <input type="submit" disabled={(!firstName || !lastName || !email || !password || !passwordConfirm) ? true : false} />
          <div><font color="red">{(error === 'Account Already Exists') ? `${error} 🧐` : ''}</font></div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({error})=>{
  return {
    error,
  }
}

const mapDispatchToProps = ( dispatch )=>{
  return {
    handleCreate: function(firstName, lastName, email, password){

      dispatch(createUser({
        firstName,
        lastName,
        email,
        password

      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// export default SignUp;
