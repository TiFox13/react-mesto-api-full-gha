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

  getInitialCards() {
    return this._request(`${this._url}/cards`,
      {
        headers: this._headers,
        method: "GET"
      }
    )
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`,
      {
        headers: this._headers,
        method: "GET"
      }
    )
  }

  addNewCard(item) {
    return this._request(`${this._url}/cards`,
      {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name: item.name,
          link: item.link,
          likes: {}
        })
      }
    )
  }

  patchUserInfo(item) {
    return this._request(`${this._url}/users/me`,
      {
        headers: this._headers,
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
        headers: this._headers,
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
        headers: this._headers,
        method: "DELETE",
      }
    )
  }

  putLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: this._headers,
        method: "PUT",
      }
    )
  }

  deleteLike(id) {
    return this._request(`${this._url}/cards/${id}/likes`,
      {
        headers: this._headers,
        method: "delete",
      }
    )
  }
}

//подключаем API
export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '532cb979-197b-4764-a60b-369a0c33ba6e',
    "Content-type": 'application/json'
  }
});
