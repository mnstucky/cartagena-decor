import React from 'react';

function ItemImage({ selection, item, itemUrl }) {
  const convertedImageUrl = `${itemUrl}_${selection.replaceAll(' ', '').toLowerCase()}.JPG`;
  const haveAnImage = item.images.includes(convertedImageUrl);
  return (
    <figure className="image box">
      <img
        src={
          !haveAnImage || false || selection === 'default'
            ? `https://cartagena-decor.s3.amazonaws.com/${itemUrl}_main.JPG`
            : `https://cartagena-decor.s3.amazonaws.com/${itemUrl}_${selection
              .replaceAll(' ', '')
              .toLowerCase()}.JPG`
        }
        alt="Product for sale"
      />
    </figure>
  );
}

export default ItemImage;
