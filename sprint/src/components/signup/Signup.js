import React from 'react';
//create state for form
import axios from 'axios';


class Signup extends React.Component {
    state = {
        username: '',
        password: '',
    };



//function for onChange input
onChange = event => {
    this.setState({
        [event.target.name]: event.target.value
    })
};



//function for onSubmit 
//let me create new user
signup = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:3300/api/authenticate/register';

    axios.post(endpoint, this.state)
    .then(res => {
        console.log(res)
        localStorage.setItem('jwt', res.data.token);
        this.props.history.push('/users');
    })
    .catch(err => {
        console.log(err)
    })
}


//create form
render() {
    return (
        <div className='signup-form'>
        <form onSubmit={this.signup}>
        <input
        type='text'
        placeholder='username'
        name='username'
        onChange={this.onChange}
        value={this.state.username}
        />
         &nbsp;   &nbsp;   &nbsp;  
        <input
        type='text'
        placeholder='department'
        name='department'
        onChange={this.onChange}
        value={this.state.department}
        />
         &nbsp;   &nbsp;   &nbsp;  
        <input
        type='password'
        placeholder='password'
        name='password'
        onChange={this.onChange}
        value={this.state.password}
        />
        <button type='submit'>Sign Up</button>
        </form>
        </div>
        )
    }
} //remember to move bracket from the top down b/c it throws error otherwise


export default Signup;
