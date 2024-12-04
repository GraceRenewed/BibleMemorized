'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import VerseForm from '@/components/CreateVerseForm';
import { getSingleVerse } from '../../../../api/verseData';

// function that allows a verse to be edited
export default function EditVerse({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  // makes a call to the API to get the verse data
  useEffect(() => {
    getSingleVerse(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return <VerseForm versesObj={editItem} />;
}

EditVerse.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
