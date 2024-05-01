import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PublicLayout } from "./layouts/PublicLayout/PublicLayout";
import { PrivateLayout } from "./layouts/PrivateLayout/PrivateLayout";
import { PrivateRoute } from "./features/PrivateRoute/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("@src/views/Home/Home"));
const ProfilePage = lazy(() => import("@src/views/ProfilePage/ProfilePage"));
const Products = lazy(() => import("@src/views/Products/ProductsPage"));
const ProductPage = lazy(() => import("@src/views/ProductPage/ProductPage"));
const BuyPage = lazy(() => import("@src/views/BuyPage/BuyPage"));
const Cart = lazy(() => import("@src/views/Cart/Cart"));
const SearchResultsPage = lazy(
  () => import("@src/views/SearchResultPage/SearchResultPage")
);
const AllCategories = lazy(
  () => import("@src/views/AllCategories/AllCategories")
);
const ErrorPage = lazy(() => import("@src/views/ErrorPage/ErrorPage"));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullscreen={true} custom={false} />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route
            path="/products/:category/details/:prodId"
            element={<ProductPage />}
          />
          <Route
            path="/products/search/:searchValue"
            element={<SearchResultsPage />}
          />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="#" element={<ErrorPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          <Route
            path="/profile"
            element={<PrivateRoute children={<ProfilePage />} />}
          />
          <Route
            path="/buy-product"
            element={<PrivateRoute children={<BuyPage />} />}
          />
          <Route path="/cart" element={<PrivateRoute children={<Cart />} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
