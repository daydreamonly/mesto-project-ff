const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "90ce202b-d8aa-4699-9c69-f641495b1448",
    "Content-type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

const updateUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-type": config.headers["Content-type"],
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
};

const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-type": config.headers["Content-type"],
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

const deleteCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
    body: JSON.stringify({ cardId }),
  }).then(handleResponse);
};

const likeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

const unlikeCardAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

const updateAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ avatar }),
  }).then(handleResponse);
};

export {
  getUser,
  getInitialCards,
  updateUserData,
  postNewCard,
  deleteCardAPI,
  likeCardAPI,
  unlikeCardAPI,
  updateAvatar,
};
