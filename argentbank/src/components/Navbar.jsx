import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, fetchUserProfile, toggleEditMode } from '../features/auth/authSlice'; 
import argentBankLogo from '../img/argentBankLogo.webp'; 
import '../App.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userProfile = useSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className='usernav'>
        {isAuthenticated ? (
          <>
            
            <Link className="main-nav-item" to="/Userpage">
              <span>{userProfile ? userProfile.userName : 'Loading...'}</span>
              <i className="fa fa-user-circle fa-2x"></i>
            </Link>
            <div className="main-nav-item" onClick={() => dispatch(toggleEditMode())} style={{ cursor: 'pointer' }}>
            <i className="fa fa-gear fa-2x"></i>
          </div>
          </>
        ) : null}
        {!isAuthenticated ? (
          <Link className="main-nav-item" to="/sign-in">
            Sign In
          </Link>
        ) : (
          <div className="main-nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <i className="fa fa-power-off fa-2x"></i>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
