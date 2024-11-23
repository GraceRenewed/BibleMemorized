'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import VerseCard from '@/components/VerseCard';
import { useAuth } from '@/utils/context/authContext';
import { getAllUserVerses } from '../../api/verseData';

export default function MyVerses() {
  // * Set state for verses
  const [verses, setVerses] = useState([]);
  // *Get user ID using useAuth hook
  const { user } = useAuth();

  // *Function to get all verses
  const getAllTheUserVerses = () => {
    getAllUserVerses(user.uid).then(setVerses);
  };

  // Api call to get all verses
  useEffect(() => {
    getAllTheUserVerses();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/myVerses/edit/new" passHref>
        <Button>Add a Verse</Button>
      </Link>
      <div className="d-flex flex-wrap">{verses.length === 0 ? <h2>You have not created any verses</h2> : verses.map((verse) => <VerseCard key={verse.firebaseKey} versesObj={verse} onUpdate={getAllTheUserVerses} />)}</div>
    </div>
  );
}
