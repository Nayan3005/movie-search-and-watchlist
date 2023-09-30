const getWatchlistArray = localStorage.getItem('myWatchlist')
const watchlistArray  = JSON.parse(getWatchlistArray)
const explore = document.getElementById('explore')
let innerHtml = ''
let newArray = []

document.addEventListener('click', (e)=>{
    if(e.target.dataset.imdbid){
        newArray = JSON.parse(localStorage.getItem('myWatchlist'))
        let movies = newArray.filter((movie)=>{
            return movie !== e.target.dataset.imdbid
        })
        localStorage.setItem('myWatchlist', JSON.stringify(movies))
        renderWatchlist()
    }
})


async function renderWatchlist(){
    let innerHtml=''
    for(let i=0; i<watchlistArray.length; i++){
        const res = await fetch(`http://www.omdbapi.com/?i=${watchlistArray[i]}&apikey=24fc37b6`)
        const data = await res.json()
        innerHtml+=`
        <div id="movie-container">
            <img id="movie-poster" src=${data.Poster}>
            <div id="movie-content">
                <h3>${data.Title}</h3>
                <h4>${data.Runtime}</h4>
                <h4>${data.Genre}</h4>
                <h5>${data.Year}</h5>
                <p>${data.Plot}</p>
            </div>
            <div><p data-imdbID="${data.imdbID}">REMOVE</p></div>
        </div>
        `
    } 
    explore.innerHTML= innerHtml
}

renderWatchlist()
