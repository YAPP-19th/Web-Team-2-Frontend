import React from "react";

import "./App.css";
import Desktop from "./pages/desktop";
import Mobile from "./pages/mobile";

function App() {
  return (
    <>
      <div className="desktop">
        <Desktop />
      </div>
      <div className="mobile">
        <Mobile />
      </div>
    </>
  );
}

export default App;
