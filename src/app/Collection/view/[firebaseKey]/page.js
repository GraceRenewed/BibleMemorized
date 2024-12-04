'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import VerseCard from '@/components/VerseCard';
import getCollectionDetails from '@/api/mergedData';
import { getCollectionVerses } from '@/api/collectionData';
// import { useAuth } from '@/utils/context/authContext';
// *import { createMemorized }

// React Component
export default function ViewCollection({ params }) {
  // Component State collDet holds details of state/setCollDet updates state, default empty object
  const [collectionDetails, setCollectionDetails] = useState({});
  const [verses, setVerses] = useState([{}]);

  // extracts firebaseKey from the params object
  const { firebaseKey } = params;

  // hook that provides user related information, extracts user from the object

  const getCollectionView = () => {
    getCollectionDetails(firebaseKey).then(setCollectionDetails);
    getCollectionVerses(firebaseKey).then(setVerses);
  };

  useEffect(() => {
    getCollectionView();
  }, []);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{collectionDetails.topic}</h5>
        <h6>
          {verses.map((verse) => (
            <VerseCard key={verse.firebaseKey} versesObj={verse} onUpdate={getCollectionView} />
          ))}
        </h6>
      </div>
    </div>
  );
}

ViewCollection.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
