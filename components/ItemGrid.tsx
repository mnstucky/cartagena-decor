import React, { useState } from "react";
import ItemPane from "./ItemPane";
import useFetch from "../services/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
import ControlledSelect from "./ControlledSelect";
import useGetSanityData from "../services/useGetSanityData";
import { CircularProgress, Grid } from "@mui/material";
import useGetSanityCDNData from "../services/useGetSanityCDNData";

type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: string;
  };
};

type Category = {
  title: string;
  _type: "category";
};

type ProductVariant = {
  images: SanityImage[];
  price: number;
  quantity: number;
  title: string;
  _type: "productVariant";
};

type Product = {
  categories: Category[];
  defaultProductVariant: ProductVariant;
  description: any[];
  features: any[];
  slug: { current: string; _type: "slug" };
  title: string;
  variants: null | ProductVariant[];
};

interface Props {
  startingCategory?: string;
}

function ItemGrid({ startingCategory }: Props) {
  const {
    data: items,
    loading,
    error,
  } = useGetSanityData(
    "*[_type == 'product']{title, defaultProductVariant, description, features, variants[]->, categories[]->}",
    {},
    false
  );
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  }: {
    data: Category[];
    loading: boolean;
    error: boolean;
  } = useGetSanityCDNData("*[_type == 'category']", {}, false);
  const [selectedCategory, setSelectedCategory] = useState(
    startingCategory || ""
  );
  if (loading || categoriesLoading) {
    return (
      <Grid
        container
        style={{ height: "80vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
  if (error || categoriesError) {
    return <Error message="Sorry, products failed to load." />;
  }
  return (
    <div className="is-flex is-flex-direction-column">
      <div className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
        {selectedCategory === "Coffee" && (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/IFGh8k17370"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="mb-3 mt-1"
          />
        )}
        {items.map((item) => {
          if (!selectedCategory || selectedCategory === item.category) {
            return (
              <ItemPane
                image={""}
                name={item.name}
                price={item.price}
                url={item.url}
                key={item.url}
                setNeedsRefresh={false}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default ItemGrid;
