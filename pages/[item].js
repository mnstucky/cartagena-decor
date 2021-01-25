import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ItemPage({ cart, setCart }) {
  const router = useRouter();
  let itemUrl = router.query.item;
  const [item, setItem] = useState(undefined);
  const [options, setOptions] = useState(undefined);
  useEffect(() => {
    // Handle edge case where Next router isn't ready on complete app refresh
    if (itemUrl === undefined) {
      itemUrl = window.location.pathname.slice(1);
    }
    fetch(`/api/db?id=${itemUrl}`).then((res) => {
      if (!res.ok) {
        console.error("Network response wasn't ok");
      }
      res.json().then((data) => {
        setItem(data[0]);
        const optionsToSet = [];
        for (const [key, value] of Object.entries(data[0].multiples.options)) {
          if (value > 0) {
            const keyWithSpacesAdded = key.replace(/([A-Z])/g, ' $1');
	    const formattedOption = keyWithSpacesAdded.charAt(0).toUpperCase() + keyWithSpacesAdded.slice(1);
            optionsToSet.push(formattedOption);
          }
        }
        setOptions(optionsToSet);
      });
    });
  }, []);

  return item === undefined || options === undefined ? (
    <div />
  ) : (
    <div className="container">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <figure className="image box">
            <img src={`/images/${item.images[0]}`} alt="Product for sale" />
          </figure>
        </div>
        <div className="column">
          <section className="box content">
            <p>{item.description}</p>
            <p className="has-text-weight-bold">{item.highlights}</p>
            <div className="select">
              <select>
                {options.map((selection) => <option>{selection}</option>)}
              </select>
            </div>
            <button className="button is-primary">Add to Cart</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
