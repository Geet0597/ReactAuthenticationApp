import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Authentication.css';
 
const Authentication = (props) => {
    const {setIsAuthenticated} = props;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user; // to get user details if reuired
            localStorage.setItem('isAuthenticated', true);
            setIsAuthenticated(true);
            navigate("/home");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main>        
                <section>
                    <div className='sigininContainer'>                                            
                        <p className='headerText'> Authentication </p>                                            
                        <form className='formContainer'>                                              
                            <div className='field'>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div className='field'>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div className='signinBtn'>
                                <button                                    
                                    onClick={onLogin}  
                                    disabled={email === '' || password === ''}                                      
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                        <p>
                            <Link to="/reset-password">Forgot your password?</Link>
                        </p>
                        <p className="text-sm text-white text-center">
                            No account yet?
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Authentication;