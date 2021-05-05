import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CartImage.module.css';

function CartImage({ item }) {
  return (
    <Link href={`/${item.itemUrl}`}>
      <Image
        className={`${styles.image} image`}
        height="150"
        width="225"
        src={
                  // If an item option doesn't have an associated image, or no option is selected,
                  //  display a default image
              !item.images.includes(`${item.itemUrl}_${item.option.replaceAll(' ', '').toLowerCase()}.JPG`) || item.option === undefined || item.option === 'default'
                ? `https://cartagena-decor.s3.amazonaws.com/${item.itemUrl}_main.JPG`
                : `https://cartagena-decor.s3.amazonaws.com/${item.itemUrl}_${item.option
                  .replaceAll(' ', '')
                  .toLowerCase()}.JPG`
            }
        alt="Product for sale"
      />
    </Link>
  );
}

export default CartImage;
