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
        }).catch((error) => {
        // An error happened.
        alert('An Error Happened');
        });
    }
  
    useEffect(() => {
      fetchData();
    }, [page]);
  
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
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
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
              <p className='headerText'>
                Welcome Home
              </p>
              <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
          </nav>
          <div className='dataContainer'>
              {data.map((item) => (
                  <div key={item._id} className='card'>
                      <div>Name: {item.name}</div>
                      <div>No. of Trips: {item.trips}</div>
                      <div>Airline Details</div>
                      {item.airline.map((airline) => (
                        <div key={airline._id}>
                          <div>Name: {airline.name}</div>
                          <div>Website: {airline.website}</div>
                          <div className='logoContainer'>Logo: <img src={airline.logo} alt='logo' className='logo'/></div>
                          <div>Slogan: {airline.slogan}</div>
                          <div>Head Quaters: {airline.head_quaters}</div>
                          <div>Country: {airline.country}</div>
                          <div>Established: {airline.established}</div>
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