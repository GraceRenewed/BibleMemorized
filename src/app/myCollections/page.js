'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// anything in the src dir, you can use the @ instead of relative paths
import { getAllUserCollections } from '@/api/collectionData';
import { useAuth } from '@/utils/context/authContext';
import MyCollectionsCard from '../../components/MyCollectionsCard';

export default function MyCollectionsPage() {
  // * Set state for collections
  const [collections, setUserCollections] = useState([]);
  // * Get user ID using useAuth hook
  const { user } = useAuth();

  // *function to get all collections
  const getAllTheCollections = () => {
    getAllUserCollections(user.uid).then(setUserCollections);
  };

  // * Api call to get all collections
  useEffect(() => {
    getAllTheCollections();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/myCollections/new" passHref>
        <Button> Make a Collection</Button>
      </Link>
      <div className="d-flex flex-wrap">{collections.length === 0 ? <h2>You have not created any collections</h2> : collections.map((collection) => <MyCollectionsCard key={collection.firebaseKey} collectionsObj={collection} onUpdate={getAllTheCollections} />)}</div>
    </div>
  );
}
