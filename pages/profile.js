import { useSession } from 'next-auth/client';
import React from 'react';

function Profile() {
  const [session, loading] = useSession();

  if (typeof window !== 'undefined' && loading) {
    return null;
  }
  if (!session) {
    return (
      <div className="container pr-3 pl-3">
        <h1 className="title is-4 mt-2">User Profile</h1>
        <p className="block">
          Please sign in to access your profile.
        </p>
      </div>
    );
  }
  return (
    <div className="container pr-3 pl-3">
      <h1 className="title is-4 mt-2">User Profile</h1>
      <p className="block">
        Signed in as
        {' '}
        {session.user.email}
      </p>
    </div>
  );
}

export default Profile;
