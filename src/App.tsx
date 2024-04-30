import { Route, Routes } from "react-router-dom";
//import Home from "./views/Home/Home";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("@src/views/Home/Home"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default App;
