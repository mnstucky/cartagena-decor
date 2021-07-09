import React, { useState } from "react";
import ItemPane from "./ItemPane";
import useFetch from "../services/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
import ControlledSelect from "./ControlledSelect";

function ItemGrid({ startingCategory }) {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    startingCategory || ""
  );
  const { data: items, error, loading } = useFetch("getitems", needsRefresh);
  // If fetch from DB is still pending, return a loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Error />;
  }
  const categories = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
  }
  return (
    <>
      <ControlledSelect
        fieldName="Filter By Category"
        setField={setSelectedCategory}
        options={categories}
        defaultValue={startingCategory || "All"}
      />
      <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
        {items.map((item) => {
          if (!selectedCategory || selectedCategory === item.category) {
            return (
              <ItemPane
                image={`https://cartagena-decor.s3.amazonaws.com/${item.images[0]}`}
                name={item.name}
                price={item.price}
                url={item.url}
                key={item.url}
                setNeedsRefresh={setNeedsRefresh}
              />
            );
          }
        })}
      </div>
    </>
  );
}

export default ItemGrid;
