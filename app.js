const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e2e2c88de5c17dafb3aedb3ba35133c'
const image_path = 'https://image.tmdb.org/t/p/w500'
const form = document.getElementById('form')
const search = document.getElementById('search')
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=1e2e2c88de5c17dafb3aedb3ba35133c&query="'
getmovies(api_url)

async function getmovies(url)
{
  const res = await fetch(url)
  const data = await res.json();
  showmovies(data.results)
}

function showmovies(movies)
{
   main.innerHTML= ''
  movies.forEach((movies) => {
    const  { title , poster_path, vote_average , overview} = movies

    const movieel = document.createElement('div')
    movieel.classList.add('movie')
    movieel.innerHTML = `

      <div class="movies">
        <img src=${image_path+ poster_path} alt="">
        <div class="movies-info">
          <h3>${title}</h3>
          <span class=${getclassbyaverage(vote_average)}>${vote_average}</span>

        </div>
        <div class="overview">
          ${overview}
        </div>
      </div>
      `
    main.appendChild(movieel)
  })

}
function getclassbyaverage(vote)
{
  if(vote>=8)
  {
    return "green";
  }
  else if(vote>=5 && vote<8)
  {
    return "orange"
  }
  else {
      return "red";
  }
}
form.addEventListener('submit',(e) =>
{
  e.preventDefault()
  const searchterm = search.value
  if(searchterm && searchterm !== '')
  {
    getmovies(search_url + searchterm)
    search.value = ''
  }
  else
    {
      window.location.reload()
    }

})
