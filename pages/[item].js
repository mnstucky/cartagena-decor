import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ItemPage({ cart, setCart }) {
  const router = useRouter();
  let itemUrl = router.query["item"];
  const [item, setItem] = useState(undefined);
  useEffect(() => {
    // Handle edge case where Next router isn't ready on complete app refresh
    if (itemUrl == undefined) {
      itemUrl = window.location.pathname.slice(1);
    }
    console.log(itemUrl);
    fetch(`/api/db?id=${itemUrl}`).then((res) => {
      if (!res.ok) {
        console.error("Network response wasn't ok");
      }
      res.json().then(function (data) {
        console.log("useEffect triggered");
        setItem(data[0]);
      });
    });
  }, []);
  const gridStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  };
  return item == undefined ? (
    <div></div>
  ) : (
    <div className="container">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <figure className="image box">
            <img src={`/images/${item.images[0]}`} />
          </figure>
        </div>
        <div className="column">
          <section className="box content">
            <p>{item.description}</p>
            <p className="has-text-weight-bold">{item.highlights}</p>
            {item.multiples.hasMultiples && (
              <div class="select">
                <select></select>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemPage;
