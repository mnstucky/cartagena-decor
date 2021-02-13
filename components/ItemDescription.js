import React from "react";

function ItemDescription({ description }) {
  const formattedDescription = description.map((para) => <p>{para}</p>);
  return (
    <section>
      <h6>Description</h6>
      <p>{formattedDescription}</p>
    </section>
  );
}

export default ItemDescription;