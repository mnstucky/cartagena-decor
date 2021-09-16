import React, { useState } from 'react';
import ItemPane from './ItemPane';
import useFetch from '../services/useFetch';
import Error from './Error';
import LoadingSpinner from './LoadingSpinner';
import ControlledSelect from './ControlledSelect';

function ItemGrid({ startingCategory }) {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    startingCategory || ''
  );
  const { data: items, error, loading } = useFetch('getitems', needsRefresh);
  // If fetch from DB is still pending, return a loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error />;
  }
  const categories = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  }
  return (
    <div className='is-flex is-flex-direction-column'>
      <ControlledSelect
        fieldName='Filter By Category'
        setField={setSelectedCategory}
        options={categories}
        field={selectedCategory}
      />
      <div className='is-flex is-flex-wrap-wrap is-justify-content-space-evenly'>
        {selectedCategory === 'Coffee' && (
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/IFGh8k17370'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='mb-3 mt-1'
          />
        )}
        {items.map((item) => {
          if (!selectedCategory || selectedCategory === item.category) {
            return (
              <ItemPane
                image={`https://cartagena-decor.s3.amazonaws.com/${item.images[0]}`}
                name={item.name}
                price={item.price}
                url={item.url}
                key={item.url}
                setNeedsRefresh={setNeedsRefresh}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default ItemGrid;
