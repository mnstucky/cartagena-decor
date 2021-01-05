import React from "react";
import Image from "next/image";
import styles from "./ItemPane.module.css";
import Link from "next/link";

function ItemPane({ source }) {
  return (
    <figure className={styles.itemContainer}>
      <Image
        src={source}
        alt="Buy me!"
        height={375}
        width={500}
        objectFit="contain"
        className={styles.itemImage}
      />
      <figcaption className={styles.caption}>
        <span className={styles.itemName}>Item Name</span>
        <span className={styles.itemPrice}>$50</span>
      </figcaption>
    </figure>
  );
}

export default ItemPane;
