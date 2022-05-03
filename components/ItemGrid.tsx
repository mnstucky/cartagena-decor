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
import { AddShoppingCart } from "@mui/icons-material";
import { Category, Product } from "../types";
import { CartContext } from "./CartContextProvider";

interface Props {
  startingCategory?: string;
}

function ItemGrid({ startingCategory }: Props) {
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
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  }: {
    data: Category[] | null;
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
    <Grid container spacing={1}>
      {items.map((item) => (
        <Grid item>
          <Card style={{ maxWidth: "400px" }}>
            <CardMedia
              component="img"
              height="170"
              image={item.imageUrl}
              alt="product"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <PortableText value={item.description} />
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item>
                  <Button size="small">Details</Button>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => addToCart(item.defaultProductVariant, 1)}
                    size="small"
                  >
                    <AddShoppingCart color="primary" />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ItemGrid;
