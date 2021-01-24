import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function ItemPage({ cart, setCart }) {
  const router = useRouter();
  const itemUrl = router.query.item;
  const [item, setItem] = useState("");
  useEffect(() => {
    fetch(`/api/db?id=${itemUrl}`).then((res) => {
      if (!res.ok) {
        console.error("Network response wasn't ok");
      }
      res.json().then(function (data) {
        setItem(data[0]);
      });
    });
  }, []);

  return (
    <div className="container">
      <h1 className="title is-4 mt-2">{item.name}</h1>
    </div>
  );
}

export default ItemPage;