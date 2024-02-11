import styled from "@emotion/styled";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { RegisterUser } from "../../../redux/actions/userAction";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signData, setSignData] = useState(initialState);
  //   const dispatch = useDispatch();

  const handleChange = (e) => {
    const newEntry = { ...signData, [e.target.name]: e.target.value };
    setSignData(newEntry);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sign up data ", signData);
    // dispatch(RegisterUser(signData));
  };

  return (
    <Layout>
      <Container>
        <PaperStyle elevation={3}>
          <Grid container flex justifyContent="center" alignItems="center">
            <Grid item sm={12} md={11} xl={10}>
              <Wrapper>
                <Typography>Create an Account</Typography>
                <form onSubmit={handleSubmit}>
                  <input
                    name="name"
                    value={signData.name}
                    type="text"
                    required
                    onChange={(e) => handleChange(e)}
                    placeholder="Your Name"
                  />
                  <input
                    name="email"
                    value={signData.email}
                    type="text"
                    required
                    onChange={(e) => handleChange(e)}
                    placeholder="Your Email"
                  />
                  <input
                    name="password"
                    value={signData.password}
                    type="password"
                    required
                    onChange={(e) => handleChange(e)}
                    placeholder="Your Password"
                  />
                  <Button type="submit">submit</Button>
                  <Link to="/login">
                    <Button fullWidth>Create an account</Button>
                  </Link>
                </form>
              </Wrapper>
            </Grid>
          </Grid>
        </PaperStyle>
      </Container>
    </Layout>
  );
};

export default Signup;

const Container = styled("div")({
  display: "flex",
  width: "100%",
  height: "79vh",
  alignItems: "center",
  justifyContent: "center",
});
const PaperStyle = styled(Paper)({
  width: "400px",
  textAlign: "center",
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  p: {
    marginTop: "20px",
    fontSize: "19px",
    fontWeight: "700",
    color: "#d2691e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    input: {
      marginBottom: "30px",
      padding: "8px 8px",
      fontSize: "14px",
      borderRadius: "6px",
      outline: "none",
      border: "none",
      backgroundColor: "#e5e5e5",
      color: "#474040",
    },
    button: {
      marginBottom: "15px",
      color: "#d2691e",
    },
    a: {
      width: "100%",
    },
  },
});
