'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { useAuth } from '@/utils/context/authContext';
import { deleteCollection } from '../api/collectionData';

function MyCollectionsCard({ collectionsObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisCollection = () => {
    if (window.confirm(`Delete ${collectionsObj.topic}`)) {
      console.log(collectionsObj);
      deleteCollection(collectionsObj.firebaseKey).then(() => onUpdate());
    }
  };

  const isOwner = !collectionsObj.firebaseKey || collectionsObj.uid === user.uid;

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
        {isOwner && (
          <Link href={`/myCollections/edit/${collectionsObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
          </Link>
        )}
        {isOwner && (
          <Button id="delete" onClick={deleteThisCollection} className="m-2">
            Delete
          </Button>
        )}
      </Card.Body>

      {/* Memorized ? */}
      {isOwner && (
        <p className="cart-text bold">
          {collectionsObj.memorized && (
            <span>
              Memorized
              <br />
            </span>
          )}
        </p>
      )}
    </Card>
  );
}

MyCollectionsCard.propTypes = {
  collectionsObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    topic: PropTypes.string,
    memorized: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MyCollectionsCard;
