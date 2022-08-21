import React from "react";
import {useSelector} from "react-redux";


const HeaderComponent = () => {
  const profile = useSelector(state => state.profileReducer.profile)
 
  const logoutClick = ()=>{
    localStorage.removeItem('token_admin')
    window.location.reload()
    
  }

  return <header >
  <div className='P-user-header-info'>

    <div className='P-profile-image'  style={{backgroundImage:`url('${profile.profileImage}')`}}></div>
    <div className='P-profile-info'>
      <h3>{profile.firstName? profile.firstName+' ': '-'}
        {profile.lastName? profile.lastName:'-'}</h3>
      <h2>{profile.position? profile.position:'No position'}</h2>
    </div>
    
  </div>
  <button onClick = {logoutClick} className="logout">Log out</button>
  </header>
}

export default HeaderComponent