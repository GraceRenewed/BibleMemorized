'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import { createCollection, updateCollection } from '../api/collectionData';

// clears out the form after the user submits the form
const initialState = {
  topic: '',
};

// pulls in user and object details
function CreateCollectionForm({ obj = initialState }) {
  const { user } = useAuth();
  const [collectionDetails, setCollectionDetails] = useState(initialState);
  const router = useRouter();

  // brings collection data in for editing the collection
  useEffect(() => {
    if (obj.firebaseKey) setCollectionDetails(obj);
  }, [obj]);

  // Grants access to the collection object, deconstructing the name and the value of the form input
  const handleCollectionUpdate = (e) => {
    const { name, value } = e.target;
    // calling setCollectionDetails modifying prevState and spreading it
    setCollectionDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // when submit button is pressed this function is run and prevents page from reloading
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...collectionDetails, uid: user.uid };
    // if the object already has an id then the updateCollection function is called the router pushes the updated information to the collections page-else it creates a new collection
    if (obj.firebaseKey) {
      updateCollection(payload).then(() => router.push(`/myCollections/`));
    } else {
      createCollection(payload).then(() => {
        router.push(`/myCollections/`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Collection</h2>

      <FloatingLabel controlId="floatingInput1" label="Collection Name" className="mb-3">
        <Form.Control type="text" placeholder="topic" name="topic" value={collectionDetails.topic} onChange={handleCollectionUpdate} required />
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Collection</Button>
    </Form>
  );
}

CreateCollectionForm.propTypes = {
  obj: PropTypes.shape({
    topic: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default CreateCollectionForm;
