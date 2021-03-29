import React from 'react';

function ItemImage({ selection, item, itemUrl }) {
  const convertedImageUrl = `${itemUrl}_${selection.replaceAll(' ', '').toLowerCase()}.JPG`;
  const haveAnImage = item.images.includes(convertedImageUrl);
  return (
    <figure className="image box">
      <img
        src={
          !haveAnImage || selection === undefined || selection === 'default'
            ? `/images/${item.images[0]}`
            : `/images/${itemUrl}_${selection
              .replaceAll(' ', '')
              .toLowerCase()}.JPG`
        }
        alt="Product for sale"
      />
    </figure>
  );
}

export default ItemImage;
