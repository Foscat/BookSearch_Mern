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



// {/* <form>
//                         <div className="hidden">
//                           <Input info={searchCard.volumeInfo.title} value={this.state.saveInfo.title} name="title" />
//                           <Input info={searchCard.volumeInfo.authors} name="authors" />
//                           {/* <Input value={searchCard.searchInfo.textSnippet} name="description" /> */}
//                           <Input info={searchCard.volumeInfo.imageLinks.thumbnail} name="thumbnail" />
//                           <Input info={searchCard.volumeInfo.infoLink} name="link" />
//                         </div>
//                         <FormBtn onClick={ () =>
//                           this.setState({ 
//                             saveInfo: {
//                               title: this.state.saveInfo.title,
//                               authors: this.state.saveInfo.authors,
//                               // description: description.value,
//                               thumbnail: this.state.saveInfo.thumbnail,
//                               link: this.state.saveInfo.link
//                             }
//                           })
//                         } />
//                       </form> */}