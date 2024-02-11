import styled from "@emotion/styled";
import {
  LoginOutlined,
  Person2Rounded,
  ShoppingBag,
  ShoppingBagOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { Badge, Typography } from "@mui/material";
import { useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const [item, setItem] = useState(0);
  const [auth, setAuth] = useState({
    name: "lucky",
  });
  const admin = false;

  return (
    <Container>
      <nav>
        <Link to="/">
          <Typography>
            <ShoppingBag
              sx={{ position: "relative", top: "3px", left: "-4px" }}
            />
            E-commerce
          </Typography>
        </Link>
        <ul>
          {admin ? (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <Link to="/product">Shop</Link>
          </li>
          <li>
            <Link to="/profile">
              {auth ? auth.name : <Person2Rounded sx={{ marginTop: "3px" }} />}
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <ShoppingBagOutlined sx={{ marginTop: "4px" }} />
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setItem((pre) => pre + 1)}>
              <Badge badgeContent={item} color="primary">
                <ShoppingCart color="action" />
              </Badge>
            </Link>
          </li>
          {auth ? (
            <li>
              {/* <Link to="/logout"> */}
              <LoginOutlined
                sx={{ marginTop: "5px" }}
                onClick={() => setAuth(null)}
              />
              {/* </Link> */}
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </Container>
  );
};

export default Header;

const Container = styled("div")({
  width: "100%",
  height: "55px",
  boxShadow: "4px 2px 6px grey",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto",
    a: {
      textDecoration: "none",
      p: {
        fontSize: "1.4rem",
        fontWeight: "700",
        color: "#d2691e",
        letterSpacing: "2px",
      },
    },
    ul: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "22px",
      listStyle: "none",
      li: {
        fontSize: "17px",
        position: "relative",
        a: {
          textDecoration: "none",
          fontWeight: "600",
          color: "#5f5151",
        },
      },
    },
  },
});
