 class Api {
  constructor(object) {
    this._token = object.token;
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
    return this._request(`${this._url}/cards`,
      {
        headers: {
          authorization: `Bearer ${this._token}`,
        },
        method: "GET"
      }
    )
  }

  // ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
  getUserInfo() {
    return this._request(`${this._url}/users/me`,
      {
        headers: {
          authorization: `Bearer ${this._token}`,
        },
        method: "GET"
      }
    )
  }

  addNewCard(item) {
    return this._request(`${this._url}/cards`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${this._token}`,
        },
        method: "POST",
        body: JSON.stringify({
          name: item.name,
          link: item.link,
        })
      }
    )
  }

  patchUserInfo(item) {
    return this._request(`${this._url}/users/me`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${this._token}`,
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
    return this._request(`${this._url}/users/me/avatar`,
      {
        headers: {
          "Content-type": 'application/json',
          authorization: `Bearer ${this._token}`,
        },
        method: "PATCH",
        body: JSON.stringify({
          avatar: item.link
        })
      }
    )
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`,
      {
        headers: {
          authorization: `Bearer ${this._token}`,
        },
        method: "DELETE",
      }
    )
  }

  putLike(id) {

    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: {
          authorization: `Bearer ${this._token}`,
        },
        method: "PUT",

      }
    )
  }

  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: {
          authorization: `Bearer ${this._token}`,
        },
        method: "delete",
      }
    )
  }
}

//подключаем API
export const api = new Api({
  token: localStorage.getItem('jwt'),
  url: "http://localhost:3001",
  headers: {
    "Content-type": 'application/json'
  }
});
