import React from "react";
import Home from "./Pages/Home/Home";
import ContextProvider from "./context/ContextProvider";
import Twitter from "./Pages/Twitter/Twitter";
function App() {
  return (
    <div>
      <ContextProvider>
        <Home/>
      </ContextProvider>
    </div>
  );
}

export default App;
