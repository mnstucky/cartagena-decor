import React, { useEffect } from "react";
import styles from "./ItemGrid.module.css";
import ItemPane from "./ItemPane";

function ItemGrid() {
  useEffect(function () {
    fetch("http://localhost:3000/api/query", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // if (res.status === "success") {
        //   alert("It worked!");
        // } else {
        //   alert("Oh no...");
        // }
      });
  });
  return (
    <section className={styles.grid}>
      <ItemPane source="/IMG_9384.JPG" />
      <ItemPane source="/IMG_9462.JPG" />
      <ItemPane source="/IMG_9476.JPG" />
      <ItemPane source="/IMG_9384.JPG" />
      <ItemPane source="/IMG_9462.JPG" />
      <ItemPane source="/IMG_9476.JPG" />
      <ItemPane source="/IMG_9384.JPG" />
      <ItemPane source="/IMG_9462.JPG" />
      <ItemPane source="/IMG_9476.JPG" />
    </section>
  );
}

export default ItemGrid;
