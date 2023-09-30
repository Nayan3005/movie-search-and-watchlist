const inputEl = document.getElementById('search-input')
const buttonEl = document.getElementById('search-button')
const explore = document.getElementById('explore')
let watchlistArray = []

buttonEl.addEventListener('click', async()=>{
    const res = await fetch(`http://www.omdbapi.com/?s=${inputEl.value}&apikey=24fc37b6`)
    const data = await res.json()
    renderMovies(data)
})

function renderMovies(movies){
    let innerHtml = ''
    movies.Search.forEach((movie)=>{
        innerHtml += `
            <div id="movie-container">
                <img id="movie-poster" src=${movie.Poster}>
                <div id="movie-content">
                    <h3>${movie.Title}</h3>
                    <h5>${movie.Year}</h5>
                </div>
                <div id="movie-watchlist">
                    <p id="add-to-watchlist" data-imdbID="${movie.imdbID}">+WATCHLIST</p>
                </div>
            </div>
            
        `
    })
    explore.innerHTML = innerHtml
}

document.addEventListener('click', (e)=>{
    // console.log(e.target.dataset.imdbid)
    if(e.target.dataset.imdbid){
        watchlistArray = JSON.parse(localStorage.getItem('myWatchlist'))  //always get previous items of array and then push new item
        watchlistArray.unshift(e.target.dataset.imdbid)
        localStorage.setItem('myWatchlist', JSON.stringify(watchlistArray));
    }

})





