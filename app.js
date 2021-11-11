//Paginacion de peliculas
let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

//Llamada a la API
const API = `https://api.themoviedb.org/3/movie/popular?api_key=a3978b6ef7c16c2d7296a65e469e4a1f&language=es-ES&page=${pagina}`;

const cargarPeliculas = async () => {
  try {
    const res = await fetch(API + pagina);
    const data = await res.json();

    if (res.status === 200) {
      console.log("Todo va bien");

      let peliculas = "";

      data.results.forEach((pelicula) => {
        //console.log(pelicula.title);

        peliculas += `

                    <div class="pelicula">
                        <img src="https://image.tmdb.org/t/p/w200/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                     
                `;
      });

      document.getElementById("contenedor").innerHTML = peliculas;

      //return data;
    } else if (res.status === 401) {
      console.log("No encontrado");
    } else if (res.status === 404) {
      console.log("La pelicula que buscas no existe!");
    } else {
      console.log("Algo salio mal");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
