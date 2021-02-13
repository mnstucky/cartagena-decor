import React from 'react';

function ItemImage({ selection, item, itemUrl }) {
  return (
    <figure className="image box">
      <img
        src={
          selection === undefined || selection === "default"
            ? `/images/${item.images[0]}`
            : `/images/${itemUrl}_${selection
                .replaceAll(" ", "")
                .toLowerCase()}.JPG`
        }
        alt="Product for sale"
      />
    </figure>
  );
}

export default ItemImage;
