import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import useFetch from '../../services/useFetch';
import AdminItemContainer from '../../components/AdminItemContainer';
import LoadingSpinner from '../../components/LoadingSpinner';
import Error from '../../components/Error';

function ItemPage({ itemUrl }) {
  const [session] = useSession();
  if (session?.user?.email !== 'mnstucky@gmail.com') {
    return (
      <div className="container pr-3 pl-3">
        <h1 className="title is-4 mt-2">User Profile</h1>
        <p className="block">
          Sorry, you don't have permission to access this page.
        </p>
      </div>
    );
  }
  const [selection, setSelection] = useState('default');
  const { data: item, error, loading } = useFetch(`getitems?id=${itemUrl}`);
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <AdminItemContainer
      selection={selection}
      setSelection={setSelection}
      item={item}
      itemUrl={itemUrl}
    />
  );
}

ItemPage.getInitialProps = async (context) => ({ itemUrl: context.query.item });

export default ItemPage;
