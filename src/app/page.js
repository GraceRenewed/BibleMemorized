'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllCollections } from '@/api/collectionData';
import { useAuth } from '@/utils/context/authContext';
import CollectionCard from '../components/CollectionCard';

function Home() {
  // * Set state for collections
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);

  // *Get user ID using useAuth hook
  const { user } = useAuth();

  // *function to get all collections
  const getAllTheCollections = () => {
    getAllCollections().then(setCollections);
  };
  // * Api call to get all collections
  useEffect(() => {
    getAllTheCollections();
  }, []);

  useEffect(() => {
    const filtered = collections.filter((collection) => collection.uid !== user.uid);
    setFilteredCollections(filtered);
  }, [collections]);

  return (
    <div className="text-center my-4">
      <Link href="/myCollections/" passHref>
        <Button> Collections</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {filteredCollections.map((collection) => (
          <CollectionCard key={collection.firebaseKey} collectionsObj={collection} onUpdate={getAllTheCollections} />
        ))}
      </div>
    </div>
  );
}

export default Home;
