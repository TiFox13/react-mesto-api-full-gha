class Api {
  constructor(object) {
    this._url = object.url;   //https://mesto.nomoreparties.co/v1/cohort-54
    this._headers = object.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  // ПОЛУЧЕНИЕ КАРТОЧЕК
  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/cards`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET"
      }
    )
  }

  // ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/users/me`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "GET"
      }
    )
  }

  addNewCard(item) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/cards`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          name: item.name,
          link: item.link,
          // likes: {}
        })
      }
    )
  }

  patchUserInfo(item) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/users/me`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          name: item.name,
          about: item.about
        })
      }
    )
  }

  patchAvatar(item) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/users/me/avatar`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          avatar: item.link
        })
      }
    )
  }

  deleteCard(id) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/cards/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }
    )
  }

  putLike(id) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "PUT",

      }
    )
  }

  deleteLike(id) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "delete",
      }
    )
  }
}

//подключаем API
export const api = new Api({
  url: "http://localhost:3001",
  headers: {
    "Content-type": 'application/json'
  }
});
