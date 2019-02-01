// apiSearch() {
//     this.apiCall = fetch(
//         "https://www.googleapis.com/books/v1/volumes?q=" + 
//         this.state.term +
//         "&filter=ebooks&orderBy=relevance&maxResults=30&langRestrict=en&key=AIzaSyCMiu9BKRYCqsMEi73bivxlnUF7Ow-oQO4"
//     )
//     // Then have a function that gets the json version of the response
//     .then(response => response.json())
//     // Then give if statements for data pulled in from api to display info or give default info
//     .then((data) => {
        
//         data.books.forEach((books, i) => {
//             // Each card info is held inside of a object called SearchCard
//             let searchCard = {};

//             // Then for each type of info pulled in if it is undefined it displays default info

//             // Title
//             if(typeof books.item[i].volumeInfo.title != "undefined"){
//                 searchCard.title = books.item[i].volumeInfo.title;
//             }else {
//                 searchCard.title = null;
//             }
//             // Authors
//             if(typeof books.item[i].volumeInfo.authors != "undefined"){
//                 searchCard.authors = books.item[i].volumeInfo.authors;
//             }else {
//                 searchCard.authors = null;
//             }
//             // Description
//             if(typeof books.item[i].searchInfo.textSnippet != "undefined"){
//                 searchCard.description = books.item[i].searchInfo.textSnippet;
//             }else {
//                 searchCard.description = null;
//             }
//             // Thumbnail
//             if(typeof books.item[i].volumeInfo.imageLinks.thumbnail != "undefined"){
//                 searchCard.thumbnail = books.item[i].volumeInfo.imageLinks.thumbnail;
//             }else {
//                 searchCard.thumbnail = null;
//             }
//             // Link
//             if(typeof books.item[i].searchInfo.selfLink != "undefined"){
//                 searchCard.link = books.item[i].searchInfo.selfLink;
//             }else {
//                 searchCard.link = null;
//             }

//             // The change set state and insert a searchCard for each iteration
//             this.setState(this.state.books.splice(i, 1, searchCard));
//         })
//     }).catch((error) => {
//         console.error("Error with api call App.jsx: ", error);
//     });
// } // End apiSearch
