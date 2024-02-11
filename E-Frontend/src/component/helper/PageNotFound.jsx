import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "center",
          marginTop: "5%",
          color: "#ef5959",
          backgroundColor: "#efe8e8",
          padding: "7rem 4rem",
        }}
      >
        <h1 style={{ fontSize: "4rem", fontWeight: "900" }}> 4 0 4</h1>
        <h2 style={{ marginTop: "-22px", color: "#594d4d" }}>
          Page Not Found . Please Try Again after some time <br />
          <Link to="/">
            <Button variant="contained" sx={{ marginTop: "20px" }}>
              Home
            </Button>
          </Link>
        </h2>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
