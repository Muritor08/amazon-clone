import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.css'
import { auth } from './firebase'

function Login() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault()

        //fierbase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // successfull created email and password
                if (auth){
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))

        //firebase register
    }

  return (
    <div className='login'>
        <Link to='/'>
        <img 
            className='login__logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_%20logo.vg.png' alt='' 
        />
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value) } />

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value) } />

                <button className='login__signInButton' type='submit' onClick={signIn} >Sign In</button>
            </form>
            <p>
            By signing-in you agree to Amazon clone Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button className='login_registerButton' onClick={register} >Create New Account</button>
        </div>
    </div>
  )
}

export default Login