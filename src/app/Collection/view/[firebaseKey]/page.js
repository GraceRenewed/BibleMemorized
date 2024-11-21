// 'use client';

// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
// import { getSingleCollection } from '../../../../api/collectionData';
// import { useAuth } from '@/utils/context/authContext'
// // *import { createMemorized }

// export default function ViewCollection({ params }) {
//   const [collectionView, setCollectionView] = useState({});
//   const { firebaseKey } = params;
//   const { user } = useAuth();

//   useEffect(() => {
//     getSingleCollection(firebaseKey).then((data) => {
//       setCollectionView(data);
//     });
//   }, [firebaseKey, user]);

//   const isOwner = !firebaseKey || user.uid === user.firebaseKey;

//   return (

//   );
// }
