import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "right", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}

export function FormRow(props) {
  return(
    <form className="row" onSubmit={props.getBooks}>

      <input
        className="form-input"
        type="text"
        name="formSearch"
        placeholder="ex. hardcover-fiction"
      />

      <button className="form-button">Search</button>

    </form>
  );
}
