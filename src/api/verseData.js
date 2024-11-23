import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllVerses = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}//verses.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve([]);
        }
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
    fetch(`${endpoint}/verses/${firebaseKey}`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// const deleteVerse = (firebaseKey) =>
//   new Promise((resolve, reject) => {
//     fetch(`{endpoint}/verses/${firebaseKey}`, {
//       method: 'Delete',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((data) => resolve(data))
//     .catch(reject);
//   });

export { getAllVerses, getAllUserVerses, getSingleVerse };
