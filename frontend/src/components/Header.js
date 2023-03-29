import React from 'react';
import mestoLogo from '../images/header-logo.svg'

function Header({children}) {

  function openMenuClick(){
    console.log('позже доделаю')
  }

  return (
    <header className="header">
      <img className="header__logo" src={mestoLogo} alt="логотип Место" />
      <div className="burger" onClick={openMenuClick}>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
      {children}
    </header>
  )
}

export default Header;
