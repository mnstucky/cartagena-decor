import React, { useState } from 'react';
import ItemPane from './ItemPane';
import useFetch from '../services/useFetch';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';

function ItemGrid() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const { data: items, error, loading } = useFetch('getitems', needsRefresh);
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
    <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
      {items.map((item) => (
        <ItemPane
          image={`https://cartagena-decor.s3.amazonaws.com/${item.images[0]}`}
          name={item.name}
          price={item.price}
          url={item.url}
          key={item.url}
          setNeedsRefresh={setNeedsRefresh}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
