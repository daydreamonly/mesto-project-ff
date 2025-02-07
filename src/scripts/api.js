const PATH = "https://nomoreparties.co";
const cohortId = "wff-cohort-31";
const TOKEN = "90ce202b-d8aa-4699-9c69-f641495b1448";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "90ce202b-d8aa-4699-9c69-f641495b1448",
    "Content-type": "application/json",
  },
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: config.headers.authorization,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getInitialCards = () => {
  return fetch(`${PATH}/v1/${cohortId}/cards`, {
    method: "GET",
    headers: {
      authorization: TOKEN,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUserData = (name, about, avatar) => {
  return fetch(`${PATH}/v1/${cohortId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      about,
      avatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postNewCard = (name, link) => {
  return fetch(`${PATH}/v1/${cohortId}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCardAPI = (cardId) => {
  return fetch(`${PATH}/v1/${cohortId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
    body: JSON.stringify({ cardId }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeCardAPI = (cardId) => {
  return fetch(`${PATH}/v1/${cohortId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(`Лайк добавлен ${cardId}`);
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const unlikeCardAPI = (cardId) => {
  return fetch(`${PATH}/v1/${cohortId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log(`Лайк удален ${cardId}`);
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateAvatar = (avatar) => {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ avatar }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
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
