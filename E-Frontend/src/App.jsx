import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./component/layout/Loader";

//component
const Home = lazy(() => import("./component/home/Home"));
const Login = lazy(() => import("./component/user/auth/Login"));
const Signup = lazy(() => import("./component/user/auth/SignUp"));
const Cart = lazy(() => import("./component/cart/Cart"));
const Product = lazy(() => import("./component/product/Product"));
const PageNotFound = lazy(() => import("./component/helper/PageNotFound"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
