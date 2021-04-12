import React, { useState } from 'react';
import ItemContainer from '../components/ItemContainer';
import useFetch from '../services/useFetch';
import Error from '../components/Error';
import LoadingSpinner from '../components/LoadingSpinner';

function ItemPage({ itemUrl }) {
  const [selection, setSelection] = useState('default');
  // Get item from DB by itemUrl
  const { data: item, error, loading } = useFetch(`db?id=${itemUrl}`);
  // If fetch from DB is still pending, return a loading spinner
  if (loading) {
    return (
      <LoadingSpinner />
    );
  }
  if (error) {
    return <Error />;
  }
  return (
    <ItemContainer
      selection={selection}
      setSelection={setSelection}
      item={item}
      itemUrl={itemUrl}
    />
  );
}

ItemPage.getInitialProps = async (context) => ({ itemUrl: context.query.item });

export default ItemPage;
