import React from "react";
import { useRouter } from "next/router";

function ItemPage({ cart, setCart }) {
  const router = useRouter();
  const itemUrl = router.query.item;
  return (
    <div className="container">
      <h1 className="title is-4 mt-2">{itemUrl}</h1>
    </div>
  );
}

export default ItemPage;
