import { getCollectionVerses, getSingleCollection } from './collectionData';
// import { getSingleVerse } from "./verseData";

// Get data for viewCollection
const getCollectionDetails = (firebaseKey) =>
  new Promise((resolve, reject) => {
    // Get single collection
    Promise.all([getSingleCollection(firebaseKey), getCollectionVerses(firebaseKey)])
      .then(([collectionObj, collectionVersesArray]) => {
        resolve({ ...collectionObj, verses: collectionVersesArray });
      })
      .catch((error) => reject(error));
  });

export default getCollectionDetails;
