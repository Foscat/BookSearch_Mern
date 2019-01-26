import React from 'react';

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function Card(props) {
    return <div className="card">{props.children}</div>
  }
  
  export default Card;
  