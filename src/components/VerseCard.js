'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { deleteVerse } from '../api/verseData';

function VerseCard({ versesObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisVerse = () => {
    if (window.confirm(`DELETE ${versesObj.scriptureRef}`)) {
      deleteVerse(versesObj.firebaseKey).then(() => onUpdate());
    }
  };

  const isOwner = !versesObj.firebaseKey || versesObj.uid === user.uid;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{versesObj.scriptureRef}</Card.Title>
        <h4>{versesObj.topic}</h4>
        <p className="card-text bold">{versesObj.verse_text}</p>
        {isOwner && (
          <Link href={`/myVerses/edit/${versesObj.firebaseKey}`} passHref>
            <Button id="edit" variant="info">
              Edit
            </Button>
          </Link>
        )}
        {isOwner && (
          <Button id="delete" variant="danger" onClick={deleteThisVerse} className="m-2">
            Delete
          </Button>
        )}
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
  onUpdate: PropTypes.func.isRequired,
};

export default VerseCard;
