import React, { useState } from 'react';
import ItemContainer from '../components/ItemContainer';
import useFetch from '../services/useFetch';
import Error from '../components/Error';

function ItemPage({ itemUrl }) {
  const [selection, setSelection] = useState('default');
  // Get item from DB by itemUrl
  const { data: item, error, loading } = useFetch(`db?id=${itemUrl}`);
  const spinnerStyles = { minHeight: '60vh' };
  // If fetch from DB is still pending, return a loading spinner
  if (loading) {
    return (
      <div className="is-flex is-justify-content-center is-align-items-center" style={spinnerStyles}>
        <div className="sk-chase">
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
          <div className="sk-chase-dot" />
        </div>
      </div>
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
