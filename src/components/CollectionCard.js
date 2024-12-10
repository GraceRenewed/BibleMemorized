'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { addCollection } from '../api/collectionData';

function CollectionCard({ collectionsObj, onUpdate }) {
  const addThisCollection = () => {
    addCollection(collectionsObj.firebaseKey).then(() => onUpdate());
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
        <Link href={`/myCollections/${collectionsObj.firebaseKey}`} passHref>
          <Button id="add" onClick={addThisCollection}>
            Add
          </Button>
        </Link>
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
  onUpdate: PropTypes.func.isRequired,
};

export default CollectionCard;
