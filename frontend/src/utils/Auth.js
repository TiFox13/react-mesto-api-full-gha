export const BASE_URL = 'http://localhost:3001';  //возможно пока надо http


const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
          method: "POST",
          headers: {
          Accept: "application/json",
              "Content-Type": "application/json", 
          },
          body: JSON.stringify({email, password})
         })
      .then(getResponse)
}

export const login = (email, password) => {
  return (
    fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
      
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({email, password})
    })
    .then(getResponse)
 
)
}

export const getToken = (token) => {
  return (
    fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
       "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`, 
      },
  })
  .then(getResponse)
  )
}