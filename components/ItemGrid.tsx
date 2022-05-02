import React, { useState } from "react";
import ItemPane from "./ItemPane";
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
  Typography,
} from "@mui/material";
import useGetSanityCDNData from "../services/useGetSanityCDNData";
import { PortableText } from "@portabletext/react";

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
  imageUrl: string;
};

interface Props {
  startingCategory?: string;
}

function ItemGrid({ startingCategory }: Props) {
  const {
    data: items,
    loading,
    error,
  }: {
    data: Product[] | null;
    loading: boolean;
    error: boolean;
  } = useGetSanityData(
    `*[_type == 'product']{title, defaultProductVariant, description, features, variants[]->, categories[]->, "imageUrl": defaultProductVariant.images[0].asset->url}`,
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
    <Grid container>
      {items.map((item) => (
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
            <Typography variant="body2" color="text.secondary">
              <PortableText value={item.description} />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Details</Button>
            <Button size="small">Add to Cart</Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}

export default ItemGrid;
