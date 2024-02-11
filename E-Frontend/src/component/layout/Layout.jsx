import { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main style={{ minHeight: "80vh", width: "90%", margin: "0 auto" }}>
        {children}
      </main>
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Layout;
