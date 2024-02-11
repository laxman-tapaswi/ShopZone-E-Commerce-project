import { Grid } from "@mui/material";
import Layout from "../layout/Layout";

const Cart = () => {
  return (
    <Layout>
      <Grid container flex direction="column" justifyContent="center">
        <Grid item md={10} sm={12}>
          <h2>Cart page</h2>
          <ul
            style={{ display: "flex", marginBottom: "2rem", listStyle: "none" }}
          >
            <li style={{ width: "35%" }}>Product</li>
            <li style={{ width: "25%" }}>Quantity</li>
            <li style={{ width: "20%" }}>Price</li>
            <li style={{ width: "15%" }}>TotalPrice</li>
          </ul>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;
