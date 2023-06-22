import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
 
const Home = (props) => {
    const {setIsAuthenticated} = props;
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            setIsAuthenticated(false);
            navigate("/signin");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        alert('An Error Happened');
        });
    }
   
    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>
 
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
        </>
    )
}
 
export default Home;