import React from 'react';
import ItemSelector from './ItemSelector';
import AddToCartButton from './AddToCartButton';
import ItemImage from './ItemImage';
import ItemDescription from './ItemDescription';
import ItemFeatures from './ItemFeatures';

function ItemContainer({
  selection,
  setSelection,
  item,
  itemUrl,
  options,
  cart,
  setCart,
}) {
  return (
    <div className="container">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <ItemImage selection={selection} item={item} itemUrl={itemUrl} />
        </div>
        <div className="column">
          <section className="box content">
            <ItemDescription description={item.description} />
            <ItemFeatures features={item.features} />
            <p className="has-text-weight-bold">{item.highlights}</p>
            <ItemSelector
              options={options}
              selection={selection}
              setSelection={setSelection}
            />
            <div className="is-flex is-align-content-center">
              <AddToCartButton
                cart={cart}
                setCart={setCart}
                itemUrl={itemUrl}
                selection={selection}
                item={item}
              />
              <p className="has-text-weight-bold mt-2 ml-3">${item.price}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemContainer;
