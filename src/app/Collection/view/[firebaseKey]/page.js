'use client';

import { useEffect, useState, use } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import VerseCard from '../../../../components/VerseCard';
import { getCollectionDetails, getUserCollectionDetails } from '../../../../api/mergedData';
import { getCollectionVerses, getUserCollectionVerses } from '../../../../api/collectionData';

export default function ViewCollection({ params }) {
  const resolvedParams = use(params);
  const { firebaseKey } = resolvedParams;
  const { user } = useAuth();

  const [collectionDetails, setCollectionDetails] = useState({});
  const [verses, setVerses] = useState([]);
  const [filteredVerses, setFilteredVerses] = useState([]);

  // 🔄 Fetch collection and verse data
  const getCollectionView = async () => {
    try {
      const [defaultCollection, userCollection] = await Promise.all([getCollectionDetails(firebaseKey), getUserCollectionDetails(firebaseKey)]);

      const finalCollection = userCollection?.firebaseKey ? userCollection : defaultCollection;
      setCollectionDetails(finalCollection);
    } catch (error) {
      console.error('Error loading collection:', error);
    }

    try {
      const [defaultVerses, userVerses] = await Promise.all([getCollectionVerses(firebaseKey), getUserCollectionVerses(firebaseKey)]);

      // Create a Map to store unique verses by firebaseKey
      const uniqueVerses = new Map();

      // Add default verses first
      defaultVerses.forEach((verse) => {
        uniqueVerses.set(verse.firebaseKey, verse);
      });

      // Add user verses, overwriting any duplicates
      userVerses.forEach((verse) => {
        uniqueVerses.set(verse.firebaseKey, verse);
      });

      // Convert Map values back to array
      setVerses(Array.from(uniqueVerses.values()));
    } catch (error) {
      console.error('Error loading verses:', error);
    }
  };
  // 🔁 On mount
  useEffect(() => {
    getCollectionView();
  }, []);

  // 🔁 Filter verses when user or verses change
  useEffect(() => {
    if (!user) return;
    const filtered = verses.filter((verse) => verse.uid === user.uid || verse.uid === '');
    setFilteredVerses(filtered);
  }, [verses, user]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>{collectionDetails.topic}</h5>
        <div>
          {filteredVerses.map((verse) => (
            <VerseCard key={verse.firebaseKey} versesObj={verse} onUpdate={getCollectionView} />
          ))}
        </div>
      </div>
    </div>
  );
}

ViewCollection.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
