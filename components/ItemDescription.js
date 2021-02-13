import React from "react";

function ItemDescription({ description }) {
  const formattedDescription = description.map((para) => <li>{para}</li>);
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
