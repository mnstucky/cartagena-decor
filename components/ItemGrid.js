import React from 'react';
import ItemPane from './ItemPane';
import useFetch from '../services/useFetch';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';

function ItemGrid() {
  const { data: items, error, loading } = useFetch('db');
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
          image={`images/${item.images[0]}`}
          name={item.name}
          price={item.price}
          url={item.url}
          key={item.url}
        />
      ))}
    </div>
  );
}

export default ItemGrid;
