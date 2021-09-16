import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import useFetch from '../services/useFetch';
import ItemGrid from '../components/ItemGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import Error from '../components/Error';

function Shop() {
  const [session] = useSession();
  const { data: admins, error, loading } = useFetch('getadmins');
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error message='Sorry, administrator data failed to load.' />;
  }
  return (
    <div className='container pr-3 pl-3'>
      <h1 className='title is-4 mt-2'>Shop</h1>
      <ItemGrid startingCategory='Coffee' />
      {admins.some((admin) => admin.email === session?.user?.email) && (
        <Link href='/admin/add'>
          <button type='button' className='button is-primary'>
            Add New Item
          </button>
        </Link>
      )}
    </div>
  );
}

export default Shop;
