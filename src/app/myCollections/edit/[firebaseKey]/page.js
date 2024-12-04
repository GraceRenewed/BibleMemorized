'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CreateCollectionForm from '@/components/CreateCollectionForm';
import { getSingleCollection } from '../../../../api/collectionData';

export default function EditCollection({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleCollection(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <CreateCollectionForm obj={editItem} />;
}

EditCollection.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
