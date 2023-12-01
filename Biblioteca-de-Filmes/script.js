// Chave da API
const chaveAPI = 'f6576956040fb1f921b55bd70cd85736';

// Recupera favoritos do localStorage ou inicializa um array vazio
let filmesFavoritos = JSON.parse(localStorage.getItem('filmesFavoritos')) || [];


// Função para buscar filmes
async function buscarFilmes(query, generoSelecionado) {
    try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${chaveAPI}&query=${query}&language=pt-BR`;
        if (generoSelecionado !== 'Selecione um gênero') {
            url += `&with_genres=${generoSelecionado}`;
        }
        const resposta = await fetch(url);
        const dados = await resposta.json();
        exibirFilmes(dados.results);
        // Botão "Voltar" aparece
        document.getElementById('botaoVoltar').style.display = 'block';
    } catch (erro) {
        console.error('Erro na requisição: ' + erro);
    }
}

// Função para buscar gêneros
async function buscarGeneros() {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${chaveAPI}&language=pt-BR`);
        const dados = await resposta.json();
        popularListaGeneros(dados.genres);
    } catch (erro) {
        console.error('Erro na requisição: ' + erro);
    }
}

// Função para adicionar aos favoritos
function adicionarAosFavoritos(titulo) {
    const filme = filmes.find(filme => filme.title === titulo);
    const filmeFavorito = {
        title: filme.title,
        overview: filme.overview,
        poster_path: filme.poster_path
    };
    filmesFavoritos.push(filmeFavorito);
    localStorage.setItem('filmesFavoritos', JSON.stringify(filmesFavoritos));
    alert('Filme adicionado aos favoritos'); // Alerta usuário******************
    exibirFilmes(filmes); // Atualiza lista de filmes
}

/// Variável global para armazenar os filmes
let filmes = [];

// Função para remover dos favoritos
function removerDosFavoritos(titulo) {
    const index = filmesFavoritos.findIndex(filme => filme.title === titulo);
    filmesFavoritos.splice(index, 1);
    localStorage.setItem('filmesFavoritos', JSON.stringify(filmesFavoritos));
    alert('Filme removido dos favoritos'); // Alerta usuário**********************
    exibirFilmes(filmesFavoritos, true); // Atualiza lista de favoritos
}

// Função para exibir filmes
function exibirFilmes(filmesRecebidos, isFavoritos = false) {
    if (filmesRecebidos.length === 0) {
        return;
    }

    const container = document.getElementById('resultados');
    container.innerHTML = ''; // Limpa a área de resultados

    filmesRecebidos.forEach((filme, index) => {
        // Armazena o filme na variável global
        filmes[index] = filme;

        const title = filme.title || 'Título desconhecido';
        const overview = filme.overview || 'Sem descrição disponível';
        const poster = filme.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${filme.poster_path}" class="card-img-top" alt="${title}">` : '';

        // Verifica se o filme já tá nos favoritos
        const isFavorito = filmesFavoritos.some(favorito => favorito.title === title);

        const card = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card">
                    ${poster}
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${overview}</p>
                        <button onclick="${isFavorito ? 'removerDosFavoritos' : 'adicionarAosFavoritos'}('${title}')" class="btn ${isFavorito ? 'btn-danger' : 'btn-success'}">${isFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Função para buscar filmes por gênero
async function buscarFilmesPorGenero(generoSelecionado) {
    try {
        const resposta = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${chaveAPI}&language=pt-BR&with_genres=${generoSelecionado}`);
        const dados = await resposta.json();
        exibirFilmes(dados.results);
        document.getElementById('botaoVoltar').style.display = 'block'; // Mostra o botão Voltar
    } catch (erro) {
        console.error('Erro na requisição: ' + erro);
    }
}

// Função para popular a lista de gêneros
function popularListaGeneros(generos) {
    const container = document.getElementById('listaGeneros');
    generos.forEach(genero => {
        const opcao = document.createElement('option');
        opcao.value = genero.id;
        opcao.textContent = genero.name;
        container.appendChild(opcao);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Carrega a lista de gêneros
    buscarGeneros();

// Evento de clique para o botão de busca
document.getElementById('botaoBusca').addEventListener('click', function() {
    const query = document.getElementById('campoBusca').value;
    const generoSelecionado = document.getElementById('listaGeneros').value;
    const campoBusca = document.getElementById('campoBusca');
    if (query) {
        buscarFilmes(query, generoSelecionado);
        campoBusca.classList.remove('placeholder-lightcoral'); // Remove a classe se condição não atendida
        // Faz o botão "Voltar" aparecer
        document.getElementById('botaoVoltar').style.display = 'block';
    } else {
        campoBusca.placeholder = 'Escolha um filme';
        campoBusca.classList.add('placeholder-lightcoral'); // Adiciona a classe se condição atendida
        console.error('Filme não selecionado');
    }
});

// Evento de clique para mostrar filmes favoritos
document.getElementById('botaoMostrarFavoritos').addEventListener('click', function() {
    if (filmesFavoritos.length === 0) {
        console.error('Favoritos não adicionados');
        alert('Você não tem favoritos'); // Alerta usuário
    } else {
        exibirFilmes(filmesFavoritos, true); // True pra indicar que os filmes são favoritos
        document.getElementById('botaoVoltar').style.display = 'block'; // Mostra o botão Voltar
    }
});

    // Evento de clique para voltar à tela inicial
    document.getElementById('botaoVoltar').addEventListener('click', function() {
        document.getElementById('resultados').innerHTML = '';
        document.getElementById('campoBusca').value = ''; // Limpa campo de busca
        // Faz o botão "Voltar" sumir de novo
        document.getElementById('botaoVoltar').style.display = 'none';
    });
});
