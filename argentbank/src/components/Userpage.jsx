import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUsername, toggleEditMode } from '../features/auth/authSlice';
import '../App.css';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userProfile, isAuthenticated, editMode } = useSelector(state => state.auth);
  const [newUsername, setNewUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateUsername(newUsername));
      dispatch(toggleEditMode());
    } catch (error) {
      setError("Erreur lors de la mise à jour du nom d'utilisateur.");
    }
    setLoading(false);
  };

  return (
    <>
      <main className="main">
      <div className="header">
          {editMode ? (
            
            <form onSubmit={handleSubmit}>
              <h2>Edit user info</h2>
              <div className="form-row">
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
              </div>
              <div className="form-row">
              <label htmlFor="firstname">Firstname:</label>
              <input id="firstname" type="text" value={userProfile ? userProfile.firstName : ''} disabled />
              </div>
              <div className="form-row">
              <label htmlFor="lastName">LastName:</label>
              <input id="lastName" type="text" value={userProfile ? userProfile.lastName : ''} disabled />
              </div>
              <div className="form-row">
              <button className='editbutton' type="submit">Save</button>
              
              <button className='editbutton' type="button" onClick={() => dispatch(toggleEditMode())}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <h1>Welcome back<br />{userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : "Morche po"}</h1>
              <h2>{userProfile && userProfile.userName}</h2>
            </>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
    <p className="account-amount">$2,082.79</p>
    <p className="account-amount-description">Available Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <i className="fa fa-chevron-right fa-3x"></i>
  </div>
</section>
<section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
    <p className="account-amount">$10,928.42</p>
    <p className="account-amount-description">Available Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <i className="fa fa-chevron-right fa-3x"></i>
  </div>
</section>
<section className="account">
  <div className="account-content-wrapper">
    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
    <p className="account-amount">$184.30</p>
    <p className="account-amount-description">Current Balance</p>
  </div>
  <div className="account-content-wrapper cta">
    <i className="fa fa-chevron-right fa-3x"></i>
  </div>
</section>

      </main>
    </>
  );
};

export default UserPage;
