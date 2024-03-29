import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';
import './Signup.css';
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user; // to get user details if reuired
            alert(`Hii, Please SignIn`);
            navigate("/signin");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
 
  return (
    <main >        
        <section>
            <div className='siginupContainer'>                  
                <p className='headerText' > SignUp </p>                                                                            
                <form className='formContainer'>                                                                                            
                    <div className='field'>
                        <label htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Email address"                                
                        />
                    </div>

                    <div className='field'>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"              
                        />
                    </div>                                             
                    
                    <button
                        className='signupBtn'
                        type="submit" 
                        onClick={onSubmit}   
                        disabled={email === '' || password === ''}                     
                    >  
                        Sign up                                
                    </button>
                                                                    
                </form>
                
                <p>
                    Already have an account?
                    <NavLink to="/signin" >
                        Sign in
                    </NavLink>
                </p>                   
            </div>
        </section>
    </main>
  )
}
 
export default Signup;