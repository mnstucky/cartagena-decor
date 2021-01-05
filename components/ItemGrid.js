import React from "react";
import styles from "./ItemGrid.module.css";
import ItemPane from "./ItemPane";

function ItemGrid() {
  return (
    <section className={styles.grid}>
        <ItemPane source="/IMG_9384.JPG"/>
        <ItemPane source="/IMG_9462.JPG"/>
        <ItemPane source="/IMG_9476.JPG"/>
        <ItemPane source="/IMG_9384.JPG"/>
        <ItemPane source="/IMG_9462.JPG"/>
        <ItemPane source="/IMG_9476.JPG"/>
        <ItemPane source="/IMG_9384.JPG"/>
        <ItemPane source="/IMG_9462.JPG"/>
        <ItemPane source="/IMG_9476.JPG"/>
    </section>
  );
}

export default ItemGrid;
