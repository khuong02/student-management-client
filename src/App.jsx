import React from "react";
import { useSelector } from "react-redux";
import "./App.sass";

import Loading from "./layout/Loading";

const RouterContainer = React.lazy(() => import("./router/RouterContainer"));

function App() {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          {loading ? <Loading /> : <RouterContainer />}
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
