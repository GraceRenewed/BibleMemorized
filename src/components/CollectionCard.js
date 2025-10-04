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

  const database = firebase.database();
  const collectionsRef = database.ref('userCollections');

  // eslint-disable-next-line no-unused-vars
  const addThisCollection = () => {
    const addedUserCollection = _.cloneDeep(collectionsObj);

    const newObj = collectionsRef.push();
    const newKey = newObj.key;

    const payload = { ...addedUserCollection, firebaseKey: newKey, uid: user.uid };

    return newObj.set(payload).then(() => {
      console.log('Cloned data  with new key', newKey);
      return newKey;
    });
  };

  const addCollectionVerses = (newCollectionKey, versesArray = []) => {
    const versesRef = firebase.database().ref('userVerses');

    const pushVerses = versesArray.map((verse) => {
      const newVerseRef = versesRef.push();
      const newVerseKey = newVerseRef.key;

      const payload = {
        ...verse,
        collections_id: newCollectionKey,
        firebaseKey: newVerseKey,
        uid: user.uid,
        topic: verse.topic,
        scriptureRef: verse.scriptureRef,
        verse_text: verse.verse_text,
        memorized: verse.memorized,
      };
      return newVerseRef.set(payload);
    });
    return Promise.all(pushVerses);
  };

  const fetchVersesByCollection = (collectionKey) => {
    const versesRef = firebase.database().ref('userVerses');

    return versesRef
      .orderByChild('collection_id')
      .equalTo(collectionKey)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (!data) return [];
        return Object.values(data); // Each verse object
      });
  };

  const handleAdd = () => {
    const originalCollectionKey = collectionsObj.firebaseKey;

    addThisCollection()
      .then((newCollectionKey) => fetchVersesByCollection(originalCollectionKey).then((verses) => addCollectionVerses(newCollectionKey, verses)))
      .then(() => {
        router.push('/myCollections/');
      })
      .catch((err) => {
        console.error('Error adding collection and verses:', err);
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
        <Button id="add" onClick={handleAdd} className="m-2">
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
  versesObj: PropTypes.shape({
    collection_id: PropTypes.string,
    firebaseKey: PropTypes.string,
    topic: PropTypes.string,
    uid: PropTypes.string,
    memorized: PropTypes.bool,
    scriptureRef: PropTypes.string,
    verse_text: PropTypes.string,
  }).isRequired,
  collections: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
  verses: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

export default CollectionCard;
