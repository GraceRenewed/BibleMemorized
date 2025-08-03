import { getUserCollectionVerses, getSingleCollection, getSingleUserCollection, getCollectionVerses } from './collectionData';

// Get data for viewCollection from firebase
const getCollectionDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    // Get single collection and verses/ 2 fetches
    Promise.all([getSingleCollection(firebaseKey), getCollectionVerses(firebaseKey)])
      .then(([collectionObj, collectionVersesArray]) => {
        resolve({ ...collectionObj, verses: collectionVersesArray });
      })
      .catch((error) => reject(error));
  });

const getUserCollectionDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleUserCollection(firebaseKey), getUserCollectionVerses(firebaseKey)])
      .then(([collectionsObj, collectionVersesArray]) => {
        resolve({ ...collectionsObj, verses: collectionVersesArray });
      })
      .catch((error) => reject(error));
  });

export { getCollectionDetails, getUserCollectionDetails };
