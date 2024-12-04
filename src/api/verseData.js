import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllVerses = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else resolve([]);
      })
      .catch(reject);
  });

const getAllUserVerses = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getSingleVerse = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses/${firebaseKey}.json`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteVerse = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const createVerse = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateVerse = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllVerses, getAllUserVerses, getSingleVerse, deleteVerse, createVerse, updateVerse };
