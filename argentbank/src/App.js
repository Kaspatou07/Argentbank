import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import SignIn from './components/SignIn'; 
import UserPage from './components/Userpage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <main>
                <Hero />
                <Features />
              </main>
              
            </>
          } />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/Userpage" element={<UserPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
