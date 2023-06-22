import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Signup from './page/Signup';
import Signin from './page/Authentication';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <section>
          <Routes>
            {!isAuthenticated && <Route path="/" element={<Navigate to="/signin" />} />}
            <Route path="/home" element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/signin" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
