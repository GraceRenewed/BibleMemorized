'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import _ from 'lodash';
import { addCollection } from '../api/collectionData';

function CollectionCard({ collectionsObj }) {
  const { user } = useAuth();

  const [collectionDetails, setCollectionDetails] = useState();
  const router = useRouter();

  useEffect(() => {
    if (collectionsObj.firebaseKey) setCollectionDetails(collectionsObj);
  }, [collectionsObj]);

  const addThisCollection = () => {
    const addedUserCollection = _.cloneDeep(collectionsObj);
    addedUserCollection.firebaseKey = null;

    const payload = { ...collectionDetails, uid: user.uid };

    if (collectionsObj.firebaseKey) {
      addCollection(payload).then(() => router.push(`/myCollections/`));
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{collectionsObj.topic}</Card.Title>
        <br />
        <Link href={`/Collection/view/${collectionsObj.firebaseKey}`} passHref>
          <Button id="view" variant="primary">
            {' '}
            View{' '}
          </Button>
        </Link>
        <Button id="add" onClick={addThisCollection} className="m-2">
          Add
        </Button>
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  collectionsObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    topic: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  collections: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

export default CollectionCard;
