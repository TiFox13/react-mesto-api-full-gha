import React from 'react';
import { Link } from 'react-router-dom'; 

    function Register({handleSubmit}) {

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
  
      function submit(e) {

        e.preventDefault()
        let {password, email} = userData;
        handleSubmit(email, password)
      }
      
    return (
        <div className='auth'>
          <form className='form_auth'  onSubmit={submit} name='регистрация' method='post' >
            <h2 className="form__heading_auth">Регистрация</h2>
            <label className = "form__input-field_auth">
              <input onChange={handleChange} type="email" id ="email-input-register" value={userData.email } className="form__item_auth form__item_register-email" name="email" placeholder="Email" required minLength="2" maxLength="40" />
              <span className = "form__item-error account-name-input-error"></span>
            </label>
            <label className = "form__input-field_auth">
              <input onChange={handleChange} type="password" id ="password-input-register" value={userData.password } className="form__item_auth form__item_register-password" name="password" placeholder="Пароль" required minLength="4" maxLength="200" />
              <span className = "form__item-error account-about-input-error"></span>
            </label>
            <input type="submit"  className="save-button_auth" value='Зарегистрироваться' aria-label="Зарегистрироваться" />
          </form>
      <Link to='/sign-in' className="link link_auth">
         Уже зарегистрированы? Войти
         </Link>
        </div>
    )
}

export default Register;