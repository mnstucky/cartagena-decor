import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemSelector from '../components/ItemSelector';
import AddToCartButton from '../components/AddToCartButton';

function ItemPage({
  cart,
  setCart
}) {
  const router = useRouter();
  let itemUrl = router.query.item;
  const [item, setItem] = useState(undefined);
  const [options, setOptions] = useState(undefined);
  const [selection, setSelection] = useState('default');
  useEffect(() => {
    // Handle edge case where Next router isn't ready on complete app refresh
    if (itemUrl === undefined) {
      itemUrl = window.location.pathname.slice(1);
    }
    // Get item from DB by itemUrl
    fetch(`/api/db?id=${itemUrl}`)
      .then((res) => {
        if (!res.ok) {
          console.error('Network response wasn\'t ok');
        }
        res.json()
          .then((data) => {
            // Store the retrieved item
            setItem(data[0]);
            // Format and store the options available for the item
            const optionsToSet = [];
            for (const [key, value] of Object.entries(data[0].multiples.options)) {
              if (value > 0) {
                const keyWithSpacesAdded = key.replace(/([A-Z])/g, ' $1');
                const formattedOption = keyWithSpacesAdded.charAt(0)
                  .toUpperCase() + keyWithSpacesAdded.slice(1);
                optionsToSet.push(formattedOption);
              }
            }
            setOptions(optionsToSet);
          });
      });
  }, []);
  // If fetch from DB is still pending, return an empty div
  return item === undefined || options === undefined ? (
    <div />
  ) : (
    <div className="container">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <figure className="image box">
            <img
              src={selection === undefined || selection === 'default' ? `/images/${item.images[0]}` : `/images/${itemUrl}_${selection.replace(' ', '')
                .toLowerCase()}.JPG`}
              alt="Product for sale"
            />
          </figure>
        </div>
        <div className="column">
          <section className="box content">
            <p>{item.description}</p>
            <p>{item.features}</p>
            <p className="has-text-weight-bold">{item.highlights}</p>
            <ItemSelector options={options} selection={selection} setSelection={setSelection} />
            <AddToCartButton cart={cart} setCart={setCart} itemUrl={itemUrl} selection={selection} item={item} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
