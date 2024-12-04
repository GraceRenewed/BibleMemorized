'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// anything in the src dir, you can use the @ instead of relative paths
import { getAllCollections } from '@/api/collectionData';
import CollectionCard from '../components/CollectionCard';

function Home() {
  // * Set state for collections
  const [collections, setCollections] = useState([]);

  // *function to get all collections
  const getAllTheCollections = () => {
    getAllCollections().then(setCollections);
  };

  // * Api call to get all collections
  useEffect(() => {
    getAllTheCollections();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/myCollections/" passHref>
        <Button> My Collections</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {collections.map((collection) => (
          <CollectionCard key={collection.firebaseKey} collectionsObj={collection} onUpdate={getAllTheCollections} />
        ))}
      </div>
    </div>
  );
}

export default Home;
