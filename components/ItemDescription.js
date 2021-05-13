import React from 'react';

function ItemDescription({ description }) {
  let uniqueKey = 0;
  // eslint-disable-next-line no-plusplus
  const formattedDescription = description.map((para) => <li key={uniqueKey++}>{para}</li>);
  return (
    <section className="block">
      <h6>Description</h6>
      <ul>
        {formattedDescription}
      </ul>
    </section>
  );
}

export default ItemDescription;
