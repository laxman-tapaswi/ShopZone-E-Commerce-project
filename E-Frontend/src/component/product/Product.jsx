import { Grid } from "@mui/material";
import Layout from "../layout/Layout";

const Product = () => {
  return (
    <Layout>
      <Grid container flex spacing={2} minHeight="85vh">
        <Grid item md={2} sm={4}>
          <h2>Product page</h2>
          <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <li>male</li>
            <li>female</li>
            <li>phone</li>
            <li>laptop</li>
          </ul>
        </Grid>
        <Grid item md={10} sm={8}>
          <h2 style={{ height: "100%", backgroundColor: " white" }}>
            Product card
          </h2>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Product;
