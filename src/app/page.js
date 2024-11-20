// 'use client';

//  // any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Button } from 'react-bootstrap';
//  // anything in the src dir, you can use the @ instead of relative paths
// import { getAllUserCollections } from '@/api/collectionData';
// import { useAuth } from '@/utils/context/authContext';

// export default function CollectionsPage() {
//   // *set state for collections
//   const [collections, setCollections] = useState([]);

//   const { user } = useAuth();

//   // *function to get all collections
//   const getAllCollections = () => {
//     getAllUserCollections(user.uid).then(setCollections);
//     console.log(user.uid);
//   };
//   // * make api call to get collections
//   useEffect(() => {
//     getAllCollections();
//   }, [user]);

//   return (
//     <div className='text-center my-4'>
//       <Link href="/myCollections/edit/new" passHref>
//         <Button> Add Event</Button>
//       </Link>
//       <div className="d-flex flex-wrap">{collections.length === 0 ? <h2>You have not created any events</h2> : collections.map((collection) =>
//           <CollectionsCard key={collection.id} collectionsObj={collection} onUpdate={getAllCollections} />)}</div>
//     </div>
//   );
// }
