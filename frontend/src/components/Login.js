import React from 'react';

function Login({handleSubmit}) {

  const [userData, setUserData] = React.useState({
    password: '',
    email: '',
  })

  function handleChange(e){
    const {name, value} = e.target;

    setUserData({
      ...userData,
      [name]: value
    })
  }

  function submit(e){
    e.preventDefault();
    if (!userData.email || !userData.password){
      return;
    }

    handleSubmit(userData.email, userData.password)
      setUserData({ password: '', email: ''});

  }
 return (
    <div className='auth'>
   <form className='form_auth' onSubmit={submit} name='вход' method='post' >
     <h2 className="form__heading_auth">Вход</h2>
     <label className = "form__input-field_auth">
       <input onChange={handleChange} type="email" id ="email-input" className="form__item_auth form__item_register-email" name="email" placeholder="Email" required minLength="2" maxLength="40" />
       <span className = "form__item-error account-name-input-error"></span>
     </label>
     <label className = "form__input-field_auth">
       <input onChange={handleChange} type="password" id ="password-input" className="form__item_auth form__item_register-password" name="password" placeholder="Пароль" required minLength="4" maxLength="200" />
       <span className = "form__item-error account-about-input-error"></span>
     </label>
     <input type="submit"  className="save-button_auth" value='Войти' aria-label="Войти" />
   </form>
 
 </div>
 )
}

export default Login;