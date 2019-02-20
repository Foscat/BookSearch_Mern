import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidUpdate = () => {
    console.log(this.state);
  }

  render() {
    return (
       <div>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={Books} />
              <Route path="/noMatch" exact component={NoMatch} /> 
            </div>         
          </BrowserRouter>
       </div>
    );
  }
}


export default App;