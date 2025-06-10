'use client';

// import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import _ from 'lodash';

function CollectionCard({ collectionsObj }) {
  const { user } = useAuth();
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const addThisCollection = () => {
    const database = firebase.database();
    const collectionsRef = database.ref('userCollections');

    const addedUserCollection = _.cloneDeep(collectionsObj);

    const newObj = collectionsRef.push();
    const newKey = newObj.key;
    console.log('Cloned data  with new key', newKey);

    const payload = { ...addedUserCollection, firebaseKey: newKey, uid: user.uid };

    newObj.set(payload).then(() => {
      router.push(`/myCollections/`);
    });
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
