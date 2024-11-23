'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';

function VerseCard({ versesObj }) {
  const { user } = useAuth();

  const isOwner = !versesObj.firebaseKey || versesObj.uid === user.uid;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{versesObj.scriptureRef}</Card.Title>
        <h4>{versesObj.topic}</h4>
        <p className="card-text bold">{versesObj.verse_text}</p>
        {isOwner && (
          <Link id="edit" href="/myVerses/edit">
            <Button id="edit" variant="info">
              Edit
            </Button>
          </Link>
        )}
        {/* {isOwner && ( 
          <Button id="delete" variant="danger" onClick={deleteVerse}className="m-2">
            Delete
          </Button>
        )} */}
      </Card.Body>
    </Card>
  );
}

VerseCard.propTypes = {
  versesObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    topic: PropTypes.string,
    scriptureRef: PropTypes.string,
    verse_text: PropTypes.string,
    uid: PropTypes.string,
    // *memorized: PropTypes.bool,
  }).isRequired,
};

export default VerseCard;
