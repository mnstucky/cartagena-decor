import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import ItemSelector from './ItemSelector';
import AddToCartButton from './AddToCartButton';
import ItemImage from './ItemImage';
import ItemDescription from './ItemDescription';
import ItemFeatures from './ItemFeatures';
import GoToCartButton from './GoToCartButton';
import QuantitySelector from './QuantitySelector';

function ItemContainer({
  selection,
  setSelection,
  item,
  itemUrl,
}) {
  const [session, loading] = useSession();
  const [cartButtonVisibility, setCartButtonVisibility] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const options = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(item.multiples.options)) {
    if (value > 0) {
      const keyWithSpacesAdded = key.replace(/([A-Z])/g, ' $1');
      const formattedOption = keyWithSpacesAdded.charAt(0)
        .toUpperCase() + keyWithSpacesAdded.slice(1);
      options.push(formattedOption);
    }
  }
  return (
    <div className="container pl-3 pr-3">
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
            <div className="is-flex is-flex-wrap-wrap">
              <ItemSelector
                options={options}
                selection={selection}
                setSelection={setSelection}
              />
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
            <div className="is-flex is-align-items-center">
              <AddToCartButton
                itemUrl={itemUrl}
                selection={selection}
                item={item}
                setCartButtonVisibility={setCartButtonVisibility}
                quantity={quantity}
              />
              <p className="has-text-weight-bold mb-0 ml-2 mr-2">
                $
                {item.price}
              </p>
              <GoToCartButton cartButtonVisibility={cartButtonVisibility} />
            </div>
            {/* TODO: Link to database */}
            {session?.user?.email === 'mnstucky@gmail.com' && (
              <Link href={`/admin/${itemUrl}`}>
                <button className="button is-info mt-2">Edit Item</button>
              </Link>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemContainer;
