import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import useFetch from "../services/useFetch";
import ItemGrid from "../components/ItemGrid";
import Error from "../components/Error";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import useGetSanityData from "../services/useGetSanityData";
import { Category } from "../types";
import useGetSanityCDNData from "../services/useGetSanityCDNData";

function Shop() {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  }: {
    data: Category[] | null;
    loading: boolean;
    error: boolean;
  } = useGetSanityCDNData("*[_type == 'category']", {}, false);
  const [categoryFilter, setCategoryFilter] = useState<string>("None");
  if (categoriesLoading) return <CircularProgress />;
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h3">Shop</Typography>
      </Grid>
      <Grid item style={{ width: "20rem" }}>
        <FormControl fullWidth>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter-label-id"
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value={"None"}>None</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category.title}>{category.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item container>
        <ItemGrid selectedCategory={categoryFilter} />
      </Grid>
    </Grid>
  );
}

export default Shop;
