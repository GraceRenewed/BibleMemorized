'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import { useAuth } from '@/utils/context/authContext';

function CollectionCard({ collectionsObj }) {
  const { user } = useAuth();

  const isOwner = !collectionsObj.firebaseKey || collectionsObj.uid === user.uid;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{collectionsObj.topic}</Card.Title>
        <Link id="view" href="/collection/view">
          View
        </Link>
        {isOwner && (
          <Link id="edit" href="/myCollections/edit">
            Edit
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  collectionsObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    topic: PropTypes.string,
    // *memorized: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
};

export default CollectionCard;
