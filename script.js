const searchInput = document.getElementById('search-input'); // Campo de pesquisa
const resultArtist = document.getElementById("result-artist"); // Aba de artistas
const resultPlaylist = document.getElementById('result-playlists'); // Aba de playlists

// Chamando a API dos dados buscando e comparando os dados referente.
function requestApi(searchTerm){
    
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
    .then((response) => response.json())     // Trabalha com Promisses: Programação Assíncrona
    .then((result) => displayResults(result, searchTerm))
}

//Mostra na tela o resultados vindo da api
function displayResults(result, searchTerm){

    resultPlaylist.classList.add('hidden');
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpando o campo de resultados anteriores

    // Filtra por cada artista relacionado ao campo de pesquisa
    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));
 
    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
  
        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
        <div class="card-text">              
                <span class="artist-name">${artist.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;
         gridContainer.appendChild(artistCard); //Adicionar dentro do elemento gridContainer todos resultados
    });

    resultArtist.classList.remove('hidden');
}

// Evento que define o campo de pesquisa do user
document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase().trim(); // O texto que o user pesquisou

    // Caso o user pesquisou vazio a aba de playlist desaparece e a do artista aparece
    if(searchTerm === ''){
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }

    requestApi(searchTerm);
})