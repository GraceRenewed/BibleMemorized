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
    fetch(`${endpoint}/userCollections.json?orderBy="uid"&equalTo="${uid}"`, {
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
    fetch(`${endpoint}/collections/${firebaseKey}.json`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSingleUserCollection = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userCollections/${firebaseKey}.json`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getCollectionVerses = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses.json?orderBy="collection_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getUserCollectionVerses = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/verses.json?orderBy="collection_id"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const deleteCollection = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userCollections/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

const createCollection = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userCollections.json`, {
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

const updateCollection = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userCollections/${payload.firebaseKey}.json`, {
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

// adds public collection to My Collection Page
const addCollection = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/userCollections.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firebaseKey),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getAllCollections, getAllUserCollections, getUserCollectionVerses, getSingleCollection, getSingleUserCollection, getCollectionVerses, deleteCollection, createCollection, updateCollection, addCollection };
