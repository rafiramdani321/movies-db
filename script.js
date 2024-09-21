const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click', async () => {
  try {
    const inputKey = document.querySelector('.input-key').value
    const movies = await getMovies(inputKey)
    updateMovies(movies)
  } catch (err) {
    alert(err)
  }

})

const getMovies = (key) => {
  return fetch('http://www.omdbapi.com/?apikey=edb76b9a&s=' + key)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .then(response => {
      if (response.Response === 'False') {
        throw new Error(response.Error)
      }
      return response.Search
    })
}

const updateMovies = (movies) => {
  let cards = ''
  movies.forEach(m => cards += showMovies(m));
  const moviesContainer = document.querySelector('.movies-container')
  moviesContainer.innerHTML = cards
}

// event binding -> Detail Movie
document.addEventListener('click', async (e) => {
  if (e.target.classList.contains('modal-detail-movie')) {
    const imdbid = e.target.dataset.imdbid
    const movieDetail = await getMovieDetail(imdbid)
    updateMovieDetail(movieDetail)
  }
})

const getMovieDetail = (imdbid) => {
  return fetch('http://www.omdbapi.com/?apikey=edb76b9a&i=' + imdbid)
    .then(response => response.json())
    .then(m => m)
}

const updateMovieDetail = (m) => {
  const movieDetail = showMovieDetail(m)
  const modalBody = document.querySelector('.modal-body')
  modalBody.innerHTML = movieDetail
}

const showMovies = (m) => {
  return `<div class="col-md-3 my-4">
        <div class="card" width: 18rem;>
          <img src="${m.Poster}" class="card-img-top img-fluid">
          <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-outline-dark modal-detail-movie" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${m.imdbID}">Show Details</a>
          </div>
        </div>
      </div>`
}

const showMovieDetail = (m) => {
  return `<div class="container-fluid">
              <div class="row">
                <div class="col-md-3">
                  <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                  <ul class="list-group">
                    <li class="list-group-item">
                      <h4>${m.Title} (${m.Year})</h4>
                    </li>
                    <li class="list-group-item"><strong>Realesed : </strong> ${m.Realeased}</li>
                    <li class="list-group-item"><strong>Genre : </strong> ${m.Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>
                      ${m.Director}</li>
                    <li class="list-group-item"><strong>Writer : </strong>
                      ${m.Writer}</li>
                    <li class="list-group-item"><Strong>Actors : </Strong> ${m.Actors}</li>
                    <li class="list-group-item"><Strong>Plot : </Strong><br> ${m.Plot}</li>
                  </ul>
                </div>
              </div>
            </div>`
}