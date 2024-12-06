'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { getAllCollections } from '@/api/collectionData';
import { createVerse, updateVerse } from '../api/verseData';

// clears ou the form after the user submits the form
const initialState = {
  scriptureRef: '',
  verse_text: '',
  collection_id: '',
  topic: '',
  memorized: false,
};

// pulls in user and object details
function CreateVerseForm({ versesObj = initialState }) {
  const { user } = useAuth();
  const [verseDetails, setVerseDetails] = useState(initialState);
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  // brings verse data in for editing the verse
  useEffect(() => {
    getAllCollections().then(setCollections);

    if (versesObj.firebaseKey) setVerseDetails(versesObj);
  }, [versesObj]);

  // Gives access to the verse object, destructing the name and the value of the form input
  const handleVerseUpdate = (e) => {
    const { name, value } = e.target;
    // calling setVerseDetails modifying prevState and spreading it
    setVerseDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // when the submit button is pressed this function is run and prevents page from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...verseDetails, uid: user.uid };
    // if object already had a firebaseKey then the updateVerse function is called, router puses the updated info to verses page -else creates a new verse
    if (versesObj.firebaseKey) {
      updateVerse(payload).then(() => router.push(`/myVerses/`));
    } else {
      createVerse(payload).then(() => {
        router.push(`/myVerses/`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{versesObj.firebaseKey ? 'Update' : 'Create'} Verse</h2>

      {/* Scripture Reference input */}
      <FloatingLabel controlId="floatingInput1" label="Scripture Reference" className="mb-3">
        <Form.Control type="text" placeholder="Scripture Reference" name="scriptureRef" value={verseDetails.scriptureRef} onChange={handleVerseUpdate} required />
      </FloatingLabel>

      {/* Scripture input */}
      <FloatingLabel controlId="floatingInput3" label="Scripture" className="mb-3">
        <Form.Control type="text" placeholder="Scripture" name="verse_text" value={verseDetails.verse_text} onChange={handleVerseUpdate} required />
      </FloatingLabel>

      {/* Dropdown to select a collection */}
      <FloatingLabel controlId="floatingSelect" label="Collection Name">
        <Form.Select aria-label="Collections" name="collection_id" onChange={handleVerseUpdate} className="mb-3" value={verseDetails.collection_id || ''} required>
          <option value="">Select a Collection</option>
          {collections.map((collection) => (
            <option key={collection.firebaseKey} value={collection.firebaseKey}>
              {collection.topic}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* Topic input */}
      <FloatingLabel controlId="floatingInput3" label="Topic" className="mb-3">
        <Form.Control type="text" placeholder="Topic" name="topic" value={verseDetails.topic} onChange={handleVerseUpdate} required />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="memorized"
        name="memorized"
        label="Memorized?"
        checked={verseDetails.memorized}
        onChange={(e) => {
          setVerseDetails((prevState) => ({
            ...prevState,
            memorized: e.target.checked,
          }));
        }}
      />

      <Button type="submit">{versesObj.firebaseKey ? 'Update' : 'Create'} Verse</Button>
    </Form>
  );
}

CreateVerseForm.propTypes = {
  versesObj: PropTypes.shape({
    scriptureRef: PropTypes.string,
    verse_text: PropTypes.string,
    firebaseKey: PropTypes.string,
    collection_id: PropTypes.string,
    topic: PropTypes.string,
    memorized: PropTypes.bool,
  }),
};

export default CreateVerseForm;
