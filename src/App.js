import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Authentication';
import ResetPassword from './page/ResetPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (JSON.parse(auth)) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <section>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/home"
              element={
                isAuthenticated ? (
                  <Home setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
