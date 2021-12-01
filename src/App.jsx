import React from "react";
import "./App.sass";

import Loading from "./layout/Loading";

const RouterContainer = React.lazy(() => import("./router/RouterContainer"));

function App() {
  return (
    <div className="App">
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          <RouterContainer />
        </React.Suspense>
      </div>
    </div>
  );
}

export default App;
