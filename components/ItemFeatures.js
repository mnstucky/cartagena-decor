import React from 'react';

function ItemFeatures({ features }) {
  const formattedFeatures = features.map((para) => <li>{para}</li>);
  return (
    <section className="block">
      <h6>Features</h6>
      <ul>{formattedFeatures}</ul>
    </section>
  );
}

export default ItemFeatures;
