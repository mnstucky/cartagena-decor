import React from 'react';

function ItemFeatures({ features }) {
  let uniqueKey = 0;
  // eslint-disable-next-line no-plusplus
  const formattedFeatures = features.map((para) => <li key={uniqueKey++}>{para}</li>);
  return (
    <section className="block">
      <h6>Features</h6>
      <ul>{formattedFeatures}</ul>
    </section>
  );
}

export default ItemFeatures;
