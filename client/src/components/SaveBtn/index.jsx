import React from "react";


// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(...props) {
  return (
    <span className="save-btn" role="button" tabIndex="0">
      <i className="fas fa-save"></i>
    </span>
  );
}

export default SaveBtn;