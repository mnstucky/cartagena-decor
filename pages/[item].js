import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemContainer from '../components/ItemContainer';

function ItemPage({
  cart,
  setCart,
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
            // eslint-disable-next-line no-restricted-syntax
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
    <ItemContainer
      selection={selection}
      setSelection={setSelection}
      item={item}
      itemUrl={itemUrl}
      options={options}
      cart={cart}
      setCart={setCart}
    />
  );
}

export default ItemPage;
