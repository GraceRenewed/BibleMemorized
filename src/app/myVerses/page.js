'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllUserVerses } from '@/api/verseData';
import { useAuth } from '@/utils/context/authContext';
import VerseCard from '@/components/VerseCard';

export default function MyVerses() {
  // * Set state for verses
  const [verses, setUserVerses] = useState([]);
  // *Get user ID using useAuth hook
  const { user } = useAuth();

  // *Function to get all verses
  const getAllTheVerses = () => {
    getAllUserVerses(user.uid).then(setUserVerses);
  };

  // Api call to get all verses
  useEffect(() => {
    getAllTheVerses();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/myVerses/new" passHref>
        <Button>Add a Verse</Button>
      </Link>
      <div className="d-flex flex-wrap">{verses.length === 0 ? <h2>You have not created any verses</h2> : verses.map((verse) => <VerseCard key={verse.firebaseKey} versesObj={verse} onUpdate={getAllTheVerses} />)}</div>
    </div>
  );
}
