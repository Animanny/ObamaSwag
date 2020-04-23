var searchTerm;

const lastFmAPIKey = "";

document.getElementById("albumSearch").addEventListener(
  "keyup",
  function (evt) {
    searchTerm = this.value;
    if(searchTerm != ""){
    let searchUrl =
      "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" +
      searchTerm +
      "&api_key=7d11ca66e0ac773db3062742ebbf9b1d&format=json";
    fetch(searchUrl)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the albums in the response
        response.json().then(function (data) {
            let searchResults = data;
            let top5albums = searchResults['results']['albummatches']['album'].splice(0,5);
            let top5AlbumsArt = [];

            for(let album of top5albums){
                top5AlbumsArt.push(album['image'][3]["#text"]);
            }
            document.getElementById("albumCover").src = top5AlbumsArt[0];
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  
    }
},
  false
);
