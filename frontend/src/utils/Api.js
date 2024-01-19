class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        return this._request(this._url + '/users/me', {
            headers: this._headers,
            method: 'GET',
        })
            .then((res) => {
                return res;
            });
    }

    getInitialCards() {
        return this._request(this._url + '/cards', {
            headers: this._headers,
            method: 'GET',
        })
            .then((res) => {
                return res;
            });
    };

    editProfile(name, about) {
        return this._request(this._url + '/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => {
                return res;
            });
    }

    addNewCard(name, link) {
        return this._request(this._url + '/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                return res;
            });
    }

    deleteCard(cardId) {
        return this._request(this._url + '/cards/' + cardId, {
            headers: this._headers,
            method: 'DELETE'
        });
    }

    setLike(cardId) {
        return this._request(this._url + '/cards/' + cardId + '/likes', {
            headers: this._headers,
            method: 'PUT'
        })
            .then((res) => {
                return res;
            });
    }

    removeLike(cardId) {
        return this._request(this._url + '/cards/' + cardId + '/likes', {
            headers: this._headers,
            method: 'DELETE'
        })
            .then((res) => {
                return res;
            });
    }

    changeAvatar(avatarSrc) {
        return this._request(this._url + '/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatarSrc
            })
        })
            .then((res) => {
                return res;
            });
    }

    _request(url, options) {
        const token = localStorage.getItem('token');
        if (token !== null) {
            options.headers.authorization = `Bearer ${token}`;
        }
        return fetch(url, options).then(this._checkResponse)
    }
}

const api = new Api({
    url: 'https://api.freyrskept.nomoredomainsmonster.ru',
    headers: { 'Content-Type': 'application/json' }
});

export default api;