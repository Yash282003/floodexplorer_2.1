import React from "react";
import Home from "./Pages/Home/Home";
import ContextProvider from "./context/ContextProvider";
function App() {
  return (
    <div>
      <ContextProvider>
        <Home />
      </ContextProvider>
    </div>
  );
}

export default App;
