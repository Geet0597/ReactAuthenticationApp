import React, {useState, useEffect} from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './Home.css';
 
const Home = (props) => {
    const {setIsAuthenticated} = props;
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
 
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
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`)
        .then((response) => response.json())
        .then((result) => {
          setData((prevData) => [...prevData, ...result.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error:', error);
          setLoading(false);
        });
    };
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
        setLoading(true);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
   
    return(
        <>
            <nav className='nav'>
                <p>
                    Welcome Home
                </p>
                <div>
        			<button onClick={handleLogout}>
                        Logout
                    </button>
        		</div>
            </nav>
                <div>
                    {data.map((item) => (
                        <div key={item._id}>
                            Name: {item.name}
                            No. of Trips: {item.trips}
                            Airline Details
                            {item.airline.map((airline) => (
                                <div key={airline._id}>
                                    Name: {airline.name}
                                    Website: {airline.website}
                                    Logo: <img src={airline.logo} alt='logo'/>
                                    Slogan: {airline.slogan}
                                    Head Quaters: {airline.head_quaters}
                                    country: {airline.country}
                                    established: {airline.established}
                            </div>
                            ))}
                        </div>
                    ))}
                    {loading && <p>Loading...</p>}
                </div>
        </>
    )
}
 
export default Home;