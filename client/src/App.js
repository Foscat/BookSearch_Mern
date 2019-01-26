import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav/index";
import Card from "./components/Card/index";

function App() {
  return (
    <div>
      <Nav />
      <Books />
      <div className="border border-danger"><Card /></div>
      
    </div>
  );
}

export default App;
