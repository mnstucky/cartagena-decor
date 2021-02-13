import React from "react";

function ItemFeatures({ features }) {
  const formattedFeatures = features.map((para) => <p>{para}</p>);
  return (
    <section>
      <h6>Features</h6>
      <p>{formattedFeatures}</p>
    </section>
  );
}

export default ItemFeatures;