import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Header from "header/Header";
import Hello from "next_host/Hello";

const App = () => (
  <div className='mt-10 text-3xl mx-auto max-w-6xl'>
    <Header />
    <Hello />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
