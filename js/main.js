var searchTerm;

const lastFmAPIKey = "";

document.getElementById("albumSearch").addEventListener(
  "keyup",
  function (evt) {
    searchTerm = this.value;
    if (searchTerm != "") {
      let searchUrl =
        "https://ws.audioscrobbler.com/2.0/?method=album.search&album=" +
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
            let top5albums = searchResults["results"]["albummatches"][
              "album"
            ].splice(0, 5);
            let top5AlbumsArt = [];

            for (let album of top5albums) {
              top5AlbumsArt.push(album["image"][3]["#text"]);
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

document.getElementById("download").addEventListener("click", function () {
  html2canvas(document.querySelector("#meme"), {
    allowTaint: false,
    useCORS: true
  }).then(function (canvas) {
    console.log(canvas);
    saveAs(canvas.toDataURL(), "obamaSwag.png");
  });
});

function saveAs(uri, filename) {
  var link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
