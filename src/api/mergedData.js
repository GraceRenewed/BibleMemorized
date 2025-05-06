import { getUserCollectionVerses, getSingleCollection } from './collectionData';
// import { getSingleVerse } from "./verseData";

// Get data for viewCollection from firebase
const getCollectionDetails = (firebaseKey, uid) =>
  new Promise((resolve, reject) => {
    // Get single collection and verses/ 2 fetches
    Promise.all([getSingleCollection(firebaseKey), getUserCollectionVerses(uid)])
      .then(([collectionObj, collectionVersesArray]) => {
        resolve({ ...collectionObj, verses: collectionVersesArray });
      })
      .catch((error) => reject(error));
  });

// const getUserCollectionVerses = (uid) =>
//   new Promise((resolve, reject) => {
//     // 2 fetches get user collection and verses
//     Promise.all([get])
//   })

export default getCollectionDetails;
