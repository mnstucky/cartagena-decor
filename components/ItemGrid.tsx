import React, { useContext, useState } from "react";
import useFetch from "../services/useFetch";
import Error from "./Error";
import LoadingSpinner from "./LoadingSpinner";
import ControlledSelect from "./ControlledSelect";
import useGetSanityData from "../services/useGetSanityData";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import useGetSanityCDNData from "../services/useGetSanityCDNData";
import { PortableText } from "@portabletext/react";
import { AddShoppingCart, Done } from "@mui/icons-material";
import { Category, Product } from "../types";
import { CartContext } from "./CartContextProvider";

interface Props {
  selectedCategory?: string;
}

function ItemGrid({ selectedCategory }: Props) {
  const { addToCart } = useContext(CartContext);
  const {
    data: items,
    loading,
    error,
  }: {
    data: Product[] | null;
    loading: boolean;
    error: boolean;
  } = useGetSanityData(
    `*[_type == 'product']{title, slug, defaultProductVariant, description, features, variants[]->, categories[]->, "imageUrl": defaultProductVariant.images[0].asset->url}`,
    {},
    false
  );
  const [addedItemIndices, setAddedItemIndices] = useState<number[]>([]);
  const filteredItems =
    selectedCategory === "None"
      ? items
      : items?.filter((item) =>
          item.categories.some(
            (category) => category.title === selectedCategory
          )
        );

  if (loading) {
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
  if (error) {
    return <Error message="Sorry, products failed to load." />;
  }
  return (
    <Grid container spacing={1}>
      {filteredItems.map((item, index) => (
        <Grid item key={index}>
          <Card style={{ width: "300px", height: "100%" }}>
            <CardMedia
              component="img"
              height="170"
              image={item.imageUrl}
              alt="product"
            />
            <Grid
              item
              container
              direction="column"
              sx={{ p: ".5rem", height: "auto" }}
            >
              <Grid item>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
              </Grid>
              <Grid
                item
                xs
                container
                spacing={1}
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Grid item>
                  <IconButton
                    onClick={() => {
                      addToCart(item.defaultProductVariant, 1);
                      setAddedItemIndices((priorIndices) => [
                        ...priorIndices,
                        index,
                      ]);
                    }}
                    size="small"
                  >
                    {addedItemIndices.includes(index) ? (
                      <Done color="primary" />
                    ) : (
                      <AddShoppingCart color="primary" />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemGrid;
