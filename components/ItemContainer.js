import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import useFetch from "../services/useFetch";
import ItemSelector from "./ItemSelector";
import AddToCartButton from "./AddToCartButton";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import ItemFeatures from "./ItemFeatures";
import GoToCartButton from "./GoToCartButton";
import QuantitySelector from "./QuantitySelector";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";

function ItemContainer({ selection, setSelection, item, itemUrl }) {
  const [session, sessionLoading] = useSession();
  const [cartButtonVisibility, setCartButtonVisibility] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addButtonDisabled, setAddButtonDisabled] = useState(
    item.multiples.hasMultiples && selection === "default"
  );
  const { data: admins, error, loading } = useFetch("getadmins");
  const options = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(item.multiples.options)) {
    if (value > 0) {
      const keyWithSpacesAdded = key.replace(/([A-Z])/g, " $1");
      const formattedOption =
        keyWithSpacesAdded.charAt(0).toUpperCase() +
        keyWithSpacesAdded.slice(1);
      options.push(formattedOption);
    }
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error message="Admin users failed to fetch." />;
  }
  return (
    <div className="container pl-3 pr-3">
      <h1 className="title is-4 mt-2 has-text-centered">{item.name}</h1>
      <div className="columns">
        <div className="column">
          <ItemImage selection={selection} item={item} itemUrl={itemUrl} />
        </div>
        <div className="column">
          <section className="box content">
            <ItemDescription description={item.description} />
            <ItemFeatures features={item.features} />
            <p className="has-text-weight-bold">{item.highlights}</p>
            <div className="is-flex is-flex-wrap-wrap">
              <ItemSelector
                options={options}
                selection={selection}
                setSelection={setSelection}
              />
              {!(item.multiples.hasMultiples && selection === "default") && (
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  selection={selection}
                  maxQuantity={
                    !item.multiples.hasMultiples
                      ? item.stock
                      : item.multiples.options[
                          selection.charAt(0).toLowerCase() +
                            selection.slice(1).replaceAll(" ", "")
                        ]
                  }
                />
              )}
            </div>
            <div className="is-flex is-align-items-center">
              <AddToCartButton
                itemUrl={itemUrl}
                selection={selection}
                item={item}
                setCartButtonVisibility={setCartButtonVisibility}
                quantity={quantity}
                isDisabled={addButtonDisabled}
                setIsDisabled={setAddButtonDisabled}
              />

              <p className="has-text-weight-bold mb-0 ml-2 mr-2">
                ${item.price}
                {" x "}
                {quantity}
                {" = "}${(item.price * quantity).toFixed(2)}
              </p>
              <GoToCartButton cartButtonVisibility={cartButtonVisibility} />
            </div>
            {item.multiples.hasMultiples && selection === "default" && (
              <p className="has-text-danger-dark">
                You must select an option to add to cart.
              </p>
            )}
            {admins.some((admin) => admin.email === session?.user?.email) && (
              <Link href={`/admin/${itemUrl}`}>
                <button type="button" className="button is-info mt-2">
                  Edit Item
                </button>
              </Link>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default ItemContainer;
