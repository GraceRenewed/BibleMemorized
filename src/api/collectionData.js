import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllCollections = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/collections.json`, {
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

const getAllUserCollections = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/collections.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSingleCollection = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/collections/${firebaseKey}`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllCollections, getAllUserCollections, getSingleCollection };
