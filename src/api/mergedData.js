import { getUserCollectionVerses, getSingleCollection } from './collectionData';

// Get data for viewCollection from firebase
const getCollectionDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    // Get single collection and verses/ 2 fetches
    Promise.all([getSingleCollection(firebaseKey), getUserCollectionVerses(firebaseKey)])
      .then(([collectionObj, collectionVersesArray]) => {
        resolve({ ...collectionObj, verses: collectionVersesArray });
      })
      .catch((error) => reject(error));
  });

export default getCollectionDetails;
